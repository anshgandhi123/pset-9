///////////////////// CONSTANTS /////////////////////////////////////
const winningConditions = [
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  [7, 8, 9, 10],
  [8, 9, 10, 11],
  [9, 10, 11, 12],
  [10, 11, 12, 13],
  [14, 15, 16, 17],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [17, 18, 19, 20],
  [21, 22, 23, 24],
  [22, 23, 24, 25],
  [23, 24, 25, 26],
  [24, 25, 26, 27],
];
///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let win;
let redWinCount = 0;
let yellowWinCount = 0;
let tieCount = 0;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  board = [
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",
    "", "", "", "", "", "", "",

  ];
  turn = first();
  win = null;
  render();
}

function first() {
  do {
    var a = window.prompt("Who goes first?")
    if (a == null) {
      // on purpose
    }
    a = String(a)
    a = a.toUpperCase()
    if (a != "RED" && a != "YELLOW" && a != "red" && a != "yellow") {
      window.alert("Invalid value. Please type either red or yellow.")
    }
  } while (a != "RED" && a != "YELLOW" && a != "red" && a != "yellow" && a != null)
  return a
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });
  message.textContent = win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });
    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "red" ? "yellow" : "red";
      win = getWinner();
      if (win === "T") {
        tieCount++;
        document.getElementById("thirdList").innerHTML = tieCount;
      }
      render();
    }
  }
}

function getWinner() {
  let winner = null;
  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
      if (winner === "Red") {
        xWinCount++;
        document.getElementById("list").innerHTML = redWinCount;
      }
      if (winner === "Yellow") {
        oWinCount++;
        document.getElementById("secondList").innerHTML = yellowWinCount;
      }
  }
});
  return winner ? winner : board.includes("") ? null : "T";
}
