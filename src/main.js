import * as THREE from "three";
import {Renderer} from "./components/Renderer.js";
import {Camera} from "./components/Camera.js";
import {initiliazePlayer, player,resetGameOver} from "./components/Player.js";
import "./style.css";
import {map,initializeMap} from "./components/Map.js";
import { DirectionalLight } from "./components/DirectionalLight.js";
import { animateVehicles } from "./animateVehicles.js";
import "./collectUserInput.js";
import { animatePlayer } from "./animatePlayer.js";
import { hitTest } from "./hittest.js";

const scene=new THREE.Scene();
scene.add(player);
scene.add(map);
const AmbientLight=new THREE.AmbientLight();
scene.add(AmbientLight);
const dirLight=DirectionalLight();
dirLight.target=player;// by default the target of the dirLight is at the origin.so, it should move while the player is moving 
player.add(dirLight);
const camera=Camera();
player.add(camera);
const score=document.querySelector('#score');
const finalScore=document.querySelector('#finalScore');
const resultDom=document.querySelector('#result-container');


initializeGame();// make sure to call the initialization before the animation or rendering happens

document.querySelector('#retry')?.addEventListener('click',initializeGame);
function initializeGame(){
  initiliazePlayer();
  initializeMap();
   resetGameOver();
  if(finalScore)finalScore.innerText='0';
  if(resultDom)resultDom.style.visibility='hidden';
  score.innerText='0'.toString();
}

const renderer=Renderer();
renderer.setAnimationLoop(animate);

window.addEventListener('resize',()=>{
renderer.setSize(window.innerWidth,window.innerHeight);
camera.updateProjectionMatrix();
});
function animate(){
  animateVehicles();
  animatePlayer();
  hitTest();
  renderer.render(scene,camera);

}
