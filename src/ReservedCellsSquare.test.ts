import { Puzzle } from './Puzzle'
import { ReservedCellsSquare } from './ReservedCellsSquare'
import { Solution } from './Solution'

test('it works', () => {
  const puzzle = Puzzle.fromString('954610000162970005378254196007380600001400003035700000016837509503196080789542361')
  const solution = new Solution(puzzle)
  new ReservedCellsSquare().execute(solution)

  expect(solution.getOptions(4, 0)).not.toContain(2)
  expect(solution.getOptions(5, 0)).not.toContain(2)
  expect(solution.getOptions(5, 0)).not.toContain(4)
})
