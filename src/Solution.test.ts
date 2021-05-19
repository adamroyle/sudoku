import { Puzzle } from './Puzzle'
import { Solution } from './Solution'

test('Solution should understand basic sudoku rules', () => {
  const solution = new Solution(Puzzle.fromString('1' + '0'.repeat(80)))
  // same square
  expect(solution.getOptions(1, 1)).not.toContain(1)
  // same row
  expect(solution.getOptions(0, 7)).not.toContain(1)
  // same column
  expect(solution.getOptions(7, 0)).not.toContain(1)
  // other column/row (sanity test)
  expect(solution.getOptions(5, 5)).toContain(1)
})
