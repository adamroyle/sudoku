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

//const puzzle = Puzzle.fromString('001065237300029160064000900028004703000107800500200690400000520756942018910580000')
//const puzzle = Puzzle.fromString('005000700004000290000000006060009080000008542800021070900000805070080021250000000')
//const puzzle = Puzzle.fromString('085900000001250000700080051590000800004000600006000032910070003000045100000009760')
//const puzzle = Puzzle.fromString('800000070030000000000540081000000100004607000700051032008900000051080600020006005')

const puzzle = Puzzle.fromString('000000800002000000000006403000070000000100200300000549630904050900010000008700031')

//const puzzle = Puzzle.fromString('000000019000540030700000004580000040013600000907030008800000000030100000006809007')

// const puzzle = Puzzle.fromString('025400000004001090000360000702003060900050004030600708000032000090100800000008240')

// const puzzle = Puzzle.fromString(`000000000000000000200000000900000000700000000100000000400000000600000000800000000`)

let solution = solver.solve(puzzle, false)

// const solution2 = solution.clone()
// new ExclusionSquare().execute(solution2)

document.body.appendChild(printPuzzle(puzzle))
document.body.appendChild(printSolution(solution))
// document.body.appendChild(printSolution(solution2))

//document.body.appendChild(printPuzzle(solution.getPuzzle()))
//console.log(solution)
