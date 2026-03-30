// import * as THREE from "three";
// import { player,position,stepCompleted,movesQueue } from "./components/Player";

// import { tileSize } from "./constants";

// const clock=new THREE.Timer();
// let timeStarted=false;
// export function animatePlayer(){

//     if(!movesQueue.length){
//         return;
//     }
//     if(!timeStarted){
//         timeStarted=true;
//         clock.reset();
//     }
//     clock.update();

//     const stepTime=0.2;
//     const progress=Math.min(1,clock.getElapsed()/stepTime);

//  setPosition(progress);
//  setRotation(progress);

//  if(progress>=1){
//     stepCompleted();
//     timeStarted=false;
//  }
// }

//  function setPosition(progress){
//      const startX=position.currentTile*tileSize;
//     const startY=position.currentRow*tileSize;
//     let endX=startX;
//     let endY=startY;
//     if(movesQueue[0]==='forward'){
//         endY=endY+tileSize;
//     }
//     else if(movesQueue[0]==='backward'){
//         endY=endY-tileSize;
//     }
//     else if(movesQueue[0]==='left'){
//         endX=endX-tileSize;
//     }
//     else if(movesQueue[0]==='right'){
//         endX=endX+tileSize;
//     }
//     player.position.x=THREE.MathUtils.lerp(startX,endX,progress);
//     player.position.y=THREE.MathUtils.lerp(startY,endY,progress);
//     player.position.z=Math.sin(progress*Math.PI)*8;
//  }

// function setRotation(progress){
//     let endRotation=0;
//     if(movesQueue[0]==='forward'){
//         endRotation=0;
//     }
//     else if (movesQueue[0]==='backward'){
//         endRotation=Math.PI;
//     }
//     else if(movesQueue[0]==='left'){
//         endRotation=Math.PI/2;
//     }
//     else if(movesQueue[0]==='right'){
//         endRotation=((-1)*Math.PI)/2;
//     }
//     player.rotation.z=THREE.MathUtils.lerp(player.rotation.z,endRotation,progress); // first argument represents current rotation(like initially since didn't rotated the player ever it will be 0) and second argument represent target direction and progress tells up how far we are in the animation

//  }

import * as THREE from "three";
import { player, position, movesQueue, stepCompleted } from "./components/Player";
import { tileSize } from "./constants";

const timer = new THREE.Timer(); 
let stepStarted = false;
let stepStaredTime=0;

export function animatePlayer() {
  if (!movesQueue.length) {
    stepStarted = false;
    return;
  }
 timer.update();
  if (!stepStarted) {
    stepStarted = true;
    stepStaredTime=timer.getElapsed();
  }


  let elapsed=timer.getElapsed()-stepStaredTime;
  const stepTime = 0.2;
  const progress = Math.min(1, elapsed / stepTime); //getElapsed!

  setPosition(progress);
  setRotation(progress);

  if (progress >= 1) {
    stepCompleted();
    stepStarted = false; 
  }
}

function setPosition(progress) {
  const startX = position.currentTile * tileSize;
  const startY = position.currentRow * tileSize;
  let endX = startX;
  let endY = startY;

  if (movesQueue[0] === "left")     endX -= tileSize;
  if (movesQueue[0] === "right")    endX += tileSize;
  if (movesQueue[0] === "forward")  endY += tileSize;
  if (movesQueue[0] === "backward") endY -= tileSize;

  player.position.x = THREE.MathUtils.lerp(startX, endX, progress);
  player.position.y = THREE.MathUtils.lerp(startY, endY, progress);
  player.children[0].position.z = Math.sin(progress * Math.PI) * 8; // the first child is used for the turns or jumps and the second child (which contains the camera) should be used only when the player moves along x and y axes without jumps and turns
}

function setRotation(progress) {
  let endRotation = 0;
  if (movesQueue[0] === "forward")  endRotation = 0;
  if (movesQueue[0] === "left")     endRotation = Math.PI / 2;
  if (movesQueue[0] === "right")    endRotation = -Math.PI / 2;
  if (movesQueue[0] === "backward") endRotation = Math.PI;

  player.children[0].rotation.z = THREE.MathUtils.lerp(
    player.children[0].rotation.z,
    endRotation,
    progress
  );
}