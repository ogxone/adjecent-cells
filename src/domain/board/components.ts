export class Cell {
  constructor(private position: Position, private color: Color) {}

  public getUpperPosition(): Position {
    return createPosition(this.position.x, this.position.y - 1);
  }

  public getLeftPosition(): Position {
    return createPosition(this.position.x - 1, this.position.y);
  }

  public getRightPosition(): Position {
    return createPosition(this.position.x + 1, this.position.y);
  }

  public getBottomPosition(): Position {
    return createPosition(this.position.x, this.position.y + 1);
  }

  public getColor(): Color {
    return this.color;
  }

  public get positionAsText(): string {
    return `${this.position.x}_${this.position.y}`
  }
}

export type Cells = Array<Array<Cell>>;
export type CellColors = Array<Array<Color>>;

export class Board {
  private cells: Cells;
  private size: Size;

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
        throw "Invalid cells dimensions";
      }
      xDim = cellsRow.length;
      cells.push(cellsRow);
    });

    return [cells, { xDim, yDim: cells.length }];
  }

  public *[Symbol.iterator]() {
    for(let row of this.cells) {
      for(let cell of row) {
        yield cell;
      }
    }
  }

  public getCellAtPosition(position: Position): Cell | null {
    return this.cells?.[position.y]?.[position.x] ?? null;
  }
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

export const COLORS = [Color.blue, Color.green, Color.red, Color.yellow, Color.brown, Color.cyan, Color.grey]

export function createPosition(x: number, y: number): Position {
  return { x, y };
}

export type Size = { xDim: number; yDim: number };
export type Position = { x: number; y: number };
