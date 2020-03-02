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
	if (square % 8) {
		this.coordX= square % 8;
		this.coordY = Math.floor(square/8) + 1;
	}
	else {
		this.coordX = 8;
		this.coordY = square / 8 ;
	}
	this.id.onclick = function() {
		showMoves(piece);
	}
}

checker.prototype.setCoord = function(X, Y){
	var x = (this.coordX - 1) * length + deviation;
	var y = (this.coordY - 1) * length + deviation;
	this.id.style.top = y + 'px';
	this.id.style.left = x + 'px';
}

checker.prototype.changeCoord = function(X, Y) {
	this.coordY +=Y;
	this.coordX += X;
}

checker.prototype.checkIfKing = function() {
	if (this.coordY == 8 && !this.king &&this.color == "white") {
		this.king = true;
		this.id.style.border = "4px solid #FFFF00";
	}
	if (this.coordY == 1 && !this.king &&this.color == "black") {
		this.king = true;
		this.id.style.border = "4px solid #FFFF00";
	}
}

for (var i = 1; i <=64; i++)
	block[i] = new squares(squareClass[i],i);

for (var i = 1; i <= 4; i++) {
	checkerWhite[i] = new checker(whiteChecker[i], "white", 2*i -1 );
	checkerWhite[i].setCoord(0,0);
	block[2*i - 1].ocupied = true;
	block[2*i - 1].pieceId = checkerWhite[i];
}

for (var i = 5; i <= 8; i++){
	checkerWhite[i] = new checker(whiteChecker[i], "white", 2*i );
	checkerWhite[i].setCoord(0,0);
	block[2*i].ocupied = true;
	block[2*i].pieceId = checkerWhite[i];
}

for (var i = 9; i <= 12; i++){
	checkerWhite[i] = new checker(whiteChecker[i], "white", 2*i - 1 );
	checkerWhite[i].setCoord(0, 0);
	block[2*i - 1].ocupied = true;
	block[2*i - 1].pieceId = checkerWhite[i];
}

for (var i = 1; i <= 4; i++){
	checkerBlack[i] = new checker(blackChecker[i], "black", 56 + 2*i  );
	checkerBlack[i].setCoord(0,0);
	block[56 +  2*i ].ocupied = true;
	block[56+  2*i ].pieceId =checkerBlack[i];
}

for (var i = 5; i <= 8; i++){
	checkerBlack[i] = new checker(blackChecker[i], "black", 40 +  2*i - 1 );
	checkerBlack[i].setCoord(0,0);
	block[ 40 + 2*i - 1].ocupied = true;
	block[ 40 + 2*i - 1].pieceId = checkerBlack[i];
}

for (var i = 9; i <= 12; i++){
	checkerBlack[i] = new checker(blackChecker[i], "black", 24 + 2*i  );
	checkerBlack[i].setCoord(0,0);
	block[24 + 2*i ].ocupied = true;
	block[24 + 2*i ].pieceId = checkerBlack[i];
}
checkers = checkerWhite;

function showMoves (piece) {

	var match = false;
	mustAttack = false;
	if(selectedPiece) {
			erase_roads(selectedPiece);
	}
	selectedPiece = piece;
	var i, j;
	for (j = 1; j <= 12; j++) {
		if(checkers[j].id == piece) {
			i = j;
			selectedPieceindex = j;
			match = true;
		}
	}
