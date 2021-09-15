import { ExclusionSquare } from './ExclusionSquare'
import { Puzzle } from './Puzzle'
import { Solution } from './Solution'

test('exclude number from other cells within square if one row must contain that number', () => {
  const puzzle = Puzzle.fromString('0'.repeat(7 * 9) + '297 146 800' + '0'.repeat(9))
  const solution = new Solution(puzzle)
  new ExclusionSquare().execute(solution)

  expect(solution.getOptions(6, 6)).not.toContain(5)
  expect(solution.getOptions(6, 7)).not.toContain(5)
  expect(solution.getOptions(6, 8)).not.toContain(5)
  expect(solution.getOptions(8, 6)).not.toContain(5)
  expect(solution.getOptions(8, 7)).not.toContain(5)
  expect(solution.getOptions(8, 8)).not.toContain(5)

  expect(solution.getOptions(6, 6)).not.toContain(3)
  expect(solution.getOptions(6, 7)).not.toContain(3)
  expect(solution.getOptions(6, 8)).not.toContain(3)
  expect(solution.getOptions(8, 6)).not.toContain(3)
  expect(solution.getOptions(8, 7)).not.toContain(3)
  expect(solution.getOptions(8, 8)).not.toContain(3)
})

test('#2: exclude number from other cells within square if one row must contain that number', () => {
  const puzzle = Puzzle.fromString('0'.repeat(2 * 9) + '002 971 468' + '0'.repeat(6 * 9))
  const solution = new Solution(puzzle)
  new ExclusionSquare().execute(solution)

  expect(solution.getOptions(0, 0)).not.toContain(5)
  expect(solution.getOptions(0, 1)).not.toContain(5)
  expect(solution.getOptions(0, 2)).not.toContain(5)
  expect(solution.getOptions(1, 0)).not.toContain(5)
  expect(solution.getOptions(1, 1)).not.toContain(5)
  expect(solution.getOptions(1, 2)).not.toContain(5)

  expect(solution.getOptions(0, 0)).not.toContain(3)
  expect(solution.getOptions(0, 1)).not.toContain(3)
  expect(solution.getOptions(0, 2)).not.toContain(3)
  expect(solution.getOptions(1, 0)).not.toContain(3)
  expect(solution.getOptions(1, 1)).not.toContain(3)
  expect(solution.getOptions(1, 2)).not.toContain(3)
})

test('exclude number from other cells within square if one col must contain that number', () => {
  const puzzle = Puzzle.fromString(`
    000000000
    000000000
    200000000
    900000000
    700000000
    100000000
    400000000
    600000000
    800000000`)
  const solution = new Solution(puzzle)
  new ExclusionSquare().execute(solution)

  expect(solution.getOptions(0, 1)).not.toContain(5)
  expect(solution.getOptions(0, 2)).not.toContain(5)
  expect(solution.getOptions(1, 1)).not.toContain(5)
  expect(solution.getOptions(1, 2)).not.toContain(5)
  expect(solution.getOptions(2, 1)).not.toContain(5)
  expect(solution.getOptions(2, 2)).not.toContain(5)

  expect(solution.getOptions(0, 1)).not.toContain(3)
  expect(solution.getOptions(0, 2)).not.toContain(3)
  expect(solution.getOptions(1, 1)).not.toContain(3)
  expect(solution.getOptions(1, 2)).not.toContain(3)
  expect(solution.getOptions(2, 1)).not.toContain(3)
  expect(solution.getOptions(2, 2)).not.toContain(3)
})
