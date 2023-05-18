/*----- constants -----*/
// import "./style.css";
// import javascriptLogo from "./javascript.svg";
// import viteLogo from "/vite.svg";
// import { setupCounter } from "./counter.js";
const boardEl = document.querySelector(".board");

/*----- state variables -----*/
let startingBoard = [];
/*----- cached elements  -----*/

const button = document.querySelector("#startButton");

/*----- event listeners -----*/

function init() {
  button.addEventListener("click", initBoard);
  render();
  // const startingBoard = initBoard();
  console.log("Starting board", startingBoard);
}

/*----- functions -----*/
function initBoard() {
  const inputLength = document.querySelector("#inputLength").value;
  let length = inputLength;
  let row = length;
  let column = length;
  const board = [];
  for (let i = 0; i < row; i++) {
    board[i] = [];
    // console.log("row", board);
    for (let j = 0; j < column; j++) {
      if (i == length / 2 && j == length / 2) {
        board[i][j] = 1;
        board[i - 1][j - 1] = 1;
        board[i - 1][j] = -1;
        board[i][j - 1] = -1;
      } else {
        board[i][j] = 0;
      }
    }
  }
  console.log("board", board);
  startingBoard = board;
  render();
}
function renderBoard() {
  console.log("rebder");
  boardEl.innerHTML = startingBoard;
}

function render() {
  renderBoard();
}

init();
