import { Strategy } from './types'
import { Solution } from './Solution'

export class Solver {
  strategies: Strategy[] = []

  constructor(strategies: Strategy[]) {
    this.strategies = strategies
  }

  solve(solution: Solution): Solution {
    solution = solution.clone()
    let str: string
    do {
      str = solution.toString()
      for (let i = 0; i < this.strategies.length; i++) {
        this.strategies[i].execute(solution)
      }
    } while (str !== solution.toString())
    return solution
  }
}
