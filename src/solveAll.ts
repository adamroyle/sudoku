import { Solution } from './Solution'

export function* solveAll(solution: Solution) {
  const cell = getCell(solution)
  if (cell) {
    const [row, col] = cell
    const options = solution.getOptions(row, col)
    for (let option of options) {
      const solutionCopy = solution.clone()
      try {
        solutionCopy.solveCell(row, col, option)

        if (solutionCopy.getUnsolvedCount() > 0) {
          // brute solve recursively
          const iter = solveAll(solutionCopy)
          while (true) {
            const result = iter.next()
            if (result.value) {
              const laSol = result.value as Solution
              if (laSol.getUnsolvedCount() === 0) {
                yield laSol
              }
            }
            if (result.done) {
              break
            }
          }
          // ignore this copy if it didn't solve
          if (solutionCopy.getUnsolvedCount() > 0) {
            continue
          }
        }

        yield solutionCopy
      } catch (e) {
        // ignore errors
      }
    }
  }
}

function getCell(solution: Solution): [number, number] | void {
  let row = -1
  let col = -1
  let num = 10
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const options = solution.getOptions(i, j)
      if (options.length === 2) {
        return [i, j]
      } else if (options.length > 1 && options.length < num) {
        row = i
        col = j
        num = options.length
      }
    }
  }
  if (num < 10) return [row, col]
}
