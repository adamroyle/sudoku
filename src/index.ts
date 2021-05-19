import { ExclusionRows } from './ExclusionRows'
import { Puzzle } from './Puzzle'
import { Solver } from './Solver'
import { printPuzzle, printSolution } from './print'
import { ExclusionSquare } from './ExclusionSquare'
import { SquareElimination } from './SquareElimination'

const solver = new Solver()
solver.addStrategy(new SquareElimination())
solver.addStrategy(new ExclusionRows())
solver.addStrategy(new ExclusionSquare())

// TODO: make strategy exclusion pairs

const puzzles = [
  // unsolved
  '000050009904001000000006800020800006070000000500270000000000728015000060003000050', // from internet - expert
  '009000005002004061080006000000030720740000009000045000905000010008010900400800002', // from mum's book - 3 light bulbs
  // solved
  '001065237300029160064000900028004703000107800500200690400000520756942018910580000',
  '005000700004000290000000006060009080000008542800021070900000805070080021250000000',
  '085900000001250000700080051590000800004000600006000032910070003000045100000009760',
  '800000070030000000000540081000000100004607000700051032008900000051080600020006005',
  '000000800002000000000006403000070000000100200300000549630904050900010000008700031',
  '000000019000540030700000004580000040013600000907030008800000000030100000006809007',
  '025400000004001090000360000702003060900050004030600708000032000090100800000008240',
  '009065000000300000500000004003000007080402900000017000000000200005096800720000300',
]

puzzles.forEach((puzzleString) => {
  const puzzle = Puzzle.fromString(puzzleString)
  const solution = solver.solve(puzzle, false)

  const puzzleRow = document.createElement('div')
  puzzleRow.className = 'puzzle-container'
  puzzleRow.appendChild(printPuzzle(puzzle))
  puzzleRow.appendChild(printSolution(solution))
  document.body.appendChild(puzzleRow)
})
