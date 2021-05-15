import { Solution } from './Solution'
import { Strategy } from './types'

export class ExclusionRows implements Strategy {
  name = 'Exclusion Rows'
  execute(solution: Solution) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.solveSquare(i * 3, j * 3, solution)
        this.solveSquare2(i * 3, j * 3, solution)
      }
    }
  }
  solveSquare(row: number, col: number, solution: Solution) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const options = solution.getOptions(row + i, col + j)
        if (options.length === 1) continue
        options.forEach((option) => {
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              if (r === i && c === j) continue
              if (solution.getOptions(row + r, col + c).includes(option)) {
                if (r !== i) return false
              }
            }
          }
          for (let c = 0; c < 3; c++) {
            if (c === col / 3) continue
            for (let r = 0; r < 3; r++) {
              solution.eliminateFromCell(row + i, c * 3 + r, option)
            }
          }
        })
      }
    }
  }
  solveSquare2(row: number, col: number, solution: Solution) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const options = solution.getOptions(row + i, col + j)
        if (options.length === 1) continue
        options.forEach((option) => {
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              if (r === i && c === j) continue
              if (solution.getOptions(row + r, col + c).includes(option)) {
                if (c !== j) return false
              }
            }
          }
          for (let r = 0; r < 3; r++) {
            if (r === row / 3) continue
            for (let c = 0; c < 3; c++) {
              solution.eliminateFromCell(r * 3 + c, col + j, option)
            }
          }
        })
      }
    }
  }
}
