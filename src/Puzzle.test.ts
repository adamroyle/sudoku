import { Puzzle } from './Puzzle'

test('throws on invalid length', () => {
  expect(() => new Puzzle([0, 1, 2])).toThrow()
})

test('fromString returns Puzzle', () => {
  const str = '025400000004001090000360000702003060900050004030600708000032000090100800000008240'
  const puzzle = Puzzle.fromString(str)

  expect(puzzle).toBeInstanceOf(Puzzle)
  expect(puzzle.toString()).toEqual(str)
})

test('fromString throws on invalid length', () => {
  const str = '02540000000400109000036000070200306090005000403060070800003200009010080000000824'
  expect(() => Puzzle.fromString(str)).toThrow()
})

test('toGrid returns array of arrays', () => {
  const str = '025400000004001090000360000702003060900050004030600708000032000090100800000008240'
  const puzzle = Puzzle.fromString(str)
  const grid = puzzle.toGrid()

  expect(grid).toEqual([
    [0, 2, 5, 4, 0, 0, 0, 0, 0],
    [0, 0, 4, 0, 0, 1, 0, 9, 0],
    [0, 0, 0, 3, 6, 0, 0, 0, 0],
    [7, 0, 2, 0, 0, 3, 0, 6, 0],
    [9, 0, 0, 0, 5, 0, 0, 0, 4],
    [0, 3, 0, 6, 0, 0, 7, 0, 8],
    [0, 0, 0, 0, 3, 2, 0, 0, 0],
    [0, 9, 0, 1, 0, 0, 8, 0, 0],
    [0, 0, 0, 0, 0, 8, 2, 4, 0],
  ])
})
