import { IsArray, IsEnum, IsInt, Max, Min } from "class-validator";
import { Board, Cell, Cells, Color, Position, Size } from "@domain/board/components";
import internal from "stream";
import { Type } from "class-transformer";

class SizeSchema {
  @IsInt()
  @Min(2)
  @Max(100)
  public xDim: number;

  @IsInt()
  @Min(2)
  @Max(100)
  public yDim: number;

  public getSize(): Size {
    return { xDim: this.xDim, yDim: this.yDim };
  }
}

class PositionSchema {
  @IsInt()
  @Min(0)
  @Max(99)
  x: number;

  @IsInt()
  @Min(0)
  @Max(99)
  y: number;

  public getPosition(): Position {
    return {x: this.x, y: this.y}
  }
}

class BoardCellSchema {
  @Type(() => PositionSchema)
  position: PositionSchema;

  @IsEnum(Color)
  color: Color;
}

class BoardSchema {
  @IsArray()
  @Type(() => BoardCellSchema)
  public cells: BoardCellSchema[][];

  public getBoard(): Board {
    let cells: Cells = [];
    for (let rowSchema of this.cells) {
      let row = [];

      for (let cellSchema of rowSchema) {
        row.push(
          new Cell(cellSchema.position.getPosition(), Color[cellSchema.color])
        );
      }

      cells.push(row);
    }

    return new Board(cells)
  }
}

export { SizeSchema, BoardSchema };
