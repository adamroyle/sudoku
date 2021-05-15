import { Puzzle } from "./Puzzle";

export class Solution {
  options: number[][] = [];

  constructor(puzzle: Puzzle) {
    this.options = puzzle.grid.map((cell) =>
      cell === 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [cell]
    );
  }

  clone() {
    return new Solution(this.getPuzzle());
  }

  getPuzzle() {
    return new Puzzle(
      this.options.map((cell) => (cell.length === 1 ? cell[0] : 0))
    );
  }

  toString() {
    return this.options.map((cell) => cell.join("|")).join(",");
  }

  getUnsolvedCount() {
    return this.options.reduce((acc, cell) => {
      //      console.log(cell)
      return cell.length > 1 ? acc + 1 : acc;
    }, 0);
  }

  getIndex(row: number, col: number) {
    return row * 9 + col;
  }

  getOptions(row: number, col: number) {
    const index = this.getIndex(row, col);
    return this.options[index];
  }

  eliminateFromCell(row: number, col: number, value: number) {
    const index = this.getIndex(row, col);
    this.options[index] = this.options[index].filter((v) => v !== value);
  }

  solveCell(row: number, col: number, value: number) {
    const index = this.getIndex(row, col);
    if (!this.options[index].includes(value)) {
      throw new Error("Value does not exist in options");
    }
    this.options[index] = [value];
  }
}
