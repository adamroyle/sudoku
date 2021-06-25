import { Solver } from './index'
import { ExclusionRows } from './ExclusionRows'
import { ExclusionSquare } from './ExclusionSquare'
import { ReservedCellsSquare } from './ReservedCellsSquare'
import { SquareElimination } from './SquareElimination'
import { Puzzle } from './index'
import { Solution } from './index'
import { BruteSolver } from './index'
import { Strategy } from './index'

const allStrategies: Strategy[] = [
  new ExclusionRows(),
  new ExclusionSquare(),
  new ReservedCellsSquare(),
  new SquareElimination(),
]

it('should solve all these puzzles', () => {
  const puzzles = [
    '904600000100900005070050100007080600000400003005000000006037500003006080000002001',
    '000050009904001000000006800020800006070000000500270000000000728015000060003000050',
    '450016000090300500700400000830040100000901000009060058000004009006002080000670013',
    '210040008005000000006500200500080030000203000080070001009005300000000900600030084',
    '002007060095820000000000500000492000600000031007000004540003070000010008100670000',
    '130200009009800070000004800200065001095100060000000080020500003000000700400030620',
    '200085000004300000000020806900040000005000090060290100340002000001700030000008970',
    '001065237300029160064000900028004703000107800500200690400000520756942018910580000',
    '005000700004000290000000006060009080000008542800021070900000805070080021250000000',
    '085900000001250000700080051590000800004000600006000032910070003000045100000009760',
    '800000070030000000000540081000000100004607000700051032008900000051080600020006005',
    '000000800002000000000006403000070000000100200300000549630904050900010000008700031',
    '000000019000540030700000004580000040013600000907030008800000000030100000006809007',
    '025400000004001090000360000702003060900050004030600708000032000090100800000008240',
    '009065000000300000500000004003000007080402900000017000000000200005096800720000300',
  ]

  const solver = new Solver(allStrategies)

  for (let puzzle of puzzles) {
    const solution = solver.solve(new Solution(Puzzle.fromString(puzzle)))
    expect(solution.getUnsolvedCount()).toBe(0)
  }
})

it('should brute solve these puzzles', () => {
  const puzzles = ['009000005002004061080006000000030720740000009000045000905000010008010900400800002']

  const solver = new BruteSolver(new Solver(allStrategies))

  for (let puzzle of puzzles) {
    const solution = solver.solve(new Solution(Puzzle.fromString(puzzle)))
    expect(solution.getUnsolvedCount()).toBe(0)
  }
})
