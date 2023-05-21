/*----- constants -----*/
// import "./style.css";
// import javascriptLogo from "./javascript.svg";
// import viteLogo from "/vite.svg";
// import { setupCounter } from "./counter.js";
const boardEl = document.querySelector(".board");
const msgEl = document.querySelector(".msgEl");
const COLORS = {
  0: "rgb(84,150,109)",
  // 1: "rgb(209,209,209)",
  1: "white",
  "-1": "black",
};

/*----- state variables -----*/
let board = [];
let turn = 1; // 1 or -1
let winner = null; //null = no winner; 1 or -1 = winner; 'T' = Tie
let startedGame = null;
let maxTurns;
let turnsLeft;
let length;

/*----- cached elements  -----*/
const turnWindow = document.querySelector("#turnWindow");
const startButton = document.querySelector("#startButton");

/*----- event listeners -----*/

function init() {
  startButton.addEventListener("click", initBoard);
  render();
  // const startingBoard = initBoard();
  console.log("Starting board", board);
}

/*----- functions -----*/
function initBoard() {
  const inputLength = document.querySelector("#inputLength").value;
  length = inputLength;
  let row = length;
  let column = length;
  const startingBoard = [];
  changeRowColumnGridStyle(length);
  for (let i = 0; i < row; i++) {
    startingBoard[i] = [];
    // console.log("row", board);
    for (let j = 0; j < column; j++) {
      if (i == length / 2 && j == length / 2) {
        startingBoard[i][j] = 1;
        startingBoard[i - 1][j - 1] = 1;
        startingBoard[i - 1][j] = -1;
        startingBoard[i][j - 1] = -1;
      } else {
        startingBoard[i][j] = 0;
      }
    }
  }
  turn = 1;
  winner = null;
  startedGame = true;
  console.log("turn", turn);
  console.log("Init board", startingBoard);
  board = startingBoard;
  maxTurns = length * length - 4;
  turnsLeft = maxTurns;
  console.log("max turns: ", maxTurns);
  // board[2][2] = 1;
  // board[6][6] = 1;

  render();
}

function render() {
  renderBoard();
  renderMessage();
  renderControls();
}

function renderBoard() {
  const boardSection = document.querySelector("#board");

  //Clear everything
  boardSection.innerHTML = "";
  let cell = 0;
  board.forEach(function (colArr, colIdx) {
    // Iterate over the cells in the cur column (colArr)
    colArr.forEach(function (cellVal, rowIdx) {
      const divSquare = document.createElement("div");
      boardSection.append(divSquare);
      divSquare.style.backgroundColor = COLORS[0];
      const divPieces = document.createElement("div");
      divPieces.classList.add("pieces");
      // divPieces.id = `c${colIdx}r${rowIdx}`;
      divPieces.id = cell;
      cell++;
      // console.log("evtListener", turnsLeft);
      // if (turnsLeft == 0) {
      //   divPieces.removeEventListener("click", playerEvt);
      //   console.log("GAME");
      // }
      divPieces.addEventListener("click", playerEvt);
      divSquare.append(divPieces);
      divPieces.style.backgroundColor = COLORS[cellVal];
    });
  });
}

function playerEvt(evt) {
  let TileCoor = evt.target.getAttribute("id");
  TileCoor;
  console.log("length", length);
  console.log("tileCoor:", TileCoor);
  let TileCoorX = Math.floor(TileCoor / length);
  let TileCoorY = TileCoor % length;
  console.log("X:", TileCoorX);
  console.log("Y", TileCoorY);
  board[TileCoorX][TileCoorY] = turn;
  // document.getElementById("0").removeEventListener("click", playerEvt);
  turn = turn * -1;
  console.log("player turn: ", turn);
  turnsLeft--;
  console.log("turns Left: ", turnsLeft);
  render();
  // checkZeroTurnsLeftRemoveListener();
  console.log(board);
}

function checkZeroTurnsLeftRemoveListener() {
  if (turnsLeft === 0) {
    console.log("GAMEOVER");
    board.forEach(function (colArr, colIdx) {
      // Iterate over the cells in the cur column (colArr)
      colArr.forEach(function (cellVal, rowIdx) {
        // divPieces.classList.add("pieces");
        // divPieces.removeEventListener("click", playerEvt);
        // divSquare.append(divPieces);
      });
    });
  }
}

function renderMessage() {
  if (turnsLeft <= 0) {
    msgEl.innerHTML = "Game over!";
    console.log("game!");
  } else {
    msgEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[
      turn
    ].toUpperCase()}</span>'s Turn`;
  }
}
function renderControls() {
  if (startedGame) {
    startButton.style.visibility = "hidden";
    msgEl.style.visibility = "visible";
    turnWindow.style.visibility = "visible";
  } else {
    startButton.style.visibility = "visible";
    msgEl.style.visibility = "hidden";
    turnWindow.style.visibility = "hidden";
  }
}

function changeRowColumnGridStyle(length) {
  if (length == 4) {
    document.getElementById("board").style.gridTemplateColumns =
      "repeat(4, 10vmin)";
    document.getElementById("board").style.gridTemplateRows =
      "repeat(4, 10vmin)";
  } else if (length == 6) {
    document.getElementById("board").style.gridTemplateColumns =
      "repeat(6, 10vmin)";
    document.getElementById("board").style.gridTemplateRows =
      "repeat(6, 10vmin)";
  } else if (length == 8) {
    document.getElementById("board").style.gridTemplateColumns =
      "repeat(8, 10vmin)";
    document.getElementById("board").style.gridTemplateRows =
      "repeat(8, 10vmin)";
  } else if (length == 10) {
    document.getElementById("board").style.gridTemplateColumns =
      "repeat(10, 10vmin)";
    document.getElementById("board").style.gridTemplateRows =
      "repeat(10, 10vmin)";
  } else if (length == 12) {
    document.getElementById("board").style.gridTemplateColumns =
      "repeat(12, 8vmin)";
    document.getElementById("board").style.gridTemplateRows =
      "repeat(12, 8vmin)";
  } else if (length == 14) {
    document.getElementById("board").style.gridTemplateColumns =
      "repeat(14, 8vmin)";
    document.getElementById("board").style.gridTemplateRows =
      "repeat(14, 8vmin)";
  }
}

init();
