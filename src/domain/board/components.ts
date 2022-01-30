export class Cell {
  constructor(private position: Position, private color: Color) {}
}

export type Cells = Array<Array<Cell>>
type CellColors = Array<Array<Color>>;

export class Board {
  private cells: Cells
  private size: Size

  constructor(cellColors: CellColors) {
    [this.cells, this.size] = this.loadCells(cellColors);
  }

  private loadCells(cellColors: CellColors): [Cells, Size] {
    let cells = [];
    let [xDim, yDim] = [undefined, 0];
    cellColors.forEach((row, yPos) => {
      let cellsRow = [];
      row.forEach((cellColor, xPos) => {
        cellsRow.push(new Cell({ x: xPos, y: yPos }, cellColor));
      });
      if (xDim != undefined && cellsRow.length !== xDim) {
        throw 'Invalid cells dimensions'
      }
      xDim = cellsRow.length
      cells.push(cellsRow);
    });

    return [cells, {xDim, yDim: cells.length}]
  }
}

type CellMasks = Array<Array<boolean>>;

export class BoardMask {
  constructor(private cellMasks: CellMasks) {}
}

export enum Color {
  blue,
  green,
  red,
  yellow,
  brown,
  cyan,
  grey,
}

export type Size = { xDim: number; yDim: number };
export type Position = { x: number; y: number };
