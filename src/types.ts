import { Solution } from './Solution'

export interface Strategy {
  name: string
  solve: (solution: Solution) => void
}
