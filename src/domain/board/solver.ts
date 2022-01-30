import { Board, BoardMask } from './components'

interface ISolver {
    solve(board: Board): BoardMask
}

export class DefaultSolver implements ISolver {
    solve(board: Board): BoardMask {
        return new BoardMask([])
    }
}
