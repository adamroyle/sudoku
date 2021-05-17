import { Puzzle } from './Puzzle'
import { Solution } from './Solution'

export function printPuzzle(puzzle: Puzzle) {
  const table = document.createElement('table')
  table.className = 'puzzle'
  const tbody = document.createElement('tbody')
  table.appendChild(tbody)
  let tr = document.createElement('tr')
  puzzle.toArray().forEach((cell, i) => {
    if (i % 9 === 0) {
      tr = document.createElement('tr')
      tbody.appendChild(tr)
    }
    const td = document.createElement('td')
    td.innerText = String(cell || '')
    tr.appendChild(td)
  })
  return table
}

export function printSolution(solution: Solution) {
  const table = document.createElement('table')
  table.className = 'puzzle'
  const tbody = document.createElement('tbody')
  table.appendChild(tbody)
  let tr = document.createElement('tr')
  solution.toArray().forEach((cell, i) => {
    if (i % 9 === 0) {
      tr = document.createElement('tr')
      tbody.appendChild(tr)
    }
    const td = document.createElement('td')
    if (cell.length === 1) {
      td.innerText = String(cell[0])
    } else {
      cell.forEach((bit) => {
        const span = document.createElement('span')
        span.innerText = String(bit)
        td.appendChild(span)
      })
    }
    tr.appendChild(td)
  })
  return table
}
