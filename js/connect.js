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
  [11, 12, 13, 14],
  [14, 15, 16, 17],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [17, 18, 19, 20],
  [21, 22, 23, 24],
  [22, 23, 24, 25],
  [23, 24, 25, 26],
  [24, 25, 26, 27],
  [28, 29, 30, 31],
  [29, 30, 31, 32],
  [30, 31, 32, 33],
  [31, 32, 33, 34],
  [35, 36, 37, 38],
  [36, 37, 38, 39],
  [37, 38, 39, 40],
  [38, 39, 40, 41],

  [0, 7, 14, 21],
  [7, 14, 21, 28],
  [14, 21, 28, 35],
  [1, 8, 15, 22],
  [8, 15, 22, 29],
  [15, 22, 29, 36],
  [2, 9, 16, 23],
  [9, 16, 23, 30],
  [16, 23, 30, 37],
  [3, 10, 17, 24],
  [10, 17, 24, 31],
  [17, 24, 31, 38],
  [4, 11, 18, 25],
  [11, 18, 25, 32],
  [18, 25, 32, 39],
  [5, 12, 19, 26],
  [12, 19, 26, 33],
  [19, 26, 33, 40],
  [6, 13, 20, 27],
  [13, 20, 27, 34],
  [20, 27, 34, 41],

  [0, 8, 16, 24],
  [1, 9, 17, 25],
  [2, 10, 18, 26],
  [3, 11, 19, 27],
  [6, 12, 18, 24],
  [5, 11, 17, 23],
  [4, 10, 16, 22],
  [3, 9, 15, 21],
  [7, 15, 23, 31],
  [8, 16, 24, 32],
  [9, 17, 25, 33],
  [10, 18, 26, 34],
  [13, 19, 25, 31],
  [12, 18, 24, 30],
  [11, 17, 23, 29],
  [10, 16, 22, 28],
  [14, 22, 30, 38],
  [15, 23, 31, 39],
  [16, 24, 32, 40],
  [17, 25, 33, 41],
  [20, 26, 32, 38],
  [19, 25, 31, 37],
  [18, 24, 30, 36],
  [17, 23, 29, 35],
  [21, 15, 9, 3],
  [22, 16, 10, 4],
  [23, 17, 11, 5],
  [24, 18, 12, 6],
  [27, 19, 11, 3],
  [26, 18, 10, 2],
  [25, 17, 9, 1],
  [24, 16, 8, 0],
  [28, 22, 16, 10],
  [29, 23, 17, 11],
  [30, 24, 18, 12],
  [31, 25, 19, 13],
  [34, 26, 18, 10],
  [33, 25, 17, 9],
  [32, 24, 16, 8],
  [31, 23, 15, 7],
  [35, 29, 23, 17],
  [36, 30, 24, 18],
  [37, 31, 25, 19],
  [38, 32, 26, 20],
  [41, 33, 25, 17],
  [40, 32, 24, 16],
  [39, 31, 23, 15],
  [38, 30, 22, 14],
];

const firstColumn = [
  0, 7, 14, 21, 28, 35
];

const secondColumn = [
  1, 8, 15, 22, 29, 36
];

const thirdColumn = [
  2, 9, 16, 23, 30, 37
]

const fourthColumn = [
  3, 10, 17, 24, 31, 38
]

const fifthColumn = [
  4, 11, 18, 25, 32, 39
]

const sixthColumn = [
  5, 12, 19, 26, 33, 40
]

const seventhColumn = [
  6, 13, 20, 27, 34, 41
]

let board;
let score;
let turn;
let win;
let redWins = 0;
let yellowWins = 0;
let ties= 0
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("reset-scoreboard").onclick = resetScoreboard;
const victoryAudio = document.getElementById("victoryAudio");
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
      break;
    }
    a = String(a)
    a = a.toLowerCase()
    if (a != "red" && a != "Red" && a != "yellow" && a != "Yellow" && a != "YELLOW" && a != "RED") {
      window.alert("Invalid value. Please type either red or yellow.")
    }
  } while (a != "red" && a != "Red" && a != "yellow" && a != "Yellow" && a != "RED" && a != "YELLOW" && a != null)
  return a
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].style.backgroundColor = mark;
  });
  if (win === "red") {
    redWins +=  1
    victoryAudio.play();
    window.alert("RED WINS!")
  }
  else if (win === "yellow") {
    yellowWins +=  1
    victoryAudio.play();
    window.alert("YELLOW WINS!")
  }
  else if (win === "T") {
    ties += 1
    window.alert("It's a tie!")
  }
  redScore.innerHTML = redWins
  whiteScore.innerHTML = yellowWins
  tieScore.innerHTML = ties

  var message = ""
  message.innerHTML =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
  }

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    })

    if (firstColumn.includes(index)) {
      let area = -1;
      for (const cell of firstColumn) {
        if (board[cell] === "") {
          area = cell;
        }
      }

      board[area] = turn;
      turn = turn === "red" ? "yellow" : "red";
      win = getWinner();
      render();
    } else if (secondColumn.includes(index)) {
      let area = -1;
      for (const cell of secondColumn) {
        if (board[cell] === "") {
          area = cell;
        }
      }

      board[area] = turn;
      turn = turn === "red" ? "yellow" : "red";
      win = getWinner();
      render();
    } else if (thirdColumn.includes(index)) {
      let area = -1;
      for (const cell of thirdColumn) {
        if (board[cell] === "") {
          area = cell;
        }
      }

      board[area] = turn;
      turn = turn === "red" ? "yellow" : "red";
      win = getWinner();
      render();
    } else if (fourthColumn.includes(index)) {
      let area = -1;
      for (const cell of fourthColumn) {
        if (board[cell] === "") {
          area = cell;
        }
      }

      board[area] = turn;
      turn = turn === "red" ? "yellow" : "red";
      win = getWinner();
      render();
    } else if (fifthColumn.includes(index)) {
      let area = -1;
      for (const cell of fifthColumn) {
        if (board[cell] === "") {
          area = cell;
        }
      }

      board[area] = turn;
      turn = turn === "red" ? "yellow" : "red";
      win = getWinner();
      render();
    } else if (sixthColumn.includes(index)) {
      let area = -1;
      for (const cell of sixthColumn) {
        if (board[cell] === "") {
          area = cell;
        }
      }

      board[area] = turn;
      turn = turn === "red" ? "yellow" : "red";
      win = getWinner();
      render();
    } else if (seventhColumn.includes(index)) {
      let area = -1;
      for (const cell of seventhColumn) {
        if (board[cell] === "") {
          area = cell;
        }
      }

      board[area] = turn;
      turn = turn === "red" ? "yellow" : "red";
      win = getWinner();
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
      board[condition[1]] === board[condition[2]] &&
      board[condition[2]] === board[condition[3]]
    ) {
      winner = board[condition[0]];

    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}

function resetScoreboard() {
    redWins = 0;
    yellowWins = 0;
    ties = 0;
    redScore.innerHTML = redWins
    whiteScore.innerHTML = yellowWins
    tieScore.innerHTML = ties
}
