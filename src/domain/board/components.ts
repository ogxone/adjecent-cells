class Cell {
    constructor(private position: Position, private color: Color) {}
}

type Cells = Array<Array<Cell>>

export class Board {
    constructor(private cells: Cells) {}
}

export class BoardMask {
    constructor(private size: Size) {}
}

enum Color {
    blue,
    green,
    red,
    yellow,
    brown,
    cyan,
    grey
}

export type Size = {xDim: number, yDim: number}
export type Position = {x: number, y: number}
