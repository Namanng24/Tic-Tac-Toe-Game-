let boxes=document.querySelectorAll("#box");
let resetBtn=document.querySelector("#reset");
let newgameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-cont")
let msg=document.querySelector("#msg");
let drawSound=document.querySelector("#draw-sound");
let clickSound=document.querySelector("#click-sound");
let resetSound=document.querySelector("#reset-sound");

let turnO=true;
const winPatterns=[
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]
];
const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    resetSound.currentTime=0;
    resetSound.play();
}
boxes.forEach((box)=> {
    box.addEventListener("click",()=>{
    clickSound.currentTime = 0; 
    clickSound.play();
    if (turnO){
    box.innerText="X";
    box.style.color="white";
    turnO=false;
    }
    else{
    box.innerText="O";
    turnO=true;
    }
    box.disabled=true;
    checkWinner();
})
});
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
const showWinner=(winner)=>{
    msg.innerText=`winner is ${winner} 😁`;
    msgContainer.classList.remove("hide");
    drawSound.currentTime=0;
    drawSound.play();
    disableBoxes();
}
const showDraw=()=>{
    msg.innerText= `Match is Drawn!😐`;
    msgContainer.classList.remove("hide");
    drawSound.currentTime=0;
    drawSound.play();
    disableBoxes();
}
const checkWinner=()=>{
    let winnerfound=false;
    for(pattern of winPatterns){
           let pos1val = boxes[pattern[0]].innerText;
           let pos2val = boxes[pattern[1]].innerText;
           let pos3val = boxes[pattern[2]].innerText;

           if(pos1val!="" && pos2val!="" && pos3val!=""){
            if(pos1val === pos2val && pos2val === pos3val){
                console.log(pos1val,"is winner");
                showWinner(pos1val);
                winnerfound=true;
                break;
            }
        }
    }
    if(!winnerfound){
        //check for draw
        let isDraw=true;
        boxes.forEach((box)=>{
            if(box.innerText===''){
                isDraw=false;
            }
        })
        if(isDraw)
        showDraw();
    }
}
newgameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
showDraw=()=>{
    msg.innerText = `Game is a Draw! 😐`;
    msgContainer.classList.remove("hide");
    drawSound.play();  // Play draw sound
    disableBoxes();
};
