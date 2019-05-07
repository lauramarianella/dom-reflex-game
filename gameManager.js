// Question 12
// Make a two player game similar to kirby samurai (https://youtu.be/3BeYJQrtT04). 
// This is how kirby samurai is played: two players wait for a signal to start after a random delay. 
// Once the start signal, first person to press their key wins. If a player presses before the signal appears, they lose. 
// Player one presses the q key and player 2 presses the p key. (hint: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)

// Question 13
// The game's too short! Make it so that players must win 3 rounds to win the game.

// Question 14
// Add sounds example: let x = new Audio('/static/something.mp3'); x.play()

// Question 15
// Add some cool images
//https://www.bensound.com

let settings ={
    minDelayTimeToStart         : 1000,
    maxDelayTimeToStart         : 2500,
    maxWaitingTimeToCheckWhoWin : 500,
    maxNumTries                 : 3,

    imgPositionFromBottom       : '50px',
    imgPositionFromSide         : '100px',
    imgPositionMiddleFromLeft   : (window.innerWidth/2 - 50) + 'px',//(window.innerWidth/2 - imgPrize.width/4) + 'px';
}

let playerLeft;
let playerRight;

function Player(name){
    this.name    = name;
    this.level   = 1;
    this.score   = 0;
    this.round   = 0;
    this.hitDate;

    this.scoreUp = function(){
        this.score= this.score + 1;
    }
}

playerLeft      = new Player('Captain Marvel'); 
playerRight     = new Player('Thanos');

let hitAudio    = new Audio('audios/bell.mp3'); 
let lostAudio   = new Audio('audios/trombone.mp3'); 

let bgAudio      = new Audio('sounds/bg.mp3'); 
let loseAudio    = new Audio('sounds/lose.mp3');
let winAudio     = new Audio('sounds/win.mp3'); 
let prizeAudio   = new Audio('sounds/prize.mp3');
let signalAudio  = new Audio('sounds/signal.mp3');

let menu   = document.querySelector('.menu');
let status = document.querySelector('.status');
let arena  = document.querySelector('.arena');
let imgSignal = document.createElement('img');

function run(){
    let buttonStart = document.createElement('button');
    buttonStart.innerText = 'Start game';
    buttonStart.addEventListener('click', start);
    menu.appendChild(buttonStart);

    let buttonReset = document.createElement('button');
    buttonReset.innerText = 'Reset game';
    buttonReset.addEventListener('click', reset);
    //menu.appendChild(buttonReset);

    let imgPlayerLeft = document.createElement('img');
    imgPlayerLeft.id = 'idPlayerLeft';
    imgPlayerLeft.src = 'imgs/p1.gif';
    imgPlayerLeft.style.position='absolute';
    imgPlayerLeft.style.left = settings.imgPositionFromSide;//'200px';
    imgPlayerLeft.style.bottom = settings.imgPositionFromBottom;
    imgPlayerLeft.style.height = '100px';
    imgPlayerLeft.style.width = '100px';
    //imgPlayerLeft.style.transform = 'scale(0.2)';
    arena.appendChild(imgPlayerLeft);

    let imgPlayerRight = document.createElement('img');
    imgPlayerRight.id = 'idPlayerRight';
    imgPlayerRight.src = "imgs/p2.gif";
    imgPlayerRight.style.position='absolute';
    imgPlayerRight.style.right = settings.imgPositionFromSide;//'200px';
    imgPlayerRight.style.bottom = settings.imgPositionFromBottom;
    imgPlayerRight.style.height = '150px';
    imgPlayerRight.style.width = '90px';
    //imgPlayerRight.style.transform = 'scale(0.5)';
    arena.appendChild(imgPlayerRight);

    
    imgSignal.id = 'idSignal';
    imgSignal.src = 'imgs/signal.png';
    imgSignal.style.position='absolute';
    imgSignal.style.right = '50px';//'200px';
    imgSignal.style.top = '50px';//positionTop;
    imgSignal.style.height = '150px';
    imgSignal.style.width = '90px';
    imgSignal.style.transform = "rotate(-140deg) scale(0.5)";    
    arena.appendChild(imgSignal);
    imgSignal.style.display = 'none';

    let imgPrize = document.createElement('img');
    imgPrize.id = 'idPrize';
    imgPrize.src = 'imgs/prize.gif';
    imgPrize.style.position='absolute';
    imgPrize.style.left = settings.imgPositionMiddleFromLeft;
    imgPrize.style.bottom = settings.imgPositionFromBottom;
    imgPrize.style.height = '70px';
    imgPrize.style.width = '70px';
    //imgPrize.style.transform = "scale(0.3)"; 
    arena.appendChild(imgPrize);
    
    setEventListener();      
}
run();


