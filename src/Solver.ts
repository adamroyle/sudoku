import { Strategy } from "./types";
import { Solution } from "./Solution";
import { Puzzle } from "./Puzzle";

export class Solver {
  strategies: Strategy[] = [];

  addStrategy(strategy: Strategy) {
    this.strategies.push(strategy);
  }

  solve(puzzle: Puzzle, bruteForce = true): Solution {
    const solution = new Solution(puzzle);
    let str: string;
    do {
      str = solution.toString();
      for (let i = 0; i < this.strategies.length; i++) {
        this.strategies[i].execute(solution);
      }
    } while (str !== solution.toString());
    if (solution.getUnsolvedCount() && bruteForce) {
      return this.bruteForce(solution);
    }

    return solution;
  }

  bruteForce(solution: Solution): Solution {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const options = solution.getOptions(i, j);
        if (options.length === 2) {
          let solution2 = solution;
          for (let option of options) {
            const solutionCopy = solution.clone();
            solutionCopy.solveCell(i, j, option);
            solution2 = this.solve(solutionCopy.getPuzzle(), false);
            if (solution2.getUnsolvedCount() === 0) {
              return solution2;
            }
          }
          return solution2;
        }
      }
    }
    return solution;
  }
}
