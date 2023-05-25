/*----- constants -----*/
const COLORS = {
  0: "rgb(84,150,109)",
  1: "white",
  "-1": "black",
};

/*----- state variables -----*/
let board = [];
let turn = 1; // 1 or -1
let winner = null; //null = no winner; 1 or -1 = winner; 'T' = Tie
let startedGame = null;
let skipTurn = false;
let blankCount;
let length;
let whiteCount = 0;
let blackCount = 0;
let possibleWhiteCount = 0;
let possibleBlackCount = 0;
let skipCount = 0;

/*----- cached elements  -----*/
const turnWindow = document.querySelector("#turnWindow");
const startButton = document.querySelector("#startButton");
const boardSection = document.querySelector("#board");
const lengthEl = document.querySelector("#lengthEl");
const msgEl = document.querySelector(".msgEl");
const whiteCountEl = document.querySelector("#whiteCount");
const blackCountEl = document.querySelector("#blackCount");
const skipMsgEl = document.querySelector("#skipMsg");
const playAgainButton = document.querySelector("#playAgain");
const eventsEl = document.querySelector("#events");

/*----- event listeners -----*/

startButton.addEventListener("click", initBoard);
playAgainButton.addEventListener("click", init);

/*----- functions -----*/

function init() {
  startedGame = null;
  render();
  console.log("Starting board", board);
}

function initBoard() {
  const inputLength = document.querySelector("#inputLength").value;
  console.log(inputLength);
  length = Number(inputLength);
  let row = length;
  let column = length;
  const startingBoard = [];
  changeRowColumnGridStyle(length);
  for (let i = 0; i < row; i++) {
    startingBoard[i] = [];
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
  skipMsgEl.innerHTML = "";
  turn = -1;
  winner = null;
  startedGame = true;
  console.log("turn", turn);
  console.log("Init board", startingBoard);
  board = startingBoard;
  checkPlaceableTiles();
  checkCount();
  render();
}

function render() {
  renderBoard();
  renderMessage();
  renderControls();
}

function renderBoard() {
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
      divPieces.id = cell;
      cell++;

      divPieces.addEventListener("click", playerEvt);
      divSquare.append(divPieces);
      if (cellVal === -1) {
        divPieces.classList.add("blackPiece");
      } else if (cellVal == -2) {
        divPieces.classList.add("possibleBlackPiece");
      } else if (cellVal == 1) {
        divPieces.classList.add("whitePiece");
      } else if (cellVal == 2) {
        divPieces.classList.add("possibleWhitePiece");
      }
      //to hover over pieces
      else {
        divPieces.classList.add("blankTile");
        if (turn === 1) {
          divPieces.classList.add("whiteTurn");
        } else if (turn === -1) {
          divPieces.classList.add("blackTurn");
        }
      }
    });
  });
}

function playerEvt(evt) {
  let TileCoor = evt.target.getAttribute("id");
  let TileCoorX = Math.floor(TileCoor / length);
  let TileCoorY = TileCoor % length;
  if (
    board[TileCoorX][TileCoorY] === 1 ||
    board[TileCoorX][TileCoorY] === -1 ||
    board[TileCoorX][TileCoorY] === 0
  ) {
    return;
  }
  board[TileCoorX][TileCoorY] = turn;
  skipMsgEl.innerHTML = "";
  checkSurrounding(TileCoorX, TileCoorY);
  turn = -turn;
  checkPlaceableTiles();
  checkCount();
  console.log(board);
  checkWinner();
  render();
  checkSkip();
  console.log("turn", turn);
}

function checkSkip() {
  console.log("enterSkip");
  if (
    (turn === 1 && possibleWhiteCount === 0) ||
    (turn === -1 && possibleBlackCount === 0)
  ) {
    turn = -turn;
    checkPlaceableTiles();
    checkCount();
    renderSkipMsg();
    // skipCount++;
    checkWinner();
    render();
    console.log("SKIPPED");
  }
}
function renderSkipMsg() {
  if (turn == 1 && winner == null) {
    skipMsgEl.innerHTML = "Black has no moves available! Black turn skipped!";
  }
  if (turn == -1 && winner == null) {
    skipMsgEl.innerHTML = "White has no moves available! White turn skipped!";
  }
}

