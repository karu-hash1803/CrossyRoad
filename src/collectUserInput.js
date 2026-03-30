import { queueMove } from "./components/Player";

document.querySelector('#forward')?.addEventListener('click',()=>{
       queueMove('forward');
});
document.querySelector('#backward')?.addEventListener('click',()=>{
    queueMove('backward');
});
document.querySelector('#left')?.addEventListener('click',()=>{
    queueMove('left');
});
document.querySelector('#right')?.addEventListener('click',()=>{
    queueMove('right');
});

window.addEventListener('keydown',(event)=>{
    event.preventDefault();
    if(event.key==='ArrowUp'){
        queueMove('forward');
    }
    else if(event.key==='ArrowDown'){
        queueMove('backward');
    }
    else if(event.key==='ArrowLeft'){
        queueMove('left');
    }
    else if(event.key==='ArrowRight'){
        queueMove('right');
    }
})