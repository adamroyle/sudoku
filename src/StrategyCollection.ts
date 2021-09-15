import { Strategy } from './types'
import { Solution } from './Solution'

export class StrategyCollection implements Strategy {
  name = 'Strategy Collection'

  strategies: Strategy[] = []

  constructor(strategies: Strategy[]) {
    this.strategies = strategies
  }

  solve(solution: Solution): void {
    let str: string
    do {
      str = solution.toString()
      for (let i = 0; i < this.strategies.length; i++) {
        this.strategies[i].solve(solution)
      }
    } while (str !== solution.toString())
  }
}
