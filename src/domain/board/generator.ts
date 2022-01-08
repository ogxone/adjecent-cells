
import { Size, Board } from "./components"

export interface IBoardGenerator {
    generate(size: Size): Board
}

export class RandomBoardGenerator implements IBoardGenerator {
    generate (size: Size): Board {
        throw new Error("Method not implemented.");
    }
}

export class PredefinedBoardGenerator implements IBoardGenerator {
    generate(size: Size): Board {
        throw new Error("Method not implemented.");
    }    
}
