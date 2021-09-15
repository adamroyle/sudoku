import React from "react";
import { Puzzle } from "./Puzzle";

const line = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export const PuzzleGrid: React.FC<{ puzzle: Puzzle }> = ({ puzzle }) => {
  const cells = puzzle.toArray();
  return (
    <table className="puzzle">
      <tbody>
        {line.map((row) => (
          <tr key={row}>
            {line.map((col) => (
              <td key={col}>{cells[row * 9 + col] || ""}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
