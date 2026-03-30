// export function calculateFinalPosition(currentPosition,moves){
//     return moves.reduce((position,direction)=>{
//        if(direction==='forward'){
//         return {
//         currentRow:position.currentRow+1,
//             currentTile:position.currentTile
//         }
//        }
//        if(direction==='backward'){
//         return{
//            currentRow:position.currentRow-1,
//            currentTile:position.currentTile
//         }
//        }
//        if(direction==='left'){
//         return {
//            currentRow:position.currentRow,
//            currentTile:position.currentTile-1
//         }
//        }
//        if(direction==='right'){
//         return{
//             currentRow:position.currentRow,
//             currentTile:position.currentTile+1
//         }
//        }
//     },currentPosition);
// }


export function calculateFinalPosition(currentPosition, moves) {
  return moves.reduce((position, direction) => {
    if (direction === "forward")
      return { currentRow: position.currentRow + 1, currentTile: position.currentTile };
    if (direction === "backward")
      return { currentRow: position.currentRow - 1, currentTile: position.currentTile };
    if (direction === "left")
      return { currentRow: position.currentRow, currentTile: position.currentTile - 1 };
    if (direction === "right")
      return { currentRow: position.currentRow, currentTile: position.currentTile + 1 };
    return position;
  }, currentPosition);
}