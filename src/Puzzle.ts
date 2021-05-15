export class Puzzle {
  private grid: number[]

  constructor(grid: number[]) {
    this.grid = grid

    if (!this.validate()) {
      throw new Error('Puzzle grid not valid')
    }
  }

  private validate() {
    return this.grid.length === 81
  }

  toArray(): number[] {
    return this.grid.slice()
  }

  toString(): string {
    return this.grid.join('')
  }

  static fromString(str: string): Puzzle {
    const grid = str
      .replace(/[^\d]/g, '')
      .split('')
      .map((d) => parseInt(d, 10))
    return new Puzzle(grid)
  }
}
