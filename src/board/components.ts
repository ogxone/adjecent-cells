class Cell {
    constructor(private position: Position, private color: Color) {}
}

type Cells = Array<Array<Cell>>

export class Board {
    constructor(private cells: Cells) {}
}

export class BoardJSONMarshaler {
    marshal(board: Board): string {
        return ''
    }

    unmarshal(boardAsString: string): Board {
        throw 'error'
    }
}

export class BoardMaskJSONMarshaler {
    marshal(boardMask: BoardMask): string {
        return ''
    }
}

export class BoardMask {
}

enum Color {
    blue,
    green,
    red,
    yellow,
    brown,
    cian,
    grey
}

export const create_size = (x_dim: number, y_dim: number): Size => {
    return {x_dim, y_dim}
}

export type Size = {x_dim: number, y_dim: number}
export type Position = {x: number, y: number}
