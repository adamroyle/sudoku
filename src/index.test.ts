import { Puzzle } from "./Puzzle";

it("something", () => {
  const str =
    "025400000004001090000360000702003060900050004030600708000032000090100800000008240";
  const puzzle = Puzzle.fromString(str);

  expect(puzzle).toBeInstanceOf(Puzzle);
  expect(puzzle.toString()).toEqual(str);
});
