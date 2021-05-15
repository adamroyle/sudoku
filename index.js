class Solver {
  strategies = [];

  addStrategy(strategy) {
    this.strategies.push(strategy);
  }

  solve(puzzle, bruteForce = true) {
    const solution = new Solution(puzzle);
    let str;
    do {
      str = solution.toString();
      for (let i = 0; i < this.strategies.length; i++) {
        this.strategies[i].execute(solution);
      }
    } while (str !== solution.toString());
    if (solution.getUnsolvedCount() && bruteForce) {
      return this.bruteForce(solution);
    }

    return solution;
  }

  bruteForce(solution) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const options = solution.getOptions(i, j);
        if (options.length === 2) {
          let solution2;
          for (let option of options) {
            const solutionCopy = solution.clone();
            solutionCopy.solveCell(i, j, option);
            solution2 = this.solve(solutionCopy.getPuzzle(), false);
            if (solution2.getUnsolvedCount() === 0) {
              return solution2;
            }
          }
          return solution2;
        }
      }
    }
    return solution;
  }
}

class Solution {
  options = [];
  constructor(puzzle) {
    this.options = puzzle.grid.map((cell) =>
      cell === 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [cell]
    );
  }

  clone() {
    return new Solution(this.getPuzzle());
  }

  getPuzzle() {
    return new Puzzle(
      this.options.map((cell) => (cell.length === 1 ? cell[0] : 0))
    );
  }

  toString() {
    return this.options.map((cell) => cell.join("|")).join(",");
  }

  getUnsolvedCount() {
    return this.options.reduce((acc, cell) => {
      //      console.log(cell)
      return cell.length > 1 ? acc + 1 : acc;
    }, 0);
  }

  getIndex(row, col) {
    return row * 9 + col;
  }

  getOptions(row, col) {
    const index = this.getIndex(row, col);
    return this.options[index];
  }

  eliminateFromCell(row, col, value) {
    const index = this.getIndex(row, col);
    this.options[index] = this.options[index].filter((v) => v !== value);
  }

  solveCell(row, col, value) {
    const index = this.getIndex(row, col);
    if (!this.options[index].includes(value)) {
      throw new Error("Value does not exist in options");
    }
    this.options[index] = [value];
  }
}

class BaseStrategy {}

class SquareRule extends BaseStrategy {
  name = "Square Rule";
  execute(solution) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.solveSquare(i * 3, j * 3, solution);
        this.squareRemaining(i * 3, j * 3, solution);
      }
    }
  }
  solveSquare(row, col, solution) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const options = solution.getOptions(row + i, col + j);
        if (options.length === 1) {
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              if (r === i && c === j) continue;
              solution.eliminateFromCell(row + r, col + c, options[0]);
            }
          }
        }
      }
    }
  }
  squareRemaining(row, col, solution) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const options = solution.getOptions(row + i, col + j);
        if (options.length > 1) {
          options.forEach((option) => {
            let exists = false;
            outer: for (let r = 0; r < 3; r++) {
              for (let c = 0; c < 3; c++) {
                if (r === i && c === j) continue;
                if (solution.getOptions(row + r, col + c).includes(option)) {
                  exists = true;
                  break outer;
                }
              }
            }
            if (!exists) {
              solution.solveCell(row + i, col + j, option);
              return false;
            }
          });
        }
      }
    }
  }
}

class RowRule extends BaseStrategy {
  name = "Row Rule";
  execute(solution) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const options = solution.getOptions(row, col);
        if (options.length === 1) {
          for (let c = 0; c < 9; c++) {
            if (col === c) continue;
            solution.eliminateFromCell(row, c, options[0]);
          }
        }
      }
    }
  }
}