function checkWinner() {
  // let trulyEmptyTiles = blankCount + possibleBlackCount + possibleWhiteCount;
  if (skipCount === 2) {
    if (blackCount > whiteCount) {
      winner = -1;
      console.log("black wins");
    } else if (whiteCount > blackCount) {
      winner = 1;
      console.log("white wins");
    } else if (whiteCount === blackCount) {
      winner = "T";
    }
  }
}

function renderMessage() {
  console.log("skipCount", skipCount);
  whiteCountEl.innerHTML = `White count: ${whiteCount}`;
  blackCountEl.innerHTML = `Black count: ${blackCount}`;
  if (skipCount === 2) {
    skipMsgEl.innerHTML = "Both players have no moves left!";
  }
  if (winner === -1) {
    msgEl.innerHTML = `Game over!<br><span style="color: ${
      COLORS[-1]
    }">${COLORS[-1].toUpperCase()}</span> wins!`;
  } else if (winner === 1) {
    msgEl.innerHTML = `Game over!<br><span style="color: ${
      COLORS[1]
    }">${COLORS[1].toUpperCase()}</span> Wins!`;
  } else if (winner === "T") {
    msgEl.innerHTML = "Game over!<br>It's a Tie!";
  } else {
    msgEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[
      turn
    ].toUpperCase()}</span>'s Turn`;
  }
}
function renderControls() {
  if (startedGame) {
    startButton.style.visibility = "hidden";
    lengthEl.style.visibility = "hidden";
    skipMsgEl.style.visibility = "visible";
    whiteCountEl.style.visibility = "visible";
    blackCountEl.style.visibility = "visible";
    msgEl.style.visibility = "visible";
    turnWindow.style.visibility = "visible";
    boardSection.style.visibility = "visible";
    eventsEl.style.visibility = "visible";
    if (winner === "T" || winner == 1 || winner == -1) {
      playAgainButton.style.visibility = "visible";
    }
  } else {
    startButton.style.visibility = "visible";
    lengthEl.style.visibility = "visible";
    skipMsgEl.style.visibility = "hidden";
    whiteCountEl.style.visibility = "hidden";
    blackCountEl.style.visibility = "hidden";
    msgEl.style.visibility = "hidden";
    turnWindow.style.visibility = "hidden";
    boardSection.style.visibility = "hidden";
    playAgainButton.style.visibility = "hidden";
    eventsEl.style.visibility = "hidden";
  }
}

function checkCount() {
  let row = length;
  let column = length;
  //Clear counts to populate later
  whiteCount = 0;
  blackCount = 0;
  possibleWhiteCount = 0;
  possibleBlackCount = 0;
  blankCount = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (board[i][j] == 1) {
        whiteCount++;
      }
      if (board[i][j] == -1) {
        blackCount++;
      }
      if (board[i][j] == 0) {
        blankCount++;
      }
      if (board[i][j] == 2) {
        possibleWhiteCount++;
      }
      if (board[i][j] == -2) {
        possibleBlackCount++;
      }
    }
  }
  console.log("PWC", possibleWhiteCount, "PBC", possibleBlackCount);
  if (possibleBlackCount === 0 && possibleWhiteCount === 0) {
    skipCount++;
  } else {
    skipCount = 0;
  }
}

