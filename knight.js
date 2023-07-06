function knightFactory() {
    function possibleMove(x,y) {
        return [board[x+2][y+1], board[x+2][y-1], board[x+1][y+2], board[x+1][y-2], board[x-2][y-1], board[x-2][y+1], board[x-1][y-2], board[x-1][y+2]]
    }

    return {knightFactory}
}

export {knightFactory}