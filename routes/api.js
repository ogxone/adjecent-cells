import { RandomBoardGenerator } from '../src/board/generator';
import { BoardJSONMarshaler, create_size, BoardMaskJSONMarshaler } from '../src/board/components';
import { DefaultSolver } from '../src/board/solver'

var express = require('express');
var router = express.Router();

router.get('/generate-boxes/', async (req, res, next) => {
  let boardUnmarshaler, boardGenerator, size = [
    new BoardJSONMarshaler(), 
    new RandomBoardGenerator(), 
    create_size(req.query.get(x_dim), req.query.get(y_dim))
  ]

  res.send(boardUnmarshaler.marshal(boardGenerator.generate(size)))
});

router.get('/compute-biggest-contiguous-region/', async (req, res, next) => {
  let boardUnmarshaler, solver, boardMaskMarshaler = [
    new BoardJSONMarshaler(),
    new DefaultSolver(),
    new BoardMaskJSONMarshaler()
  ]

  let board = boardUnmarshaler.unmarshal(req.body)
  let boardMask = solver.solve(board)
  
  res.send(boardMaskMarshaler.marshal(boardMask))
})

module.exports = router;
