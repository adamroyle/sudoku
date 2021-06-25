import { Solution } from './Solution'
import { Solver } from './Solver'

export class BruteSolver {
  private solver: Solver

  constructor(solver: Solver) {
    this.solver = solver
  }

  solve(solution: Solution): Solution {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const options = solution.getOptions(i, j)
        if (options.length === 2) {
          let solution2 = solution
          for (let option of options) {
            const solutionCopy = solution.clone()
            try {
              solutionCopy.solveCell(i, j, option)
              solution2 = this.solver.solve(solutionCopy)
              if (solution2.getUnsolvedCount() === 0) {
                return solution2
              }
            } catch (e) {
              // ignore errors
            }
          }
        }
      }
    }
    return solution
  }
}
