import * as THREE from "three";

export function Renderer(){ // now we can export this function to the other files
    const canvas=document.querySelector('canvas.game');
    if(!canvas){
    throw Error("Canvas not found");
    }
    const renderer=new THREE.WebGLRenderer({
        alpha:true,// alpha is true means it allows transparent background and if false means it always black screen(opaque)
        antialias:true,
        canvas:canvas // it means here canvas variable is referring to the canvas DOM element that we have created
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMap.enabled=true;

    return renderer;
}