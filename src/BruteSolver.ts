import { Solution } from './Solution'
import { StrategyCollection } from './StrategyCollection'
import { Strategy } from './types'

export class BruteSolver implements Strategy {
  name = 'Brute Solver'

  private strategyCollection?: StrategyCollection

  constructor(strategyCollection?: StrategyCollection) {
    this.strategyCollection = strategyCollection
  }

  solve(solution: Solution): void {
    const cell = this.getCell(solution)
    if (cell) {
      const [row, col] = cell
      const options = solution.getOptions(row, col)
      for (let option of options) {
        const solutionCopy = solution.clone()
        try {
          solutionCopy.solveCell(row, col, option)
          if (this.strategyCollection) {
            this.strategyCollection.solve(solutionCopy)
          }

          if (solutionCopy.getUnsolvedCount() > 0) {
            // brute solve recursively
            this.solve(solutionCopy)
            // ignore this copy if it didn't solve
            if (solutionCopy.getUnsolvedCount() > 0) {
              continue
            }
          }

          // we have solved it so mutate original solution
          for (let i = 0; i < 81; i++) {
            const [row, col] = solution.getRowCol(i)
            if (solution.getOptions(row, col).length > 1) {
              solution.solveCell(row, col, solutionCopy.getOptions(row, col)[0])
            }
          }

          return
        } catch (e) {
          // ignore errors
        }
      }
    }
  }

  private getCell(solution: Solution): [number, number] | void {
    let row = -1
    let col = -1
    let num = 10
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const options = solution.getOptions(i, j)
        if (options.length === 2) {
          return [i, j]
        } else if (options.length > 1 && options.length < num) {
          row = i
          col = j
          num = options.length
        }
      }
    }
    if (num < 10) return [row, col]
  }
}
