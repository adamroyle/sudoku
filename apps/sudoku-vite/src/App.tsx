import React, { useState } from "react";
import "./App.css";
import "./puzzle.css";
import { ExclusionRows } from "./ExclusionRows";
import { ExclusionSquare } from "./ExclusionSquare";
import { Puzzle } from "./Puzzle";
import { PuzzleGrid } from "./PuzzleGrid";
import { Solver } from "./Solver";
import { SquareElimination } from "./SquareElimination";
import { SolutionGrid } from "./SolutionGrid";
import { Strategy } from "./types";
import { Solution } from "./Solution";

const solver = new Solver();
solver.addStrategy(new SquareElimination());
solver.addStrategy(new ExclusionRows());
solver.addStrategy(new ExclusionSquare());

// TODO: make strategy exclusion pairs

const puzzles = [
  "010420005002071039000000040207100006000040000600007403070000000120730500300082070",
  // unsolved
  "904600000100900005070050100007080600000400003005000000006037500003006080000002001", // from mum's book - 2 light bulbs (have solved on paper)
  "000050009904001000000006800020800006070000000500270000000000728015000060003000050", // from internet - expert
  "009000005002004061080006000000030720740000009000045000905000010008010900400800002", // from mum's book - 3 light bulbs
  // solved

  "450016000090300500700400000830040100000901000009060058000004009006002080000670013",
  "210040008005000000006500200500080030000203000080070001009005300000000900600030084",
  "002007060095820000000000500000492000600000031007000004540003070000010008100670000",
  "130200009009800070000004800200065001095100060000000080020500003000000700400030620",
  "200085000004300000000020806900040000005000090060290100340002000001700030000008970",
  "001065237300029160064000900028004703000107800500200690400000520756942018910580000",
  "005000700004000290000000006060009080000008542800021070900000805070080021250000000",
  "085900000001250000700080051590000800004000600006000032910070003000045100000009760",
  "800000070030000000000540081000000100004607000700051032008900000051080600020006005",
  "000000800002000000000006403000070000000100200300000549630904050900010000008700031",
  "000000019000540030700000004580000040013600000907030008800000000030100000006809007",
  "025400000004001090000360000702003060900050004030600708000032000090100800000008240",
  "009065000000300000500000004003000007080402900000017000000000200005096800720000300",
];

const strategies: Strategy[] = [
  new SquareElimination(),
  new ExclusionRows(),
  new ExclusionSquare(),
];

interface PuzzleSolution {
  puzzle: Puzzle;
  solution: Solution;
}

function App() {
  const [useBruteForce, setUseBruteForce] = useState(false);
  const [showSolved, setShowSolved] = useState(false);
  const [selectedStrategies, setSelectedStrategies] = useState(strategies);
  const solver = new Solver();
  selectedStrategies.forEach((s) => solver.addStrategy(s));
  const combos: PuzzleSolution[] = puzzles
    .map((str) => {
      const puzzle = Puzzle.fromString(str);
      const solution = solver.solve(puzzle, useBruteForce);
      return { puzzle, solution };
    })
    .filter(showSolved ? (c) => c : (c) => c.solution.getUnsolvedCount() > 0);

  return (
    <div>
      <button onClick={() => setUseBruteForce(!useBruteForce)}>
        Toggle Brute Force
      </button>
      <button onClick={() => setShowSolved(!showSolved)}>
        {showSolved ? "Show unsolved" : "Show all"}
      </button>
      {strategies.map((strategy, i) => (
        <label key={i}>
          <input
            type="checkbox"
            checked={selectedStrategies.includes(strategy)}
            onChange={(e) =>
              setSelectedStrategies(
                e.target.checked
                  ? (s) => s.concat([strategy])
                  : (s) => s.filter((st) => st !== strategy)
              )
            }
          />
          {strategy.name}
        </label>
      ))}
      {combos.map(({ puzzle, solution }, i) => {
        return (
          <div className="puzzle-container" key={i}>
            <PuzzleGrid puzzle={puzzle} />
            <SolutionGrid solution={solution} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
