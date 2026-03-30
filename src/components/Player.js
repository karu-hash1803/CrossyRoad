import * as THREE from "three";
import { endsUpInValidPosition } from "../utilities/endsUpInValidPosition";
import { addRows, metadata as rows,} from "./Map";
 let count=0;
 export let GameOver=false;
export const player=Player();
function Player(){
   
    const player=new THREE.Group();
    const body=new THREE.Mesh(
        new THREE.BoxGeometry(15,15,20),
        new THREE.MeshLambertMaterial({
         color:"white",
         flatShading:true
         }
        )
    )
    body.position.z=10;// since the center of the body is always at the (0,0,0)
    body.castShadow=true;
    body.receiveShadow=true;
    player.add(body);

    
    const cap=new THREE.Mesh(
        new THREE.BoxGeometry(2,4,2),
        new THREE.MeshLambertMaterial({
            color: 0xf0619a,
            flatShading:true
        })
    );
    cap.position.z=21;
    cap.castShadow=true;
    cap.receiveShadow=true;
    player.add(cap);
    
    const playerContainer=new THREE.Group();
    playerContainer.add(player);
    return playerContainer;

}

export const position={
    currentRow:0,
    currentTile:0
};

export const movesQueue=[];

export function initiliazePlayer(){
    player.position.x=0;
    player.position.y=0;
    player.children[0].position.z=0;
    count=0;
    position.currentRow=0;
    position.currentTile=0;

    movesQueue.length=0;
}

export function queueMove(direction) {
 
  const isValidMove = endsUpInValidPosition(
    {
      currentRow: position.currentRow,  
      currentTile: position.currentTile 
    },
    [...movesQueue, direction]
  );

 

  if (!isValidMove) 
    return;
if(GameOver){
    console.log('game is over');
    return;
}
  movesQueue.push(direction);

}


export function stepCompleted(){
    const direction=movesQueue.shift();
    let scorecard=document.querySelector('#score');
    if(GameOver){
        return;
    }
    if(direction==='forward'){
        count++;
        position.currentRow=position.currentRow+1;
    }
    if(direction==='backward'){
        position.currentRow=position.currentRow-1;
    }
    if(direction==='left'){
        position.currentTile=position.currentTile-1;
    }
    if(direction==='right'){
        position.currentTile=position.currentTile+1;
    }

    if(position.currentRow>=rows.length-10){
   addRows();
    }

    scorecard.innerText=count.toString();
}

export function setGameOver(){
    GameOver=true;
}
export function resetGameOver(){
    GameOver=false;
}