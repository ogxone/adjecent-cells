import { max } from "class-validator";
import { Board, Cell } from "./components";

interface ISolver {
  solve(board: Board): AdjecentCells;
}
export class DefaultSolver implements ISolver {
  public solve(board: Board): AdjecentCells {
    let result = new BestResultHolder();
    let dfsSearcher = new DFSSearcher(board);
    for (let cell of board) {
      let adjecentCells = dfsSearcher.searchNeighborsOfSameColorFor(cell);
      result.overrideIfBetter(adjecentCells);
    }

    return result.get();
  }
}

class DFSSearcher {
  private visitedCells: VisitedCells;

  public constructor(private board: Board) {
    this.visitedCells = new VisitedCells();
  }

  public searchNeighborsOfSameColorFor(cell: Cell) {
    return this.doSearchNeighborsOfSameColorFor(cell, new AdjecentCells());
  }

  private doSearchNeighborsOfSameColorFor(
    cell: Cell,
    adjacencyList: AdjecentCells
  ) {
    if (this.visitedCells.isVisited(cell)) {
      return adjacencyList;
    }

    this.visitedCells.visit(cell);
    adjacencyList.addCell(cell);

    let neighbors = [
      this.board.getCellAtPosition(cell.getUpperPosition()),
      this.board.getCellAtPosition(cell.getLeftPosition()),
      this.board.getCellAtPosition(cell.getRightPosition()),
      this.board.getCellAtPosition(cell.getBottomPosition()),
    ];

    for (let neighborCell of neighbors) {
      if (neighborCell && cell.getColor() == neighborCell.getColor()) {
        this.doSearchNeighborsOfSameColorFor(neighborCell, adjacencyList);
      }
    }

    return adjacencyList;
  }
}

class BestResultHolder {
  private bestResult: AdjecentCells = null;

  public overrideIfBetter(result: AdjecentCells) {
    if (!this.bestResult || result.count > this.bestResult.count) {
      this.bestResult = result;
    }
  }

  public get(): AdjecentCells {
    return this.bestResult ?? new AdjecentCells();
  }
}
export class AdjecentCells {
  private cells = [];
  private _count = 0;

  public constructor(cells: Array<Cell> = null) {
    if (cells) {
      for (let cell of cells) {
        this.addCell(cell);
      }
    }
  }

  public addCell(cell: Cell) {
    this.cells.push(cell);
    this._count++;
  }

  public get count(): number {
    return this._count;
  }
}

class VisitedCells {
  private hash: { [key: string]: Cell } = {};

  public isVisited(cell: Cell): boolean {
    return this.hash.hasOwnProperty(cell.positionAsText);
  }

  public visit(cell: Cell) {
    this.hash[cell.positionAsText] = cell;
  }
}
