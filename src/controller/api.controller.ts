import { Body, JsonController, Post } from 'routing-controllers'; 
import { BoardSchema, SizeSchema } from '@infra/adapter/schema/class-validator'
import { RandomBoardGenerator } from '@domain/board/generator';
import { DefaultSolver } from '@domain/board/solver';
import { instanceToPlain } from 'class-transformer';

@JsonController('/api')
class ApiController {
    @Post('/generate-board/')
    public generateBoxes(@Body() sizeSchema: SizeSchema) {
        let boardGenerator = new RandomBoardGenerator()
        
        let board = boardGenerator.generate(sizeSchema.getSize())

        return instanceToPlain(board)
    }

    @Post('/find-adjecent-cells/')
    public computeBiggestRegion(@Body() boardSchema: BoardSchema) {
        let solver = new DefaultSolver()

        let boardMask = solver.solve(boardSchema.getBoard())

        return JSON.stringify(instanceToPlain(boardMask))
    }
}

export { ApiController }
