import { puzzleToText } from './print'
import { Puzzle } from './Puzzle'
import { Solution } from './Solution'

import { solveAll } from './solveAll'

it('should solve multiple', () => {
  const solution = new Solution(Puzzle.fromString('0'.repeat(81)))
  const iterator = solveAll(solution)
  for (let i = 0; i < 10; i++) {
    const val = iterator.next()
    if (val.value) {
      //   console.log('NO VALUE ' + i)
      console.log(puzzleToText(val.value.toPuzzle()))
    }
    if (val.done) {
      console.log('NO MORE AT ' + i)
    }
  }
})