let startDate;
function start(){
    bgAudio.play();

    startDate = new Date().getTime();
    playerRight.hitDate = startDate;
    playerLeft.hitDate  = startDate;

    let signalStart     = getRandom(settings.minDelayTimeToStart,settings.maxDelayTimeToStart);

    let idTimeOutStart  = setTimeout(showSignal,signalStart);
    
    status.innerText = '';

    // hitAudio.pause();
    // lostAudio.pause();
    imgSignal.style.display = 'none';
    setImagesOriginalPosition('idPlayerLeft','idPlayerRight');
}

function reset(){
    playerLeft = new Player('Captain Marvel');
    playerRight = new Player('Thanos');

    let resetDate  = new Date();
    playerRight.hitDate = resetDate;
    playerLeft.hitDate  = resetDate;

    
    let signalStart     = getRandom(settings.minDelayTimeToStart,settings.maxDelayTimeToStart);

    let idTimeOutStart  = setTimeout(showSignal,signalStart);
    
    //arena.innerText = '';
    status.innerText = ''
}

let signalTime;
function showSignal(){
    bgAudio.pause();
    signalAudio.play();
    //alert('Begin');
    signalTime  = new Date().getTime();//alert('signalTime ' + signalTime);
    status.innerText = 'start...';
    imgSignal.style.display = 'block';
    let idTimeOutWhoPressFirst = setTimeout(checkWhoPressFirst,settings.maxWaitingTimeToCheckWhoWin);
}



function getRandom(min, max){
    return Math.floor(Math.random() * max) + min -1;
}

function setEventListener(){
    window.addEventListener("keydown", function(event) {
                                                            switch((event.key).toLocaleLowerCase()){
                                                                case 'q':                                                              
                                                                    playerLeft.hitDate = new Date().getTime();
                                                                    console.log(`PlayerLeft:Q: ${playerLeft.hitDate}`);
                                                                    hitAudio.play();
                                                                    break;
                                                                case 'p':
                                                                    playerRight.hitDate = new Date().getTime();
                                                                    console.log(`PlayerRight:P: ${playerRight.hitDate}`);
                                                                    hitAudio.play();
                                                                    break;                                                                
                                                                default:
                                                                    break;
                                                            }
                                                        } 
                            , true);
}

function checkWhoPressFirst(){
    bgAudio.play();
    signalAudio.pause();    

    // console.log(`StartlDate: ${startDate}`);
    // console.log(`........Right.hitDate: ${playerRight.hitDate}`);
    // console.log(`.........Left.hitDate: ${playerLeft.hitDate}`);
    // console.log(`SignalTime: ${signalTime}`);

    if(playerRight.hitDate === startDate && playerLeft.hitDate === startDate) {//no one pressed any key
        status.innerText = '...Nobody hit!!...';
        lostAudio.play();
        return;
    }
    if(playerRight.hitDate > startDate && playerRight.hitDate < signalTime){//he didn't press any key
        status.innerText = `...Player ${playerRight.name} hit before signal...`;
        return;
    }
    if(playerLeft.hitDate > startDate && playerLeft.hitDate < signalTime){//he didn't press any key
        status.innerText = `...Player ${playerLeft.name} hit before signal...`;
        return;
    }

    if(playerRight.hitDate > signalTime && playerLeft.hitDate > signalTime){//both pressed after signal
        if( playerRight.hitDate === playerLeft.hitDate ) {
            playerRight.scoreUp();
            playerLeft.scoreUp();
            status.innerText = 'Tie!!';
            myMoveMiddle('idPlayerLeft','idPlayerRight');
        }
        if(playerRight.hitDate < playerLeft.hitDate){
            playerRight.scoreUp();
            status.innerText = `Player ${playerRight.name} hit first!`;
            myMoveUpLeft('idPlayerRight');
            rotateImage('idPlayerLeft',90);
        }else{//if(playerLeft.hitDate < playerRight.hitDate){
            playerLeft.scoreUp();
            status.innerText = `Player ${playerLeft.name} hit first!`;
            myMoveUpRight('idPlayerLeft');
            rotateImage('idPlayerRight',-90);
        }
    }else if(playerRight.hitDate > signalTime){//left didn't press anything
        playerRight.scoreUp();
        status.innerText = `Player ${playerRight.name} hit first!`;
        myMoveUpLeft('idPlayerRight');
        rotateImage('idPlayerLeft',90);
    }else if(playerLeft.hitDate > signalTime){
        playerLeft.scoreUp();
        status.innerText = `Player ${playerLeft.name} hit first!`;
        myMoveUpRight('idPlayerLeft');
        rotateImage('idPlayerRight',-90);
    }

    checkNroTries();
} 

