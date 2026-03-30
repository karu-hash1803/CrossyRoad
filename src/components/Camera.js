import * as THREE from "three"

export function Camera(){
    const size=300;
    const viewRatio=window.innerWidth/window.innerHeight;
    const width=viewRatio<1?size:size*viewRatio;
    const height=viewRatio<1?size/viewRatio:size;
    const camera=new THREE.OrthographicCamera(
        width/-2,
        width/2,
        height/2,
        height/-2,
        100,//objects closer than 100 scene units can't be rendered
        900 // objects farther than 900 scene units can't be rendered
    );
    camera.up.set(0,0,1);// by default up means y axis in three.js.So we have changed that to z axis
    camera.position.set(300,-300,300);
    camera.lookAt(0,0,0);
    
    return camera
}
