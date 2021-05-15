import { Solution } from './Solution'
import { Strategy } from './types'

export class ColumnRule implements Strategy {
  name = 'Column Rule'
  execute(solution: Solution) {
    for (let col = 0; col < 9; col++) {
      for (let row = 0; row < 9; row++) {
        const options = solution.getOptions(row, col)
        if (options.length === 1) {
          for (let r = 0; r < 9; r++) {
            if (row === r) continue
            solution.eliminateFromCell(r, col, options[0])
          }
        }
      }
    }
  }
}
