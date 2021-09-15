import React from "react";
import { Puzzle } from "./Puzzle";
import { Solution } from "./Solution";

const line = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export const SolutionGrid: React.FC<{ solution: Solution }> = ({
  solution,
}) => {
  const cells = solution.toArray();
  return (
    <table className="puzzle">
      <tbody>
        {line.map((row) => (
          <tr key={row}>
            {line.map((col) => (
              <td key={col}>
                {cells[row * 9 + col].length === 1
                  ? cells[row * 9 + col][0]
                  : cells[row * 9 + col].map((num) => (
                      <span key={num}>{num}</span>
                    ))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
