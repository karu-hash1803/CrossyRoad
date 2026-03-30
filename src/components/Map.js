import * as THREE from "three";
import {Grass} from "./Grass";
import { Tree } from "./Tree";
import { Car } from "./Car";
import { Road } from "./Road";
import { Truck } from "./Truck";
import { generateRows } from "../utilities/generateRows";


export const metadata=[];

//this is only for the learning purpose,actually we will implement the type of rows at the runtime
// export const metadata=[
 
//         {
//         type:'car',
//         speed:1,
//         direction:false,
//         vehicles:[{intialTileIndex:2,color:0xff0000}]
//     },
//        {
//         type:"forest",
//         trees:[
//             {tileIndex: -3, height:50},
//             {tileIndex:2 , height:30},
//             {tileIndex:5 , height:50}
//         ]},
//     {
//         type:'truck',
//         speed:0,
//         direction:true,
//         vehicles:[{initialTileIndex:-4,color: 0x00ff00}]
//     },
//     {
//         type:'forest',
//         trees:[
//             {tileIndex:-8,height:30},
//             {tileIndex:-3,height:50},
//             {tileIndex:2,height:30}
//         ]
//     }
// ];




export const map=new THREE.Group();

export function initializeMap(){
    metadata.length=0;//we should not write metadata=[] because this creates a new array and all the other files are still pointing to the old array
    map.remove(...map.children);
    for(let i=0;i>-5;i--){
        const grass=Grass(i);
        map.add(grass);

    }
    addRows();
}

export function addRows(){
   const newMetaData=generateRows(20);
   const startIndex=metadata.length;
   metadata.push(...newMetaData);


    newMetaData.forEach((rowData,index)=>{
        const rowIndex=startIndex+index+1;
        if(rowData.type=='forest'){
            const row=Grass(rowIndex);
            rowData.trees.forEach(({tileIndex,height})=>{
                const three=Tree(tileIndex,height);
                row.add(three);
            });
           map.add(row);
        }

        if(rowData.type=="car"){
            const row=Road(rowIndex);
            rowData.vehicles.forEach((vehicle)=>{
                const car=Car(
                    vehicle.intialTileIndex,
                    rowData.direction,
                    vehicle.color
                );
                vehicle.ref=car;
                row.add(car);
            });
            map.add(row);
        }
        if(rowData.type=='truck'){
            const row=Road(rowIndex);
            rowData.vehicles.forEach((vehicle)=>{
                const truck=Truck(vehicle.initialTileIndex,rowData.direction,vehicle.color);
                vehicle.ref=truck;
                row.add(truck);
            })
            map.add(row);
        }
    });
}