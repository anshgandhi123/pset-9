var squareClass = document.getElementsByClassName("square");
var whiteCheckers = document.getElementsByClassName("white_checker");
var blackCheckers = document.getElementsByClassName("black_checker");
var table = document.getElementById("table");
var score = document.getElementById("score");
var blackColor = document.getElementById("blackColor");
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var windowWidth =  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var moveLength = 80 ;
var moveDeviation = 10;
var Dimension = 1;
var selectedPiece,selectedPieceindex;
var upRight,upLeft,downLeft,downRight;
var contor = 0 , gameOver = 0;
var bigScreen = 1;

var block = [];
var w_checker = [];
var b_checker = [];
var the_checker ;
var oneMove;
var anotherMove;
var mustAttack = false;
var multiplier = 1

var tableLimit,reverse_tableLimit ,  moveUpLeft,moveUpRight, moveDownLeft,moveDownRight , tableLimitLeft, tableLimitRight;
