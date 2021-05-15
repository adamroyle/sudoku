import { Solution } from './Solution'
import { Strategy } from './types'

export class SquareRule implements Strategy {
  name = 'Square Rule'
  execute(solution: Solution) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.solveSquare(i * 3, j * 3, solution)
        this.squareRemaining(i * 3, j * 3, solution)
      }
    }
  }
  solveSquare(row: number, col: number, solution: Solution) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const options = solution.getOptions(row + i, col + j)
        if (options.length === 1) {
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              if (r === i && c === j) continue
              solution.eliminateFromCell(row + r, col + c, options[0])
            }
          }
        }
      }
    }
  }
  squareRemaining(row: number, col: number, solution: Solution) {
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
