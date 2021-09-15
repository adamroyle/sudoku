import { Puzzle } from './Puzzle'

export class Solution {
  private options: number[][]

  constructor(puzzle: Puzzle) {
    this.options = puzzle.toArray().map(() => [1, 2, 3, 4, 5, 6, 7, 8, 9])
    puzzle.toArray().forEach((num, index) => {
      if (num > 0) {
        const [row, col] = this.getRowCol(index)
        this.solveCell(row, col, num)
      }
    })
  }

  clone() {
    const solution = new Solution(this.toPuzzle())
    solution.options = this.toArray()
    return solution
  }

  toPuzzle() {
    return new Puzzle(this.options.map((cell) => (cell.length === 1 ? cell[0] : 0)))
  }

  toString() {
    return this.options.map((cell) => cell.join('|')).join(',')
  }

  toArray() {
    return this.options.map((v) => v.slice())
  }

  getUnsolvedCount() {
    return this.options.reduce((acc, cell) => {
      return cell.length > 1 ? acc + 1 : acc
    }, 0)
  }

  getIndex(row: number, col: number) {
    return row * 9 + col
  }

  getRowCol(index: number): [number, number] {
    const row = Math.floor(index / 9)
    const col = index % 9
    return [row, col]
  }

  getOptions(row: number, col: number) {
    const index = this.getIndex(row, col)
    return this.options[index]
  }

  // getRow(row: number): number[][] {
  //   const options: number[][] = []
  //   for (let col = 0; col < 9; col++) {
  //     options.push(this.getOptions(row, col))
  //   }
  //   return options
  // }

  // getColumn(col: number): number[][] {
  //   const options: number[][] = []
  //   for (let row = 0; row < 9; row++) {
  //     options.push(this.getOptions(row, col))
  //   }
  //   return options
  // }

  // TODO: add optional Strategy param so we can track who solved what?
  eliminateFromCell(row: number, col: number, value: number) {
    const index = this.getIndex(row, col)
    const options = this.options[index]
    if (options.length === 1 && options[0] === value) {
      throw new Error('Value is only remaining option')
    } else if (options.length > 1) {
      const remainingOptions = options.filter((v) => v !== value)
      if (remainingOptions.length !== options.length) {
        if (remainingOptions.length === 1) {
          this.solveCell(row, col, remainingOptions[0])
        } else {
          this.options[index] = remainingOptions
        }
      }
    }
  }

  // TODO: add optional Strategy param so we can track who solved what?
  solveCell(row: number, col: number, value: number) {
    const index = this.getIndex(row, col)
    const options = this.options[index]

    if (!options.includes(value)) {
      throw new Error('Value does not exist in options')
    } else if (options.length === 1) {
      // silently ignore if this is already the solution
      return
    }

    // set the solution
    this.options[index] = [value]

    // eliminate from row/col
    for (let i = 0; i < 9; i++) {
      if (i !== col) {
        this.eliminateFromCell(row, i, value)
      }
      if (i !== row) {
        this.eliminateFromCell(i, col, value)
      }
    }

    // eliminate from square
    const squareRow = Math.floor(row / 3) * 3
    const squareCol = Math.floor(col / 3) * 3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (squareRow + i !== row && squareCol + j !== col) {
          this.eliminateFromCell(squareRow + i, squareCol + j, value)
        }
      }
    }
  }
}
