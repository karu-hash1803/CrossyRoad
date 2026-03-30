import * as THREE from "three";
import { minTileIndex,maxTileIndex } from "../constants";
import { max } from "three/src/nodes/math/MathNode.js";

export function generateRows(amount){
    const rows=[];
    for(let i=0;i<amount;i++){
        const rowData=generateRow();
        rows.push(rowData);
    }
    return rows;
}
function generateRow(){
   const type=randomElement(['forest','car','truck']);

   if(type=='car'){
    return generateCarLaneMetadata()
   }
   else if(type=='truck'){
    return generateTruckLaneMetadata();
   }
   return generateForestMetadata();
}

function randomElement(arr){
   return arr[Math.floor(Math.random()*arr.length)];
}

function generateForestMetadata(){
    const occupiedTiles=new Set();
    const trees=Array.from({length:4},()=>{
        let tileIndex;
        do{
            tileIndex=THREE.MathUtils.randInt(minTileIndex,maxTileIndex);
        }while(occupiedTiles.has(tileIndex))
     const height=randomElement([20,45,60]);
     return {tileIndex,height};
    });

    return {type:'forest',
        trees
    };
}

function generateCarLaneMetadata(){
 const direction=randomElement([true,false]);
 const speed=randomElement([125,156,188]);
 const occupiedTiles=new Set();
 const vehicles=Array.from({length:3},()=>{
    let initialIndex;
    do{
        initialIndex=THREE.MathUtils.randInt(minTileIndex,maxTileIndex);
    }while(occupiedTiles.has(initialIndex))

occupiedTiles.add(initialIndex-1);
occupiedTiles.add(initialIndex);
occupiedTiles.add(initialIndex+1);

const color=randomElement([0xa52523, 0xbdb638, 0x78b14b]);


return {initialIndex,color};
 });
 return {type:'car',speed,direction,vehicles};
}

function generateTruckLaneMetadata(){
    const speed=randomElement([125,156,188]);
    const direction=randomElement([true,false]);
    const occupiedTiles=new Set();
   const vehicles=Array.from({length:2},()=>{
    let initialTileIndex;
    do{
        initialTileIndex=THREE.MathUtils.randInt(minTileIndex,maxTileIndex);
    }while(occupiedTiles.has(initialTileIndex))
        occupiedTiles.add(initialTileIndex-2);
        occupiedTiles.add(initialTileIndex-1);
        occupiedTiles.add(initialTileIndex);
        occupiedTiles.add(initialTileIndex+1);
        occupiedTiles.add(initialTileIndex+2);
  const color=randomElement([0xa52523, 0xbdb638, 0x78b14b]);
  return {initialTileIndex,color};
   });
   return {type:'truck',speed,direction,vehicles};
}