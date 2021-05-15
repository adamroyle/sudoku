import { Solution } from './Solution'

export interface Strategy {
  name: string
  execute: (solution: Solution) => void
}