function checkPlaceableTiles() {
  let count = 0;
  let row = length;
  let column = length;
  let checkBorderedBoard = [];
  for (let i = 0; i < row + 2; i++) {
    checkBorderedBoard[i] = [];
    for (let j = 0; j < column + 2; j++) {
      checkBorderedBoard[i][j] = 3;
    }
  }
  //import board into borderedBoard
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      checkBorderedBoard[i + 1][j + 1] = board[i][j];
    }
  }
  console.log("checkTurn", turn);
  for (let i = 1; i < row + 1; i++) {
    for (let j = 1; j < column + 1; j++) {
      if (
        checkBorderedBoard[i][j] === -2 * turn ||
        checkBorderedBoard[i][j] === 2 * turn
      ) {
        checkBorderedBoard[i][j] = 0;
      }
    }
  }
  let cell = 0;
  for (let i = 1; i < row + 1; i++) {
    for (let j = 1; j < column + 1; j++) {
      if (checkBorderedBoard[i][j] === turn) {
        //check east in bordered
        console.log("checkPT", i, j);
        let borderedBoardX = i;
        let borderedBoardY = j;
        while (
          checkBorderedBoard[borderedBoardX][borderedBoardY + 1] == -turn
        ) {
          console.log("Check East works");
          borderedBoardY++;
          console.log(
            "borderedBoardX",
            borderedBoardX,
            "borderedBoardY",
            borderedBoardY
          );
          console.log(
            "borderedBoardX",
            borderedBoardX,
            "borderedBoardY+1",
            borderedBoardY + 1,
            "value",
            checkBorderedBoard[borderedBoardX][borderedBoardY + 1]
          );
          if (checkBorderedBoard[borderedBoardX][borderedBoardY + 1] == 0) {
            console.log("Check east positive");
            checkBorderedBoard[borderedBoardX][borderedBoardY + 1] = 2 * turn;
            console.log("East complete!");
          }
        }
        //check west in bordered
        borderedBoardX = i;
        borderedBoardY = j;
        while (
          checkBorderedBoard[borderedBoardX][borderedBoardY - 1] == -turn
        ) {
          console.log("Check west works");
          borderedBoardY--;
          console.log(
            "borderedBoardX",
            borderedBoardX,
            "borderedBoardY",
            borderedBoardY
          );
          console.log(
            "borderedBoardX",
            borderedBoardX,
            "borderedBoardY-1",
            borderedBoardY - 1,
            "value",
            checkBorderedBoard[borderedBoardX][borderedBoardY - 1]
          );
          if (checkBorderedBoard[borderedBoardX][borderedBoardY - 1] == 0) {
            console.log("Check west positive");
            checkBorderedBoard[borderedBoardX][borderedBoardY - 1] = 2 * turn;
            console.log("west complete!");
          }
        }
        //check north in bordered
        borderedBoardX = i;
        borderedBoardY = j;
        while (
          checkBorderedBoard[borderedBoardX - 1][borderedBoardY] == -turn
        ) {
          console.log("Check north works");
          borderedBoardX--;
          console.log(
            "borderedBoardX",
            borderedBoardX,
            "borderedBoardY",
            borderedBoardY
          );
          console.log(
            "borderedBoardX-1",
            borderedBoardX - 1,
            "borderedBoardY",
            borderedBoardY,
            "value",
            checkBorderedBoard[borderedBoardX - 1][borderedBoardY]
          );
          if (checkBorderedBoard[borderedBoardX - 1][borderedBoardY] == 0) {
            console.log("Check north positive");
            checkBorderedBoard[borderedBoardX - 1][borderedBoardY] = 2 * turn;
            console.log("north complete!");
          }
        }
        //check south in bordered
        borderedBoardX = i;
        borderedBoardY = j;
        while (
          checkBorderedBoard[borderedBoardX + 1][borderedBoardY] == -turn
        ) {
          console.log("Check south works");
          borderedBoardX++;
          console.log(
            "borderedBoardX",
            borderedBoardX,
            "borderedBoardY",
            borderedBoardY
          );
          console.log(
            "borderedBoardX+1",
            borderedBoardX + 1,
            "borderedBoardY",
            borderedBoardY,
            "value",
            checkBorderedBoard[borderedBoardX + 1][borderedBoardY]
          );
          if (checkBorderedBoard[borderedBoardX + 1][borderedBoardY] == 0) {
            console.log("Check south positive");
            checkBorderedBoard[borderedBoardX + 1][borderedBoardY] = 2 * turn;
            console.log("south complete!");
          }
        }
        //check SE in bordered
        borderedBoardX = i;
        borderedBoardY = j;
        while (
          checkBorderedBoard[borderedBoardX + 1][borderedBoardY + 1] == -turn
        ) {
          console.log("Check SE works");
          borderedBoardX++;
          borderedBoardY++;
          console.log(
            "borderedBoardX",
            borderedBoardX,
            "borderedBoardY",
            borderedBoardY
          );
          console.log(
            "borderedBoardX+1",
            borderedBoardX + 1,
            "borderedBoardY+1",
            borderedBoardY + 1,
            "value",
            checkBorderedBoard[borderedBoardX + 1][borderedBoardY + 1]
          );
          if (checkBorderedBoard[borderedBoardX + 1][borderedBoardY + 1] == 0) {
            console.log("Check SE positive");
            checkBorderedBoard[borderedBoardX + 1][borderedBoardY + 1] =
              2 * turn;
            console.log("SE complete!");
          }
        }
        //check NW in bordered
        borderedBoardX = i;
        borderedBoardY = j;
        while (
          checkBorderedBoard[borderedBoardX - 1][borderedBoardY - 1] == -turn
        ) {
          console.log("Check NW works");
          borderedBoardX--;
          borderedBoardY--;
          console.log(
            "borderedBoardX",
            borderedBoardX,
            "borderedBoardY",
            borderedBoardY
          );
          console.log(
            "borderedBoard-1X",
            borderedBoardX - 1,
            "borderedBoardY-1",
            borderedBoardY - 1,
            "value",
            checkBorderedBoard[borderedBoardX - 1][borderedBoardY - 1]
          );
          if (checkBorderedBoard[borderedBoardX - 1][borderedBoardY - 1] == 0) {
            console.log("Check NW positive");
            checkBorderedBoard[borderedBoardX - 1][borderedBoardY - 1] =
              2 * turn;
            console.log("NW complete!");
          }
        }
        //check NE in bordered
        borderedBoardX = i;
        borderedBoardY = j;
        while (
          checkBorderedBoard[borderedBoardX - 1][borderedBoardY + 1] == -turn
        ) {
          console.log("Check NE works");
          borderedBoardX--;
          borderedBoardY++;
          console.log(
            "borderedBoardX",
            borderedBoardX,
            "borderedBoardY",
            borderedBoardY
          );
          console.log(
            "borderedBoardX-1",
            borderedBoardX - 1,
            "borderedBoardY+1",
            borderedBoardY + 1,
            "value",
            checkBorderedBoard[borderedBoardX - 1][borderedBoardY + 1]
          );
          if (checkBorderedBoard[borderedBoardX - 1][borderedBoardY + 1] == 0) {
            console.log("Check NE positive");
            checkBorderedBoard[borderedBoardX - 1][borderedBoardY + 1] =
              2 * turn;
            console.log("NE complete!");
          }
        }
        //check SW in bordered
        borderedBoardX = i;
        borderedBoardY = j;
        while (
          checkBorderedBoard[borderedBoardX + 1][borderedBoardY - 1] == -turn
        ) {
          console.log("Check SW works");
          borderedBoardX++;
          borderedBoardY--;
          console.log(checkBorderedBoard);
          console.log(
            "borderedBoardX",
            borderedBoardX,
            "borderedBoardY",
            borderedBoardY
          );
          console.log(
            "borderedBoardX+1",
            borderedBoardX + 1,
            "borderedBoardY-1",
            borderedBoardY - 1,
            "value",
            checkBorderedBoard[borderedBoardX + 1][borderedBoardY - 1]
          );
          if (checkBorderedBoard[borderedBoardX + 1][borderedBoardY - 1] == 0) {
            console.log("Check SW positive");
            checkBorderedBoard[borderedBoardX + 1][borderedBoardY - 1] =
              2 * turn;
            console.log("SW complete!");
          }
        }
      }
    }
  }

  console.log("placeable", checkBorderedBoard);

  //Export borderedBoard back to board
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      board[i][j] = checkBorderedBoard[i + 1][j + 1];
    }
  }
}

