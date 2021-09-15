import { Solution } from './Solution'
import { Strategy } from './types'

export class ExclusionSquare implements Strategy {
  name = 'Exclusion Square'
  solve(solution: Solution) {
    for (let row = 0; row < 9; row++) {
      this.solveRow(solution, row)
      this.solveCol(solution, row)
    }
  }
  private solveRow(solution: Solution, row: number) {
    for (let num = 1; num <= 9; num++) {
      let square = -1
      for (let col = 0; col < 9; col++) {
        const options = solution.getOptions(row, col)
        if (options.length > 1 && options.includes(num)) {
          if (square === -1) {
            square = Math.floor(col / 3)
          } else if (square !== Math.floor(col / 3)) {
            square = -1
            break
          }
        }
      }
      if (square > -1) {
        const squareCol = square * 3
        const squareRow = Math.floor(row / 3) * 3
        for (let i = squareRow; i < squareRow + 3; i++) {
          if (i === row) continue
          for (let j = squareCol; j < squareCol + 3; j++) {
            solution.eliminateFromCell(i, j, num)
          }
        }
      }
    }
  }
  private solveCol(solution: Solution, col: number) {
    for (let num = 1; num <= 9; num++) {
      let square = -1
      for (let row = 0; row < 9; row++) {
        const options = solution.getOptions(row, col)
        if (options.length > 1 && options.includes(num)) {
          if (square === -1) {
            square = Math.floor(row / 3)
          } else if (square !== Math.floor(row / 3)) {
            square = -1
            break
          }
        }
      }
      if (square > -1) {
        const squareCol = Math.floor(col / 3) * 3
        const squareRow = square * 3
        for (let j = squareCol; j < squareCol + 3; j++) {
          if (j === col) continue
          for (let i = squareRow; i < squareRow + 3; i++) {
            solution.eliminateFromCell(i, j, num)
          }
        }
      }
    }
  }
}
