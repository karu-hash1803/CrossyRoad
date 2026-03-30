import * as THREE from "three";
import { Wheel } from "./Wheel";
import { tileSize } from "../constants";

export function Car(initialTileIndex,direction,color){
    const car=new THREE.Group();
    car.position.x=initialTileIndex*tileSize;
    if(!direction){
        car.rotation.z=Math.PI;
    }
    const main=new THREE.Mesh(
        new THREE.BoxGeometry(60,30,15),
        new THREE.MeshLambertMaterial({
            color, // equivalent to color:color
            flatShading:true
        })
    );
    main.position.z=12;
    main.castShadow=true;
    main.receiveShadow=true;
    car.add(main);
    const cabin=new THREE.Mesh(
        new THREE.BoxGeometry(33,24,12),
        new THREE.MeshLambertMaterial({
         color:"white",
         flatShading:true
        })
    );
    cabin.position.x=-6;
    cabin.position.z=25.5;
    cabin.castShadow=true;
    cabin.receiveShadow=true;
    car.add(cabin);
    const frontWheel=Wheel(18);
    car.add(frontWheel);
    const backWheel=Wheel(-18);
    car.add(backWheel);
    return car;
}