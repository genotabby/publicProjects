/*----- constants -----*/
// import "./style.css";
// import javascriptLogo from "./javascript.svg";
// import viteLogo from "/vite.svg";
// import { setupCounter } from "./counter.js";
const boardEl = document.querySelector(".board");
const msgEl = document.querySelector(".msgEl");
const COLORS = {
  0: "white",
  1: "green",
  "-1": "black",
};

/*----- state variables -----*/
let board = [];
let turn; // 1 or -1
let winner = null; //null = no winner; 1 or -1 = winner; 'T' = Tie
let startedGame = null;
/*----- cached elements  -----*/

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
  let length = inputLength;
  let row = length;
  let column = length;
  const startingBoard = [];
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
  render();
}

function render() {
  renderBoard();
  renderMessage();
  renderControls();
}

// const renderBoard = () => {
function renderBoard() {
  // console.log("renderBoard", board.length);
  const div = document.querySelector("#game");
  div.innerHTML = "Placeholder"; //? erase everything

  //create the element
  // const ul = document.createElement("ul");
  const divGame = document.createElement("div");
  divGame.innerHTML = "test";

  const button = document.createElement("button");
  button.innerText = "i";

  for (let i = 0; i < board.length; i++) {
    // li.innerText = board[i];
    const li = document.createElement("li");
    li.innerText = "test";
    const button = document.createElement("button");
    button.innerText = i;
    console.log(i, board[i]);
  }

  board.forEach(function (colArr, colIdx) {
    // Iterate over the cells in the cur column (colArr)
    colArr.forEach(function (cellVal, rowIdx) {
      // console.log(`c${colIdx}r${rowIdx}`);
      const cellId = `c${colIdx}r${rowIdx}`;
      // const cellEl = document.getElementById(".board");
      // cellEl.style.backgroundColor = COLORS[cellVal];
    });
  });
  boardEl.innerText = board;
}

function renderMessage() {
  // msgEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[
  msgEl.innerHTML = `Player ${turn}</span>'s Turn`;
}
function renderControls() {
  if (startedGame) {
    startButton.style.visibility = "hidden";
    msgEl.style.visibility = "visible";
  } else {
    startButton.style.visibility = "visible";
    msgEl.style.visibility = "hidden";
  }
}

init();
