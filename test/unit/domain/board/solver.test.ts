import { Board, Cell, Color, createPosition } from "@domain/board/components";
import { AdjecentCells, DefaultSolver } from "@domain/board/solver";
import chai from "chai";

describe("Test default solver", () => {
  let boards: Array<[string, Board, AdjecentCells]> = [
    [
      "board1",
      new Board([
        [Color.blue, Color.brown, Color.cyan],
        [Color.blue, Color.brown, Color.cyan],
        [Color.blue, Color.brown, Color.cyan],
        [Color.blue, Color.grey, Color.grey],
      ]),
      new AdjecentCells([
        new Cell(createPosition(0, 0), Color.blue),
        new Cell(createPosition(0, 1), Color.blue),
        new Cell(createPosition(0, 2), Color.blue),
        new Cell(createPosition(0, 3), Color.blue),
      ]),
    ],
    [
      "board2",
      new Board([
        [Color.green, Color.green, Color.blue, Color.red],
        [Color.green, Color.blue, Color.red, Color.blue],
        [Color.red, Color.blue, Color.blue, Color.blue],
      ]),
      new AdjecentCells([
        new Cell(createPosition(1, 1), Color.blue),
        new Cell(createPosition(1, 2), Color.blue),
        new Cell(createPosition(2, 2), Color.blue),
        new Cell(createPosition(3, 2), Color.blue),
        new Cell(createPosition(3, 1), Color.blue),
      ]),
    ],
  ];

  // boards.forEach((data: [ string,  Board, BoardMask ], idx) => {
  boards.forEach((data: [string, Board, AdjecentCells], idx) => {
    let [title, board, expectedAdjecentCells] = data;
    it(title, () => {
      let solver = new DefaultSolver();

      let actualAdjecentCells = solver.solve(board);

      chai.assert.deepEqual(expectedAdjecentCells, actualAdjecentCells);
    });
  });
});
