import { boardFactory } from './board.js'


let board = boardFactory()


board.printBoard()
board.knightMoves([1,1], [0,5])
board.knightMoves([0,0], [10,7])
