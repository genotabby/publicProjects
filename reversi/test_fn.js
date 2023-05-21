// let i = 1;

// for (i = 0; (i = 8); i++) {
//   //
//   console.log("inArray", i);
// }

// console.log(i);

let board = [];
let length = 6;
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

board = startingBoard;

let borderedBoard = [];
for (let i = 0; i < row + 2; i++) {
  borderedBoard[i] = [];
  for (let j = 0; j < column + 2; j++) {
    borderedBoard[i][j] = 2;
    // borderedBoard[i][j] = board[i][j];
  }
}
console.log("border", borderedBoard);

for (let i = 0; i < row; i++) {
  // borderedBoard[i] = [];
  for (let j = 0; j < column; j++) {
    // borderedBoard[i][j] = 0;
    borderedBoard[i + 1][j + 1] = board[i][j];
  }
}

//To check east
board[0][1] = -1;
board[0][2] = -1;
board[0][3] = -1;
board[0][4] = -1;
board[0][5] = -1;

//To check south
board[1][0] = -1;
board[2][0] = -1;
board[3][0] = -1;
board[4][0] = -1;
board[5][0] = -1;

//To check SE
// board[1][1] = -1;
// board[2][2] = -1;
// board[3][3] = -1;
// board[4][4] = -1;
// board[5][5] = -1;
// console.log("border", borderedBoard);

//if player -1's turn
let turn = 1;

//Player placed tile
let TileCoorX = 0;
let TileCoorY = 0;
board[TileCoorX][TileCoorY] = turn;

//import board into borderedBoard
for (let i = 0; i < row; i++) {
  // borderedBoard[i] = [];
  for (let j = 0; j < column; j++) {
    // borderedBoard[i][j] = 0;
    borderedBoard[i + 1][j + 1] = board[i][j];
  }
}
console.log(board);
console.log(borderedBoard);
let count = 0;

let borderedBoardX = TileCoorX + 1;
let borderedBoardY = TileCoorY + 1;

//check east in bordered
let cachedTileCoorXBordered = borderedBoardX;
let cachedTileCoorYBordered = borderedBoardY;

console.log("X", borderedBoardX);
console.log("Y", borderedBoardY);

while (borderedBoard[borderedBoardX][borderedBoardY + 1] == -turn) {
  console.log("East works");
  borderedBoardY++;
  console.log("borderedBoardY", borderedBoardY);
  count++;
  console.log("count", count);
  if (borderedBoard[borderedBoardX][borderedBoardY + 1] == turn) {
    console.log("X", borderedBoardX, "Y", borderedBoardY + 1);

    console.log("Check east positive");
    borderedBoardY = borderedBoardY - count + 1;
    for (i = 0; i < count; i++) {
      borderedBoard[borderedBoardX][borderedBoardY + i] = turn;
      console.log(borderedBoardX);
      console.log(borderedBoardY + i);
      console.log("flip", i);
    }

    console.log("East complete!");
  }
}

borderedBoardX = cachedTileCoorXBordered;
borderedBoardY = cachedTileCoorYBordered;

count = 0;
//Check South in bordered
while (borderedBoard[borderedBoardX + 1][borderedBoardY] == -turn) {
  console.log("South works");
  borderedBoardX++;
  console.log("borderedBoardX", borderedBoardX);
  count++;
  console.log("count", count);
  if (borderedBoard[borderedBoardX + 1][borderedBoardY] == turn) {
    console.log("X", borderedBoardX + 1, "Y", borderedBoardY);

    console.log("Check south positive");
    borderedBoardX = borderedBoardX - count + 1;
    for (i = 0; i < count; i++) {
      borderedBoard[borderedBoardX + i][borderedBoardY] = turn;
      console.log(borderedBoardX + i);
      console.log(borderedBoardY);
      console.log("flipB", i);
    }
  }
}
for (let i = 0; i < row; i++) {
  for (let j = 0; j < column; j++) {
    board[i][j] = borderedBoard[i + 1][j + 1];
  }
}

//!Not bordered checks

//check east
// let cachedTileCoorX = TileCoorX;
// let cachedTileCoorY = TileCoorY;

// console.log("X", TileCoorX);
// console.log("Y", TileCoorY);

// while (board[TileCoorX][TileCoorY + 1] == -turn) {
//   console.log("East works");
//   TileCoorY++;
//   console.log("TilecoorY", TileCoorY);
//   count++;
//   console.log("count", count);
//   if (board[TileCoorX][TileCoorY + 1] == turn) {
//     console.log("X", TileCoorX, "Y", TileCoorY + 1);

//     console.log("Check east positive");
//     TileCoorY = TileCoorY - count + 1;
//     for (i = 0; i < count; i++) {
//       board[TileCoorX][TileCoorY + i] = turn;
//       console.log(TileCoorX);
//       console.log(TileCoorY + i);
//       console.log("flip", i);
//     }

//     console.log("East complete!");
//   }
// }
// TileCoorX = cachedTileCoorX;
// TileCoorY = cachedTileCoorY;
// count = 0;
// console.log("afterX", TileCoorX);
// console.log("afterY", TileCoorY);

// //Check South
// while (board[TileCoorX + 1][TileCoorY] == -turn) {
//   console.log("South works");
//   TileCoorX++;
//   console.log("TilecoorX", TileCoorX);
//   count++;
//   console.log("count", count);
//   if (board[TileCoorX + 1][TileCoorY] == turn) {
//     console.log("X", TileCoorX + 1, "Y", TileCoorY);

//     console.log("Check south positive");
//     TileCoorX = TileCoorX - count + 1;
//     for (i = 0; i < count; i++) {
//       board[TileCoorX + i][TileCoorY] = turn;
//       console.log(TileCoorX + i);
//       console.log(TileCoorY);
//       console.log("flip", i);
//     }
//   }
// }

//check SE
while (board[TileCoorX + 1][TileCoorY + 1] == -turn) {
  console.log("SE works");
  TileCoorY++;
  TileCoorX++;
  console.log("TilecoorY", TileCoorY);
  console.log("TilecoorX", TileCoorX);
  count++;
  console.log("count", count);
  if (board[TileCoorX + 1][TileCoorY + 1] == turn) {
    console.log("Check SE positive");
    checkedTileCoorY = TileCoorY - count + 1;
    checkedTileCoorX = TileCoorX - count + 1;
    for (i = 0; i < count; i++) {
      board[checkedTileCoorX + i][checkedTileCoorY + i] = turn;
      console.log(checkedTileCoorX + i);
      console.log(checkedTileCoorY + i);
      console.log("flip", i);
    }
  }
}

//check west
// while (board[TileCoorX][TileCoorY - 1] == -turn) {
//   console.log("West works");
//   TileCoorY--;
//   console.log(TileCoorY);
//   board[TileCoorX][TileCoorY] = turn;
// }

// //check SE
// while (board[TileCoorX + 1][TileCoorY - 1] == -turn) {
//   console.log("SE works");
//   TileCoorY--;
//   TileCoorX++;
//   console.log(TileCoorY);
//   board[TileCoorX][TileCoorY] = turn;
// }
console.log("board", board);
console.log("result", borderedBoard);