function checkNroTries(){
    if(playerRight.score >= settings.maxNumTries) {
        status.innerText = `***Game Over:: ${playerRight.name} won!!***`;
        return;
    }

    if(playerLeft.score >= settings.maxNumTries) {
        status.innerText = `***Game Over:: ${playerLeft.name} won!!***`;
        return;
    }    
}

function myMoveUpLeft(idImage) {
    let img = document.getElementById(idImage);   
    
    let topFin  = Math.floor(window.innerHeight/2)-200;
    let leftFin = Math.floor(window.innerWidth/2);

    img.style.top  = topFin + 'px'; 
    img.style.left = leftFin + 'px';
  }

  function myMoveUpRight(idImage) {
    let img = document.getElementById(idImage);   
    
    let topFin  = Math.floor(window.innerHeight/2)-200;
    let rightFin = Math.floor(window.innerWidth/2);

    img.style.top  = topFin + 'px'; 
    img.style.right = rightFin + 'px';
  }

  function myMoveUpLeft(idImage) {
    let img = document.getElementById(idImage);   
    
    let topFin  = Math.floor(window.innerHeight/2)-200;
    let leftFin = Math.floor(window.innerWidth/2);

    img.style.top  = topFin + 'px'; 
    img.style.left = leftFin + 'px';
  }

  function myMoveToCenter(idImage) {
    let img = document.getElementById(idImage);   
    
    let topFin  = Math.floor(window.innerHeight/2)-200;
    let rightFin = Math.floor(window.innerWidth/2);

    img.style.top  = topFin + 'px'; 
    img.style.left = rightFin + 'px';
  }

  function rotateImage(idImage,deg) {
    var img = document.getElementById(idImage);
    img.style.transform = 'rotate(' + deg + 'deg)';
  }

  function myMoveMiddle(idImageLeft,idImageRight) {
    let imgLeft = document.getElementById(idImageLeft);   
    let imgRight = document.getElementById(idImageRight); 

    let topFin  = Math.floor(window.innerHeight/2)-200;
    let middleFin = Math.floor(window.innerWidth/2);

    imgLeft.style.top  = topFin + 'px'; 
    imgLeft.style.left = Math.abs(middleFin - 100) + 'px';

    imgRight.style.top  = topFin + 'px'; 
    imgRight.style.left = Math.abs(middleFin + 100) + 'px';
  }


  function setImagesOriginalPosition(idImageLeft,idImageRight) {
    let imgLeft = document.getElementById(idImageLeft);   
    let imgRight = document.getElementById(idImageRight); 

    imgLeft.style.top  = settings.imgPositionFromTop; 
    imgLeft.style.left = settings.imgPositionFromSide;
    imgLeft.style.height = '100px';
    imgLeft.style.width = '100px';
    rotateImage('idPlayerLeft',0);
    //imgLeft.style.transform = 'scale(0.2) rotate(0)';

    imgRight.style.top  = settings.imgPositionFromTop;  
    imgRight.style.right = settings.imgPositionFromSide;
    imgRight.style.height = '150px';
    imgRight.style.width = '90px';
    rotateImage('idPlayerRight',0);
    //imgRight.style.transform = 'scale(0.5) rotate(0)';
  }