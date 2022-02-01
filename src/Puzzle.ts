export class Puzzle {
  private cells: number[]

  constructor(cells: number[]) {
    this.cells = cells

    if (!this.validate()) {
      throw new Error('Puzzle not valid')
    }
  }

  static fromString(str: string): Puzzle {
    const cells = str
      .replace(/[^\d]+/g, '')
      .split('')
      .map((d) => parseInt(d, 10))
    return new Puzzle(cells)
  }

  toArray(): number[] {
    return this.cells.slice()
  }

  toString(): string {
    return this.cells.join('')
  }

  toGrid(): number[][] {
    const grid = []
    for (let i = 0; i < 9; i++) {
      grid.push(this.cells.slice(i * 9, i * 9 + 9))
    }
    return grid
  }

  private validate() {
    return this.cells.length === 81
  }
}
