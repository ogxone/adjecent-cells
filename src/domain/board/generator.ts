import { Size, Board, Color, COLORS, CellColors } from "./components";

export interface IBoardGenerator {
  generate(size: Size): Board;
}

export class RandomBoardGenerator implements IBoardGenerator {
  public generate(size: Size): Board {
    return new Board(this.generateCellColorsOfSize(size));
  }

  private generateCellColorsOfSize(size: Size): CellColors {
    let colors: CellColors = Array(size.yDim)
      .fill(undefined)
      .map(() => Array(size.xDim).fill(undefined));

    for (let i = 0; i < size.xDim; i++) {
      for (let j = 0; j < size.yDim; j++) {
        colors[i][j] = getRandomColor();
      }
    }

    return colors;
  }
}

function getRandomColor(): Color {
  return COLORS[~~(Math.random() * COLORS.length)];
}
