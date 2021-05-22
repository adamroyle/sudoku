import { Solution } from './Solution'
import { Strategy } from './types'

export class ReservedCellsSquare implements Strategy {
  name = 'Reserved Cells Square'
  execute(solution: Solution) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.executeSquare(i * 3, j * 3, solution)
      }
    }
  }
  private executeSquare(row: number, col: number, solution: Solution) {
    const numbersMap: { [key: string]: { cells: boolean[]; numbers: number[] } } = {}
    for (let num = 1; num <= 9; num++) {
      const cells: boolean[] = []
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          cells.push(solution.getOptions(row + i, col + j).includes(num))
        }
      }
      const key = cells.map((b) => (b ? '1' : '0')).join('')
      if (numbersMap[key]) {
        numbersMap[key].numbers.push(num)
      } else {
        numbersMap[key] = { cells: cells, numbers: [num] }
      }
    }
    Object.values(numbersMap)
      .filter((m) => m.numbers.length > 1 && m.cells.filter(Boolean).length === m.numbers.length)
      .forEach(({ cells, numbers }) => {
        cells.forEach((hasMatch, index) => {
          if (hasMatch) {
            const r = row + Math.floor(index / 3)
            const c = col + (index % 3)
            solution.getOptions(r, c).forEach((option) => {
              if (!numbers.includes(option)) {
                solution.eliminateFromCell(r, c, option)
              }
            })
          }
        })
      })
  }
}