function checkSurrounding(TileCoorX, TileCoorY) {
  let count = 0;
  let row = length;
  let column = length;
  let borderedBoard = [];
  for (let i = 0; i < row + 2; i++) {
    borderedBoard[i] = [];
    for (let j = 0; j < column + 2; j++) {
      borderedBoard[i][j] = 5;
    }
  }
  //import board into borderedBoard
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      borderedBoard[i + 1][j + 1] = board[i][j];
    }
  }
  console.log("borderedBoard", borderedBoard);

  let borderedBoardX = TileCoorX + 1;
  let borderedBoardY = TileCoorY + 1;

  //check east in bordered
  let cachedTileCoorXBordered = borderedBoardX;
  let cachedTileCoorYBordered = borderedBoardY;

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
      for (let i = 0; i < count; i++) {
        borderedBoard[borderedBoardX][borderedBoardY + i] = turn;
        console.log(borderedBoardX);
        console.log(borderedBoardY + i);
        console.log("flip", i);
      }

      console.log("East complete!");
    }
  }

  //Check West
  borderedBoardX = cachedTileCoorXBordered;
  borderedBoardY = cachedTileCoorYBordered;

  count = 0;
  while (borderedBoard[borderedBoardX][borderedBoardY - 1] == -turn) {
    console.log("West works");
    borderedBoardY--;
    console.log("borderedBoardY", borderedBoardY);
    count++;
    console.log("count", count);
    if (borderedBoard[borderedBoardX][borderedBoardY - 1] == turn) {
      console.log("X", borderedBoardX, "Y", borderedBoardY + 1);

      console.log("Check west positive");
      borderedBoardY = borderedBoardY + count - 1;
      for (let i = 0; i < count; i++) {
        borderedBoard[borderedBoardX][borderedBoardY - i] = turn;
        console.log(borderedBoardX);
        console.log(borderedBoardY + i);
        console.log("flip", i);
      }

      console.log("West complete!");
    }
  }

  //Check South in bordered

  borderedBoardX = cachedTileCoorXBordered;
  borderedBoardY = cachedTileCoorYBordered;
  count = 0;
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
      for (let i = 0; i < count; i++) {
        borderedBoard[borderedBoardX + i][borderedBoardY] = turn;
        console.log(borderedBoardX + i);
        console.log(borderedBoardY);
        console.log("flipB", i);
      }
    }
  }
  borderedBoardX = cachedTileCoorXBordered;
  borderedBoardY = cachedTileCoorYBordered;

  count = 0;
  //Check North in bordered
  while (borderedBoard[borderedBoardX - 1][borderedBoardY] == -turn) {
    console.log("North works");
    borderedBoardX--;
    console.log("borderedBoardX", borderedBoardX);
    count++;
    console.log("count", count);
    if (borderedBoard[borderedBoardX - 1][borderedBoardY] == turn) {
      console.log("Check north positive");
      borderedBoardX = borderedBoardX + count - 1;
      for (let i = 0; i < count; i++) {
        borderedBoard[borderedBoardX - i][borderedBoardY] = turn;
      }
    }
  }

  //Check SE in bordered
  borderedBoardX = cachedTileCoorXBordered;
  borderedBoardY = cachedTileCoorYBordered;
  count = 0;
  while (borderedBoard[borderedBoardX + 1][borderedBoardY + 1] == -turn) {
    console.log("SE works");
    borderedBoardX++;
    borderedBoardY++;
    count++;
    console.log("count", count);
    if (borderedBoard[borderedBoardX + 1][borderedBoardY + 1] == turn) {
      console.log("Check SE positive");
      borderedBoardX = borderedBoardX - count + 1;
      borderedBoardY = borderedBoardY - count + 1;
      for (let i = 0; i < count; i++) {
        borderedBoard[borderedBoardX + i][borderedBoardY + i] = turn;
      }
    }
  }

  //Check NW in bordered
  borderedBoardX = cachedTileCoorXBordered;
  borderedBoardY = cachedTileCoorYBordered;
  count = 0;
  while (borderedBoard[borderedBoardX - 1][borderedBoardY - 1] == -turn) {
    console.log("NW works");
    borderedBoardX--;
    borderedBoardY--;
    count++;
    console.log("count", count);
    if (borderedBoard[borderedBoardX - 1][borderedBoardY - 1] == turn) {
      console.log("Check SE positive");
      borderedBoardX = borderedBoardX + count - 1;
      borderedBoardY = borderedBoardY + count - 1;
      for (let i = 0; i < count; i++) {
        borderedBoard[borderedBoardX - i][borderedBoardY - i] = turn;
      }
    }
  }

  //Check NE in bordered
  borderedBoardX = cachedTileCoorXBordered;
  borderedBoardY = cachedTileCoorYBordered;
  count = 0;
  while (borderedBoard[borderedBoardX - 1][borderedBoardY + 1] == -turn) {
    console.log("NE works");
    borderedBoardX--;
    borderedBoardY++;
    count++;
    console.log("count", count);
    if (borderedBoard[borderedBoardX - 1][borderedBoardY + 1] == turn) {
      console.log("Check NE positive");
      borderedBoardX = borderedBoardX + count - 1;
      borderedBoardY = borderedBoardY - count + 1;
      for (let i = 0; i < count; i++) {
        borderedBoard[borderedBoardX - i][borderedBoardY + i] = turn;
      }
    }
  }

  //Check SW in bordered
  borderedBoardX = cachedTileCoorXBordered;
  borderedBoardY = cachedTileCoorYBordered;
  count = 0;
  while (borderedBoard[borderedBoardX + 1][borderedBoardY - 1] == -turn) {
    console.log("NE works");
    borderedBoardX++;
    borderedBoardY--;
    count++;
    console.log("count", count);
    if (borderedBoard[borderedBoardX + 1][borderedBoardY - 1] == turn) {
      console.log("Check NE positive");
      borderedBoardX = borderedBoardX - count + 1;
      borderedBoardY = borderedBoardY + count - 1;
      for (let i = 0; i < count; i++) {
        borderedBoard[borderedBoardX + i][borderedBoardY - i] = turn;
      }
    }
  }

  //Export borderedBoard back to board
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      board[i][j] = borderedBoard[i + 1][j + 1];
    }
  }
}

