
function boardFactory () {
    function showPossibleMoves(node, visitedMoves) {
        let x = node.data[0]
        let y = node.data[1]

        // Stringify the node data and visited moves to be able to compare them (can't vompare 2 arrays directly)
        let nodeStringified = JSON.stringify(node.data)
        let visitedMovesStringified = JSON.stringify(visitedMoves)
        let indexOfNode = visitedMovesStringified.indexOf(nodeStringified)

        let possibleMoves = [[x+2, y+1], [x+2, y-1], [x+1, y+2], [x+1, y-2], [x-2, y-1], [x-2, y+1], [x-1, y-2], [x-1, y+2]]

        possibleMoves.forEach(move => {
        if (((move[0] >= 0 && move[0] < 8) && (move[1] >= 0 && move[1] < 8)) && indexOfNode === -1) {
            node.adjMoves.push({data: [move[0], move[1]], adjMoves: [], prevMove: node})
            }
        })
    }

    function knightMoves(startPosition, endPosition) {
        if (startPosition[0] < 0 || startPosition[0] > 7 || startPosition[1] < 0 || startPosition[1] > 7) {
            console.log('the starting position is out of board')
            return
        } else if (endPosition[0] < 0 || endPosition[0] > 7 || endPosition[1] < 0 || endPosition[1] > 7) {
            console.log('the target position is out of board')
            return
        }

        let root = {
            data: startPosition,
            adjMoves: []
        }
        let queue = []
        let visitedMoves = []
        queue.push(root)
        showPossibleMoves(root, visitedMoves)
        let currNode = queue[0]
        
        for (let i = 0; i < Infinity; i++) {
            if (currNode.data[0] === endPosition[0] && currNode.data[1] === endPosition[1]) {
                let targetNode = currNode
                let moveCount = 0
                let moveArray = []
                while (targetNode !== root) {
                    moveArray.push(targetNode)
                    targetNode = targetNode.prevMove
                    moveCount++
                }
                moveArray.reverse()
                console.log(`congrats, you made it in ${moveCount} moves`)
                console.log(JSON.stringify(startPosition))
                moveArray.forEach(move => {
                    console.log(JSON.stringify(move.data))
                })
                return
            } 

            currNode = queue[0]
            queue.shift()
            
            // Stingifying arrays for comparision
            let currNodeStringified = JSON.stringify(currNode.data)
            let visitedMovesStringified = JSON.stringify(visitedMoves)
            let indexOfNode = visitedMovesStringified.indexOf(currNodeStringified)

            // reducing the number of moves evaluated
            if (indexOfNode === -1){
            visitedMoves.push(currNode.data)
            currNode.adjMoves.forEach(move => {
                showPossibleMoves(move, visitedMoves)
                queue.push(move)
               })
            }
         }
        }
    
    return {
        knightMoves,
        showPossibleMoves
    }
}

export {boardFactory}