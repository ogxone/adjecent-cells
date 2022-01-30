import { Board, BoardMask, Color } from "@domain/board/components";
import { DefaultSolver } from "@domain/board/solver";
import { equal } from "assert";

describe("Test default solver", () => {
  let boards: Array<[string, Board, BoardMask]> = [
    // let boards = [
    [
      "board1",
      new Board([
        [Color.blue, Color.brown, Color.cyan],
        [Color.blue, Color.brown, Color.cyan],
        [Color.blue, Color.brown, Color.cyan],
        [Color.blue, Color.grey, Color.grey],
      ]),
      new BoardMask([
        [true, false, false],
        [true, false, false],
        [true, false, false],
        [true, false, false],
      ]),
    ],
  ];

  // boards.forEach((data: [ string,  Board, BoardMask ], idx) => {
  boards.forEach((data: [string, Board, BoardMask], idx) => {
    let [title, board, expectedMask] = data;
    it(title, () => {
      let solver = new DefaultSolver();

      let actualMask = solver.solve(board);

      equal(expectedMask, actualMask);
    });
  });
});
