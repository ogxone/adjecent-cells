import { IsInt, Max, Min } from "class-validator";
import { Board, Size } from "@domain/board/components";

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

class BoardCellSchema {

}

class BoardSchema {
  public getBoard(): Board {
      throw 'Not implemented'
  }
}

export { SizeSchema, BoardSchema };
