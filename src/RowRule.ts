import { Solution } from "./Solution";
import { Strategy } from "./types";

export class RowRule implements Strategy {
  name = "Row Rule";
  execute(solution: Solution) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const options = solution.getOptions(row, col);
        if (options.length === 1) {
          for (let c = 0; c < 9; c++) {
            if (col === c) continue;
            solution.eliminateFromCell(row, c, options[0]);
          }
        }
      }
    }
  }
}
