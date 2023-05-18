// import "./style.css";
// import javascriptLogo from "./javascript.svg";
// import viteLogo from "/vite.svg";
// import { setupCounter } from "./counter.js";
const boardEl = document.querySelector(".board");

const inputLength = 4;
let row = inputLength;
let column = inputLength;
const board = [];
for (let i = 0; i < row; i++) {
  board[i] = [];
  console.log("row", board);
  for (let j = 0; j < column; j++) {
    board[i][j] = 0;
  }
}

boardEl.innerHTML = board;
console.log(board);
