import * as THREE from "three";
import { minTileIndex,maxTileIndex, tileSize } from "./constants";
import { metadata as rows } from "./components/Map";

const timer=new THREE.Timer();
 
export function animateVehicles(){
    timer.update();
    const delta=timer.getDelta();
    rows.forEach((rowData)=>{
        if(rowData.type=='car'|| rowData.type=='truck'){
             const beginingofRow=(minTileIndex-2)*tileSize;
        const endofRow=(maxTileIndex+2)*tileSize;
        rowData.vehicles.forEach(({ref})=>{
            if(!ref){
             throw Error("Vehicle reference is missing");
            }
            if(rowData.direction){
                // rowData.direction is true means vehicle is moving to the right
                ref.position.x=ref.position.x>endofRow?beginingofRow:ref.position.x+rowData.speed*delta;
            }
            else{ // going to the left direction
                ref.position.x=ref.position.x<beginingofRow?endofRow:ref.position.x-rowData.speed*delta;
            }
        })
        }
    })
}