function changeRowColumnGridStyle(length) {
  if (length == 4) {
    document.getElementById("board").style.gridTemplateColumns =
      "repeat(4, 80px)";
    document.getElementById("board").style.gridTemplateRows = "repeat(4, 80px)";
  } else if (length == 6) {
    document.getElementById("board").style.gridTemplateColumns =
      "repeat(6, 60px)";
    document.getElementById("board").style.gridTemplateRows = "repeat(6, 60px)";
  } else if (length == 8) {
    document.getElementById("board").style.gridTemplateColumns =
      "repeat(8, 40px)";
    document.getElementById("board").style.gridTemplateRows = "repeat(8, 40px)";
  } else if (length == 10) {
    document.getElementById("board").style.gridTemplateColumns =
      "repeat(10, 35px)";
    document.getElementById("board").style.gridTemplateRows =
      "repeat(10, 35px)";
  } else if (length == 12) {
    document.getElementById("board").style.gridTemplateColumns =
      "repeat(12, 30px)";
    document.getElementById("board").style.gridTemplateRows =
      "repeat(12, 30px)";
  } else if (length == 14) {
    document.getElementById("board").style.gridTemplateColumns =
      "repeat(14, 25px)";
    document.getElementById("board").style.gridTemplateRows =
      "repeat(14, 25px)";
  } else if (length == 16) {
    document.getElementById("board").style.gridTemplateColumns =
      "repeat(16, 20px)";
    document.getElementById("board").style.gridTemplateRows =
      "repeat(16, 20px)";
  }
}

init();
