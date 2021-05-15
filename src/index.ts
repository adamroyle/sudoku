import { ColumnRule } from './ColumnRule'
import { ExclusionRows } from './ExclusionRows'
import { Puzzle } from './Puzzle'
import { RowRule } from './RowRule'
import { Solver } from './Solver'
import { SquareRule } from './SquareRule'
import { printPuzzle, printSolution } from './print'

const solver = new Solver()
solver.addStrategy(new SquareRule())
solver.addStrategy(new RowRule())
solver.addStrategy(new ColumnRule())
solver.addStrategy(new ExclusionRows())

// TODO: make strategy exclusion pairs

//const puzzle = new Puzzle([0,0,1,0,6,5,2,3,7,3,0,0,0,2,9,1,6,0,0,6,4,0,0,0,9,0,0,0,2,8,0,0,4,7,0,3,0,0,0,1,0,7,8,0,0,5,0,0,2,0,0,6,9,0,4,0,0,0,0,0,5,2,0,7,5,6,9,4,2,0,1,8,9,1,0,5,8,0,0,0,0])
//const puzzle = new Puzzle([0,0,5,0,0,0,7,0,0,0,0,4,0,0,0,2,9,0,0,0,0,0,0,0,0,0,6,0,6,0,0,0,9,0,8,0,0,0,0,0,0,8,5,4,2,8,0,0,0,2,1,0,7,0,9,0,0,0,0,0,8,0,5,0,7,0,0,8,0,0,2,1,2,5,0,0,0,0,0,0,0])
//const puzzle = new Puzzle([0,8,5,9,0,0,0,0,0,0,0,1,2,5,0,0,0,0,7,0,0,0,8,0,0,5,1,5,9,0,0,0,0,8,0,0,0,0,4,0,0,0,6,0,0,0,0,6,0,0,0,0,3,2,9,1,0,0,7,0,0,0,3,0,0,0,0,4,5,1,0,0,0,0,0,0,0,9,7,6,0])
//const puzzle = new Puzzle([8,0,0,0,0,0,0,7,0,0,3,0,0,0,0,0,0,0,0,0,0,5,4,0,0,8,1,0,0,0,0,0,0,1,0,0,0,0,4,6,0,7,0,0,0,7,0,0,0,5,1,0,3,2,0,0,8,9,0,0,0,0,0,0,5,1,0,8,0,6,0,0,0,2,0,0,0,6,0,0,5])

// unsolvable
//const puzzle = new Puzzle([0,0,0,0,0,0,8,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,6,4,0,3,0,0,0,0,7,0,0,0,0,0,0,0,1,0,0,2,0,0,3,0,0,0,0,0,5,4,9,6,3,0,9,0,4,0,5,0,9,0,0,0,1,0,0,0,0,0,0,8,7,0,0,0,3,1])

// prettier-ignore
//const puzzle = new Puzzle([0,0,0,0,0,0,0,1,9,0,0,0,5,4,0,0,3,0,7,0,0,0,0,0,0,0,4,5,8,0,0,0,0,0,4,0,0,1,3,6,0,0,0,0,0,9,0,7,0,3,0,0,0,8,8,0,0,0,0,0,0,0,0,0,3,0,1,0,0,0,0,0,0,0,6,8,0,9,0,0,7])

const puzzle = Puzzle.fromString('025400000004001090000360000702003060900050004030600708000032000090100800000008240')

let solution = solver.solve(puzzle, false)

solution.eliminateFromCell(6, 6, 5)
solution.eliminateFromCell(6, 7, 5)
solution.eliminateFromCell(6, 8, 5)
solution.eliminateFromCell(8, 8, 5)
// solution.solveCell(7, 7, 5);
// solution.solveCell(7, 8, 3);

const solution2 = solver.solve(solution.getPuzzle(), false)

document.body.appendChild(printPuzzle(puzzle))
document.body.appendChild(printSolution(solution))
document.body.appendChild(printSolution(solution2))

//document.body.appendChild(printPuzzle(solution.getPuzzle()))
//console.log(solution)
