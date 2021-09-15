import { Solution } from './Solution'
import { Strategy } from './types'

export class SquareElimination implements Strategy {
  name = 'Square Elimination'
  solve(solution: Solution) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.squareRemaining(i * 3, j * 3, solution)
      }
    }
  }
  private squareRemaining(row: number, col: number, solution: Solution) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const options = solution.getOptions(row + i, col + j)
        if (options.length > 1) {
          options.forEach((option) => {
            let exists = false
            outer: for (let r = 0; r < 3; r++) {
              for (let c = 0; c < 3; c++) {
                if (r === i && c === j) continue
                if (solution.getOptions(row + r, col + c).includes(option)) {
                  exists = true
                  break outer
                }
              }
            }
            if (!exists) {
              solution.solveCell(row + i, col + j, option)
              return false
            }
          })
        }
      }
    }
  }
}
