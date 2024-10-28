// add sound 

let jumpSound = new Audio('recource/sound1 (2).wav');
let runSound = new Audio('recource/sound1 (2).mp3');
let winSound = new Audio('recource/sound1 (1).wav');
let deadSound = new Audio('recource/sound1 (1).mp3');

let boy = document.getElementById('boy');

//Animation to breath 

let idleImageNumber = 2;
let idleAnimationNumber = 0;
function idleAnimation(){

    idleImageNumber = idleImageNumber + 1;
    if(idleImageNumber == 9){
        idleImageNumber = 2;
    }
    boy.src ="recource/Idle ("+ idleImageNumber +").png";
}
function idleAnimationStart(){
    idleAnimationNumber = setInterval(idleAnimation,200);
}

//Animation to Run

let runImageNumber = 1;
let runAnimationNumber = 0;

function runAnimation(){
    runImageNumber = runImageNumber + 1;
    if(runImageNumber == 9){
        runImageNumber = 1;
    }
    else if(runImageNumber !=9){
        runSound.play();
    }
    boy.src ="recource/Run ("+ runImageNumber +").png";
    
}

function runAnimationStart(){
    runAnimationNumber = setInterval(runAnimation,100);
    clearInterval(idleAnimationNumber);
}
//Animation to Jump

jumpImageNumber = 1;
jumpAnimationNumber = 0;
boyMarginTop =347;


function jumpAnimation(){
    jumpImageNumber = jumpImageNumber + 1;

    if (jumpImageNumber <= 7){
        boyMarginTop = boyMarginTop - 35;
        boy.style.marginTop = boyMarginTop + "px"; 
    }
    if (jumpImageNumber >= 8){
        boyMarginTop = boyMarginTop + 35;
        boy.style.marginTop = boyMarginTop + "px"; 
    }
    if(jumpImageNumber == 13){
        jumpImageNumber = 1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = 0;
        runImageNumber = 0;
        runAnimationStart();
    }
    boy.src ="recource/Jump ("+ jumpImageNumber +").png";
    jumpSound.play();
    
}

function jumpAnimationStart(){
    clearInterval(idleAnimationNumber);
    runImageNumber = 0;
    clearInterval(runAnimationNumber);
    jumpAnimationNumber = setInterval (jumpAnimation,100);
}
//key check

function keycheck(event){
    //window.alert(event.which);
    // enter = 13;
    // space = 32;
    // number 1 = 49;
    var keyCode = event.which;

    if(keyCode == 13){
        if(runAnimationNumber == 0){
            runAnimationStart();
        }
        if(movebackgroundAnimationId == 0){
            movebackgroundAnimationId = setInterval(movebackground,100);
        }
        if(boxAnimationId == 0){
            boxAnimationId = setInterval(boxAnimation,100);
        }
        
    }
    else if (keyCode == 32){
        if(jumpAnimationNumber == 0){
            jumpAnimationStart();
        }
        if(movebackgroundAnimationId == 0){
            movebackgroundAnimationId = setInterval(movebackground,100);
        }
        if(boxAnimationId == 0){
            boxAnimationId = setInterval(boxAnimation,100);
        }
    }
    else if(keyCode == 49){
        idleAnimationNumber = 0;
        if(idleAnimationNumber == 0){
            clearInterval(boxAnimationId);
            boxAnimationId = 0;
            clearInterval(runAnimationNumber);
            runAnimationNumber = 0;
            idleAnimationStart();
            clearInterval(movebackgroundAnimationId);
            movebackgroundAnimationId = 0;
            runSound.pause();
        }
    }
}

//Move background
var backgroundImagePositionX = 0;
var movebackgroundAnimationId = 0;
var score = 0;
let bk = document.getElementById('background');

function movebackground(){
    backgroundImagePositionX = backgroundImagePositionX - 20 ;
    bk.style.backgroundPositionX =backgroundImagePositionX + "px";
    score = score +1;
    document.getElementById('score').innerHTML = "Score :" + score;
    if(score == 1000){
        document.getElementById('win').style.visibility = 'visible';
        document.getElementById("endscore1").innerHTML = score;
        clearInterval(boxAnimationId);
        clearInterval(runAnimationNumber);
        runSound.pause();
        runAnimationNumber = -1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = -1;
        jumpSound.pause();
        clearInterval(movebackgroundAnimationId);
        movebackgroundAnimationId = -1;
        winSound.play();
        slideAnimationStart();
        
        
    }
} 

// create brake boxes
boxMarginLeft = 2000;
function createBox(){
    for( let i = 0; i<= 15;i++){

        var box = document.createElement('div');
        box.className = "box";
        document.getElementById("background").appendChild(box);
        box.style.marginLeft = boxMarginLeft + "px";
       // boxMarginLeft = boxMarginLeft + 1000;

       box.id = 'box' + i;

       if(i < 7){
        boxMarginLeft = boxMarginLeft + 2000;
       }
       else if(i >= 7){
        boxMarginLeft = boxMarginLeft + 1500;
       }
    }
}
 let boxAnimationId = 0;
 function boxAnimation(){
    for(let i = 0;i <= 15; i++){
        let box = document.getElementById("box"+i);
        let currentMarginLeft = getComputedStyle(box).marginLeft;
        let newMarginLeft =parseInt(currentMarginLeft) - 25;
        box.style.marginLeft = newMarginLeft + "px";

        if(newMarginLeft >= -70 & newMarginLeft <= 70){
            if(boyMarginTop >300){
                clearInterval(boxAnimationId);
                clearInterval(runAnimationNumber);
                runSound.pause();
                runAnimationNumber = -1;
                clearInterval(jumpAnimationNumber);
                jumpAnimationNumber = -1;
                clearInterval(movebackgroundAnimationId);
                movebackgroundAnimationId = -1;

                deadAnimationNumber = setInterval(boyDeathAnimation,100);
            }
         }
    }
 }
//boy Death Animation
deadImageNumber = 1;
deadAnimationNumber = 0;
function boyDeathAnimation(){
    deadImageNumber = deadImageNumber +1 ;

    if(deadImageNumber == 2){
        deadSound.play();
    }

    if(deadImageNumber == 9){
        
        deadImageNumber = 10;
        document.getElementById("end").style.visibility = 'visible';
        document.getElementById("endscore").innerHTML = score;
    }
    boy.src ="recource/Dead ("+ deadImageNumber +").png";
}
 //reload
 function reload(){
    location.reload();
 }




 