import { Board, BoardMask } from './components'

interface ISolver {
    solve(board: Board): BoardMask
}

export class DefaultSolver implements ISolver {
    solve(board: Board): BoardMask {
        throw new Error('Method not implemented.');
    }
}