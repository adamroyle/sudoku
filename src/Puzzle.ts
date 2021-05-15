export class Puzzle {
  grid: number[] = [];

  constructor(grid: number[]) {
    this.grid = grid;

    if (!this.validate()) {
      throw new Error("Puzzle grid not valid");
    }
  }

  validate() {
    return this.grid.length === 81;
  }

  static fromString(str: string) {
    const grid = str
      .replace(/[^\d]/g, "")
      .split("")
      .map((d) => parseInt(d, 10));
    return new Puzzle(grid);
  }
}
