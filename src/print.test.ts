import { printPuzzle, puzzleToText } from './print'
import { Puzzle } from './Puzzle'

test('puzzleToText returns grid', () => {
  const str = '025400000004001090000360000702003060900050004030600708000032000090100800000008240'
  const puzzle = Puzzle.fromString(str)
  const text = puzzleToText(puzzle)
  expect(text).toBe(
    `
┏━━━┯━━━┯━━━┳━━━┯━━━┯━━━┳━━━┯━━━┯━━━┓
┃   │ 2 │ 5 ┃ 4 │   │   ┃   │   │   ┃
┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
┃   │   │ 4 ┃   │   │ 1 ┃   │ 9 │   ┃
┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
┃   │   │   ┃ 3 │ 6 │   ┃   │   │   ┃
┣━━━┿━━━┿━━━╋━━━┿━━━┿━━━╋━━━┿━━━┿━━━┫
┃ 7 │   │ 2 ┃   │   │ 3 ┃   │ 6 │   ┃
┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
┃ 9 │   │   ┃   │ 5 │   ┃   │   │ 4 ┃
┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
┃   │ 3 │   ┃ 6 │   │   ┃ 7 │   │ 8 ┃
┣━━━┿━━━┿━━━╋━━━┿━━━┿━━━╋━━━┿━━━┿━━━┫
┃   │   │   ┃   │ 3 │ 2 ┃   │   │   ┃
┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
┃   │ 9 │   ┃ 1 │   │   ┃ 8 │   │   ┃
┠───┼───┼───╂───┼───┼───╂───┼───┼───┨
┃   │   │   ┃   │   │ 8 ┃ 2 │ 4 │   ┃
┗━━━┷━━━┷━━━┻━━━┷━━━┷━━━┻━━━┷━━━┷━━━┛
`.slice(1)
  )
})

test('printPuzzle returns DOM', () => {
  const dom = printPuzzle(
    Puzzle.fromString('025400000004001090000360000702003060900050004030600708000032000090100800000008240')
  )
  const tableHtml = `<table class="puzzle"><tbody><tr><td></td><td>2</td><td>5</td><td>4</td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td>4</td><td></td><td></td><td>1</td><td></td><td>9</td><td></td></tr><tr><td></td><td></td><td></td><td>3</td><td>6</td><td></td><td></td><td></td><td></td></tr><tr><td>7</td><td></td><td>2</td><td></td><td></td><td>3</td><td></td><td>6</td><td></td></tr><tr><td>9</td><td></td><td></td><td></td><td>5</td><td></td><td></td><td></td><td>4</td></tr><tr><td></td><td>3</td><td></td><td>6</td><td></td><td></td><td>7</td><td></td><td>8</td></tr><tr><td></td><td></td><td></td><td></td><td>3</td><td>2</td><td></td><td></td><td></td></tr><tr><td></td><td>9</td><td></td><td>1</td><td></td><td></td><td>8</td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td>8</td><td>2</td><td>4</td><td></td></tr></tbody></table>`
  expect(dom.outerHTML).toBe(tableHtml)
})
