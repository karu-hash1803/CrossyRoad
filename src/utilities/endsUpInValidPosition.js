// import { minTileIndex,maxTileIndex } from "../constants";
// import { metadata as rows } from "../components/Map";
// import { calculateFinalPosition } from "./calculateFinalPosition";

// export function endsUpInValidPosition(currentPosition,moves){
//     const finalPosition=calculateFinalPosition(currentPosition,moves);
//     if(finalPosition.currentRow===-1||finalPosition.currentTile===minTileIndex-1||finalPosition.currentTile===maxTileIndex+1){
//         return false;
//     }
    
//     const finalRow=rows[finalPosition.currentRow-1];
//     if(finalRow&&finalRow.type==='forest'&&finalRow.trees.some((tree)=>{
//         return tree.currentTile===finalPosition.currentTile;
//     })){
//         return false;
//     }
//     return true;
// }

import { calculateFinalPosition } from "./calculateFinalPosition";
import { minTileIndex, maxTileIndex } from "../constants";
import { metadata as rows } from "../components/Map";

export function endsUpInValidPosition(currentPosition, moves) {
  const finalPosition = calculateFinalPosition(currentPosition, moves);

  // check boundaries
  if (
    finalPosition.currentRow === -1 ||
    finalPosition.currentTile === minTileIndex - 1 ||
    finalPosition.currentTile === maxTileIndex + 1
  ) return false;

  // check trees
  const finalRow = rows[finalPosition.currentRow - 1];
  if (
    finalRow &&
    finalRow.type === "forest" &&
    finalRow.trees.some((tree) => tree.tileIndex === finalPosition.currentTile)
  ) return false;

  return true;
}