class ColumnRule extends BaseStrategy {
  name = "Column Rule";
  execute(solution) {
    for (let col = 0; col < 9; col++) {
      for (let row = 0; row < 9; row++) {
        const options = solution.getOptions(row, col);
        if (options.length === 1) {
          for (let r = 0; r < 9; r++) {
            if (row === r) continue;
            solution.eliminateFromCell(r, col, options[0]);
          }
        }
      }
    }
  }
}

class ExclusionRows extends BaseStrategy {
  name = "Exclusion Rows";
  execute(solution) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.solveSquare(i * 3, j * 3, solution);
        this.solveSquare2(i * 3, j * 3, solution);
      }
    }
  }
  solveSquare(row, col, solution) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const options = solution.getOptions(row + i, col + j);
        if (options.length === 1) continue;
        options.forEach((option) => {
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              if (r === i && c === j) continue;
              if (solution.getOptions(row + r, col + c).includes(option)) {
                if (r !== i) return false;
              }
            }
          }
          for (let c = 0; c < 3; c++) {
            if (c === col / 3) continue;
            for (let r = 0; r < 3; r++) {
              solution.eliminateFromCell(row + i, c * 3 + r, option);
            }
          }
        });
      }
    }
  }
  solveSquare2(row, col, solution) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const options = solution.getOptions(row + i, col + j);
        if (options.length === 1) continue;
        options.forEach((option) => {
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              if (r === i && c === j) continue;
              if (solution.getOptions(row + r, col + c).includes(option)) {
                if (c !== j) return false;
              }
            }
          }
          for (let r = 0; r < 3; r++) {
            if (r === row / 3) continue;
            for (let c = 0; c < 3; c++) {
              solution.eliminateFromCell(r * 3 + c, col + j, option);
            }
          }
        });
      }
    }
  }
}

class Puzzle {
  grid = [];

  constructor(grid) {
    this.grid = grid;

    if (!this.validate()) {
      throw new Error("Puzzle grid not valid");
    }
  }

  validate() {
    return this.grid.length === 81;
  }

  static fromString(str) {
    const grid = str
      .replace(/[^\d]/g, "")
      .split("")
      .map((d) => parseInt(d, 10));
    return new Puzzle(grid);
  }
}

function printPuzzle(puzzle) {
  const table = document.createElement("table");
  table.className = "puzzle";
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
  let tr;
  puzzle.grid.forEach((cell, i) => {
    if (i % 9 === 0) {
      tr = document.createElement("tr");
      tbody.appendChild(tr);
    }
    const td = document.createElement("td");
    td.innerText = String(cell || "");
    tr.appendChild(td);
  });
  return table;
}

function printSolution(solution) {
  const table = document.createElement("table");
  table.className = "puzzle";
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
  let tr;
  solution.options.forEach((cell, i) => {
    if (i % 9 === 0) {
      tr = document.createElement("tr");
      tbody.appendChild(tr);
    }
    const td = document.createElement("td");
    if (cell.length === 1) {
      td.innerText = String(cell[0]);
    } else {
      cell.forEach((bit) => {
        const span = document.createElement("span");
        span.innerText = String(bit);
        td.appendChild(span);
      });
    }
    tr.appendChild(td);
  });
  return table;
}

const solver = new Solver();
solver.addStrategy(new SquareRule());
solver.addStrategy(new RowRule());
solver.addStrategy(new ColumnRule());
solver.addStrategy(new ExclusionRows());

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

let solution = solver.solve(puzzle, false);

solution.eliminateFromCell(6, 6, 5);
solution.eliminateFromCell(6, 7, 5);
solution.eliminateFromCell(6, 8, 5);
solution.eliminateFromCell(8, 8, 5);
solution.solveCell(7, 7, 5);
solution.solveCell(7, 8, 3);

const solution2 = solver.solve(solution.getPuzzle(), false);

document.body.appendChild(printPuzzle(puzzle));
document.body.appendChild(printSolution(solution));
document.body.appendChild(printSolution(solution2));

//document.body.appendChild(printPuzzle(solution.getPuzzle()))
//console.log(solution)
