var squareClass = document.getElementsByClassName("square");
var whiteChecker = document.getElementsByClassName("white_checker");
var blackChecker = document.getElementsByClassName("black_checker");
var table = document.getElementById("table");
var score = document.getElementById("score");
var blackColor = document.getElementById("black_background");
var moveSound = document.getElementById("moveSound");
var winSound = document.getElementById("winSound");
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var windowWidth =  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var length = 80;
var deviation = 10;
var dimension = 1;
var selectedPiece,selectedPieceindex;
var upRight,upLeft,downLeft,downRight;
var contor = 0 , gameOver = 0;
var screens = 1;
var block = [];
var checkerWhite = [];
var checkerBlack = [];
var checkers;
var firstMove;
var secondMove;
var mustAttack = false;
var multiplier = 1
var tableLimit,reverse_tableLimit ,  moveUpLeft,moveUpRight, moveDownLeft,moveDownRight , tableLimitLeft, tableLimitRight;

	getdimension();
	if (windowWidth > 640) {
		length = 80;
		deviation = 10;
	}
	else {
		length = 50;
		deviation = 6;
	}

var squares = function(square, index){
	this.id = square;
	this.ocupied = false;
	this.pieceId = undefined;
	this.id.onclick = function() {
		makeMove(index);
	}
}

var checker = function(piece, color, square) {
	this.id = piece;
	this.color = color;
	this.king = false;
	this.ocupied_square = square;
	this.alive = true;
	this.attack = false;
	if(square % 8) {
		this.coordX= square % 8;
		this.coordY = Math.floor(square/8) + 1;
	}
