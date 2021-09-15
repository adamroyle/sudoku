import { Solution } from './Solution'
import { StrategyCollection } from './StrategyCollection'
import { Strategy } from './types'

export class BruteSolver implements Strategy {
  name = 'Brute Solver'

  private strategyCollection: StrategyCollection

  constructor(strategyCollection: StrategyCollection) {
    this.strategyCollection = strategyCollection
  }

  // TODO: make this method return void and mutate solution instead
  solve(solution: Solution) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const options = solution.getOptions(i, j)
        if (options.length === 2) {
          for (let option of options) {
            const solutionCopy = solution.clone()
            try {
              solutionCopy.solveCell(i, j, option)
              this.strategyCollection.solve(solutionCopy)
              if (solutionCopy.getUnsolvedCount() === 0) {
                return solutionCopy
              }
            } catch (e) {
              // ignore errors
            }
          }
        }
      }
    }
    return solution
  }
}
