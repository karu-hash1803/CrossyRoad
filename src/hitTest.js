import * as THREE from "three";
import { metadata as row } from "./components/Map";
import {position,player,setGameOver} from "./components/Player";

let resultcontainer=document.querySelector('#result-container');
let finalScore=document.querySelector('#finalScore')
export function hitTest(){
 const currentrow=row[position.currentRow-1];//since the row in meta data starts from 1 (because 0 index row doesn't contain anything other than grass)

 if(!currentrow){
    return ;
 }

 if(currentrow.type=='car'||currentrow.type=='truck'){
     const playerBoundingBox=new THREE.Box3();
     playerBoundingBox.setFromObject(player);
     currentrow.vehicles.forEach(({ref})=>{
        if(!ref){
            throw Error("Vehicle reference is missing");
        }
        const vehicleBoundingBox=new THREE.Box3();
        vehicleBoundingBox.setFromObject(ref);

        if(playerBoundingBox.intersectsBox(vehicleBoundingBox)){
            if(!resultcontainer||!finalScore){
                return ;
            }
            setGameOver();
            finalScore.innerText=position.currentRow.toString();
            console.log(finalScore.innerText);
          resultcontainer.style.visibility="visible";
        }
     });
 }
}