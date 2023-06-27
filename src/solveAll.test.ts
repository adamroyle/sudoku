import { puzzleToText } from './print'
import { Puzzle } from './Puzzle'
import { Solution } from './Solution'

import { solveAll } from './solveAll'

it('should solve multiple', () => {
  const solution = new Solution(Puzzle.fromString('0'.repeat(81)))
  const iterator = solveAll(solution)
  expect(iterator.next().done).toBe(false)
  // for (let i = 0; i < 10; i++) {
  //   const val = iterator.next()
    // console.log(val)
  //   if (val.value) {
  //     //   console.log('NO VALUE ' + i)
  //     console.log(val.value.toPuzzle().toString())
  //   }
  //   if (val.done) {
  //     console.log('NO MORE AT ' + i)
  //   }
  // }
})

it('should solve these puzzles with single result', () => {
  const puzzles = [
    '009000005002004061080006000000030720740000009000045000905000010008010900400800002',
    '008007090951000000000050048000002107090000050703800000630090000000000463080300700',
    '000007300000050976000040050200800400003102600001004009010070000356080000007400000',
    '003000900480205063600000008010804030070000080060709020200000006840603071006000300',
    '010002008500907001003005000000000040170000053040000000000500600300208009900700010',
    '800000001006901800050030040060709050001000400070802010010080060004107300300000002',
    '007003902000800000943000007690000000300527000000000840000048000260000000000000129',
  ]
  for (let str of puzzles) {
    const solution = new Solution(Puzzle.fromString(str))
    const result = solveAll(solution)
    expect(Array.from(result).length).toBe(1)
  }
})
