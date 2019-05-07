const container = document.getElementById('container');
const menu = document.getElementById('menu');
const instructions = document.getElementById('instructions');
const game = document.getElementById('game');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const p1Score = document.getElementById('p1-score');
const p2Score = document.getElementById('p2-score');
const signal = document.getElementById('signal');
const prize = document.getElementById('prize');
const results = document.getElementById('results');
const ANIMATION_TIME = 1000;
const players = { p1, p2 };
const scores = { p1: p1Score, p2: p2Score };
const sounds = {
  signal: new Audio('../sounds/signal.mp3'),
  prize: new Audio('../sounds/prize.mp3'),
  lose: new Audio('../sounds/lose.mp3'),
  bg: new Audio('../sounds/bg.mp3'),
  win: new Audio('../sounds/win.mp3'),
};

let wins = [];
let won = false;
let ready = false;

function playSound(sound) {
  sounds.bg.pause();
  sounds.win.pause();
  sounds[sound].currentTime = 0;
  sounds[sound].play();
}

function createScoreImg() {
  const prizeImg = document.createElement('img');
  prizeImg.src = '../imgs/prize.gif';
  prizeImg.classList.add('game-img');
  return prizeImg;
}

function addWin(player) {
  players[player].src = `../imgs/${player}win.gif`;
  wins.push(player);
  scores[player].appendChild(createScoreImg());
  signal.innerHTML = ''; // remove the signal
  hide(prize);
}

function winRound(player) {
  if (wins.filter((win) => win === player).length < 3) {
    players[player].src = `../imgs/${player}.gif`;
    startCountdown();
  } else {
    players[player].src = `../imgs/${player}win.gif`;
    results.querySelector('h1').textContent = `${player} WINS!`;
    playSound('win');
    show(results);
  }
}

function doAfterAnimation(fn) {
  setTimeout(fn, ANIMATION_TIME);
}

function handlePlayerInput(player) {
  const opponent = player === 'p1' ? 'p2' : 'p1';
  document.removeEventListener('keydown', keyboardListener);
  if (!ready) {
    clearTimeout(signalTimeout); // don't add signal or prize since round is over when you lose
    playSound('lose');
    addWin(opponent);
    doAfterAnimation(() => winRound(opponent)); // wait until end of win animation to finish round
  } else if (!won) {
    won = true;
    players[player].src = `../imgs/${player}run.gif`;
    players[player].classList.add(`${player}-move`);
    doAfterAnimation(() => {
      playSound('prize'); // Wait until end of run animation to get prize
      addWin(player);
      doAfterAnimation(() => {
        players[player].classList.remove(`${player}-move`); // reset player position to initial
        winRound(player); // wait until end of win animation to finish round
      });
    });
  }
}

function keyboardListener(ev) {
  if (ev.key === 'q') {
    handlePlayerInput('p1');
  }
  if (ev.key === 'p') {
    handlePlayerInput('p2');
  }
}

function restart() {
  wins = [];
  p1Score.innerHTML = '';
  p2Score.innerHTML = '';
  p1.src = '../imgs/p1.gif';
  p2.src = '../imgs/p2.gif';
  hide(results);

  startCountdown();
}

function start() {
  wins = [];
  hide(menu);
  show(game);
  container.style['align-items'] = 'flex-end';

  startCountdown();
}

function createSignal() {
  const signalWrapper = document.createElement('div');
  signalWrapper.style.position = 'absolute';
  signalWrapper.style.top = Math.random() * (innerHeight - 100) + 'px';
  signalWrapper.style.left = Math.random() * (innerWidth - 100) + 'px';
  signalWrapper.style.transform = `rotate(${Math.random() * 360}deg)`;
  const signalImg = document.createElement('img');
  signalImg.classList.add('signal');
  signalImg.src = '../imgs/signal.png';
  signalWrapper.appendChild(signalImg);
  return signalWrapper;
}

let signalTimeout;
function startCountdown() {
  playSound('bg');
  won = false;
  ready = false;
  document.addEventListener('keydown', keyboardListener);
  signalTimeout = setTimeout(() => {
    playSound('signal');
    signal.appendChild(createSignal());
    prize.style.display = 'inline-block';
    ready = true;
  }, Math.random() * 4000 + 2000);
}

function showInstructions() {
  hide(menu);
  show(instructions);
}

function closeInstructions() {
  show(menu);
  hide(instructions);
}

function hide(element) {
  element.style.display = 'none';
}

function show(element) {
  element.style.display = 'block';
}
