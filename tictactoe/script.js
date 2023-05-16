/*----- constants -----*/
const COLORS = {
  0: "white",
  1: "blue",
  "-1": "red",
};

const maxTurns = 9;

/*----- state variables -----*/
let board; // array of 7 column arrays
let turn; // 1 or -1
let winner; // null = no winner; 1 or -1 = winner; 'T' = Tie
let turnsLeft = maxTurns;
/*----- cached elements  -----*/
const playAgainBtn = document.querySelector("button");
const messageEl = document.querySelector(".messageEl");
const markerEls = [...document.querySelectorAll("#board > div")];

/*----- event listeners -----*/
// document.getElementById("board").addEventListener("click", playerInputFn);
function initEventListeners() {
  document.getElementById("c0r2").addEventListener("click", playerInputFn);
  document.getElementById("c1r2").addEventListener("click", playerInputFn);
  document.getElementById("c2r2").addEventListener("click", playerInputFn);
  document.getElementById("c0r1").addEventListener("click", playerInputFn);
  document.getElementById("c1r1").addEventListener("click", playerInputFn);
  document.getElementById("c2r1").addEventListener("click", playerInputFn);
  document.getElementById("c0r0").addEventListener("click", playerInputFn);
  document.getElementById("c1r0").addEventListener("click", playerInputFn);
  document.getElementById("c2r0").addEventListener("click", playerInputFn);
}
playAgainBtn.addEventListener("click", init);

/*----- functions -----*/

// console.log("script.js is working");
init();

function init() {
  //* 1 for X, -1 for O
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  console.log(board);
  turn = 1;
  winner = null;
  render();
  turnsLeft = maxTurns;
  initEventListeners();
  //   function addEventListener
}
function render() {
  renderBoard();
  renderMessage();
  renderControls();
}

function renderBoard() {
  board.forEach(function (colArr, colIdx) {
    // Iterate over the cells in the cur column (colArr)
    colArr.forEach(function (cellVal, rowIdx) {
      const cellId = `c${colIdx}r${rowIdx}`;
      const cellEl = document.getElementById(cellId);
      cellEl.style.backgroundColor = COLORS[cellVal];
    });
  });
}

function renderMessage() {
  if (winner === "T") {
    messageEl.innerText = "It's a Tie!!!";
  } else if (winner) {
    messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[
      winner
    ].toUpperCase()}</span> Wins!`;
  } else {
    // Game is in play
    messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[
      turn
    ].toUpperCase()}</span>'s Turn`;
  }
}

function renderControls() {
  // Ternary expression is the go to when you want 1 of 2 values returned
  // <conditional exp> ? <truthy exp> : <falsy exp>
  playAgainBtn.style.visibility = winner ? "visible" : "hidden";
}

function playerInputFn(evt) {
  let tileCoor = evt.target.getAttribute("id");
  console.log("tileCoor", tileCoor);
  if (tileCoor === "c0r2") {
    board[0][2] = turn;
    document.getElementById("c0r2").removeEventListener("click", playerInputFn);
    // removeEventListenerFN(tileCoor);
  } else if (tileCoor === "c1r2") {
    board[1][2] = turn;
    document.getElementById("c1r2").removeEventListener("click", playerInputFn);
  } else if (tileCoor === "c2r2") {
    board[2][2] = turn;
    document.getElementById("c2r2").removeEventListener("click", playerInputFn);
  } else if (tileCoor === "c0r1") {
    board[0][1] = turn;
    document.getElementById("c0r1").removeEventListener("click", playerInputFn);
  } else if (tileCoor === "c1r1") {
    board[1][1] = turn;
    document.getElementById("c1r1").removeEventListener("click", playerInputFn);
  } else if (tileCoor === "c2r1") {
    board[2][1] = turn;
    document.getElementById("c2r1").removeEventListener("click", playerInputFn);
  } else if (tileCoor === "c0r0") {
    board[0][0] = turn;
    document.getElementById("c0r0").removeEventListener("click", playerInputFn);
  } else if (tileCoor === "c1r0") {
    board[1][0] = turn;
    document.getElementById("c1r0").removeEventListener("click", playerInputFn);
  } else if (tileCoor === "c2r0") {
    board[2][0] = turn;
    document.getElementById("c2r0").removeEventListener("click", playerInputFn);
  }
  console.log("evt.target", evt.target);
  console.log(turn);
  turn *= -1;
  turnsLeft--;
  console.log("turnsleft" + turnsLeft);

  //Check winner
  checkWinner();
  render();
}

function checkWinner() {
  console.log("check winner function!");
  //Checks horizontal
  if (board[0][0] + board[1][0] + board[2][0] === 3) {
    winner = 1;
  } else if (board[0][1] + board[1][1] + board[2][1] === 3) {
    winner = 1;
  } else if (board[0][2] + board[1][2] + board[2][2] === 3) {
    winner = 1;
  } else if (board[0][0] + board[1][0] + board[2][0] === -3) {
    winner = -1;
  } else if (board[0][1] + board[1][1] + board[2][1] === -3) {
    winner = -1;
  } else if (board[0][2] + board[1][2] + board[2][2] === -3) {
    winner = -1;
  }
  //Checks vertical
  else if (board[0][0] + board[0][1] + board[0][2] === 3) {
    winner = 1;
  } else if (board[1][0] + board[1][1] + board[1][2] === 3) {
    winner = 1;
  } else if (board[2][0] + board[2][1] + board[2][2] === 3) {
    winner = 1;
  } else if (board[0][0] + board[0][1] + board[0][2] === -3) {
    winner = -1;
  } else if (board[1][0] + board[1][1] + board[1][2] === -3) {
    winner = -1;
  } else if (board[2][0] + board[2][1] + board[2][2] === -3) {
    winner = -1;
  }
  //Checks diagonal
  else if (board[0][0] + board[1][1] + board[2][2] === 3) {
    winner = 1;
  } else if (board[0][0] + board[1][1] + board[2][2] === -3) {
    winner = -1;
  } else if (board[0][2] + board[1][1] + board[2][0] === 3) {
    winner = 1;
  } else if (board[0][2] + board[1][1] + board[2][0] === -3) {
    winner = -1;
  }

  //Checks tie game
  else if (turnsLeft === 0) {
    winner = "T";
  }
  console.log("winner: " + COLORS[winner]);
}
