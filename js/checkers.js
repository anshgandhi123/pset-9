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
const victoryAudio = document.getElementById("victoryAudio");

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
	this.coordY += Y;
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
	checkerWhite[i].setCoord(0, 0);
	block[2*i - 1].ocupied = true;
	block[2*i - 1].pieceId = checkerWhite[i];
}

for (var i = 5; i <= 8; i++){
	checkerWhite[i] = new checker(whiteChecker[i], "white", 2*i );
	checkerWhite[i].setCoord(0, 0);
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
			eraseOptions(selectedPiece);
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

	if(firstMove && !attackMoves(firstMove)){
		changeTurns(firstMove);
		firstMove = undefined;
		return false;
	}
	if(firstMove && firstMove != checkers[i] ){
		return false;
	}

	if(!match) {
	 return 0 ;
	}
  	if(checkers[i].color =="white"){
		tableLimit = 8;
		tableLimitRight = 1;
		tableLimitLeft = 8;
		moveUpRight = 7;
		moveUpLeft = 9;
		moveDownRight = - 9;
		moveDownLeft = -7;
	}
	else{
		tableLimit = 1;
		tableLimitRight = 8;
		tableLimitLeft = 1;
		moveUpRight = -7;
		moveUpLeft = -9;
		moveDownRight = 9;
		moveDownLeft = 7;
	}
		attackMoves(checkers[i]);

 	if(!mustAttack){
 	  downLeft = checkMove( checkers[i] , tableLimit , tableLimitRight , moveUpRight , downLeft);
		downRight = checkMove( checkers[i] , tableLimit , tableLimitLeft , moveUpLeft , downRight);
		if(checkers[i].king){
			upLeft = checkMove( checkers[i] , reverse_tableLimit , tableLimitRight , moveDownRight , upLeft);
			upRight = checkMove( checkers[i], reverse_tableLimit , tableLimitLeft , moveDownLeft, upRight)
		}
	}
	if(downLeft || downRight || upLeft || upRight){
			return true;
		}
	return false;

}

function eraseOptions(piece){
	if(downRight) block[downRight].id.style.background = "#BA7A3A";
	if(downLeft) block[downLeft].id.style.background = "#BA7A3A";
	if(upRight) block[upRight].id.style.background = "#BA7A3A";
	if(upLeft) block[upLeft].id.style.background = "#BA7A3A";
}

function makeMove (index) {
	var isMove = false;
	if(!selectedPiece)
		return false;
	if(index != upLeft && index != upRight && index != downLeft && index != downRight){
		eraseOptions(0);
		selectedPiece = undefined;
		return false;
	}

	if(checkers[1].color=="white"){
		cpy_downRight = upRight;
		cpy_downLeft = upLeft;
		cpy_upLeft = downLeft;
		cpy_upRight = downRight;
	}
	else{
		cpy_downRight = upLeft;
		cpy_downLeft = upRight;
		cpy_upLeft = downRight;
		cpy_upRight = downLeft;
	}

	if(mustAttack)
		multiplier = 2;
	else
		multiplier = 1;


		if(index == cpy_upRight){
			isMove = true;
			if(checkers[1].color=="white"){

				executeMove( multiplier * 1, multiplier * 1, multiplier * 9 );
				if(mustAttack) eliminateCheck(index - 9);
			}
			else{
				executeMove( multiplier * 1, multiplier * -1, multiplier * -7);
				if(mustAttack) eliminateCheck( index + 7 );
			}
		}

		if(index == cpy_upLeft){

			isMove = true;
			if(checkers[1].color=="white"){
				executeMove( multiplier * -1, multiplier * 1, multiplier * 7);
			 	if(mustAttack)	eliminateCheck(index - 7 );
			}
			else{
				executeMove( multiplier * -1, multiplier * -1, multiplier * -9);
				if (mustAttack) eliminateCheck( index + 9 );
			}
		}

		if(checkers[selectedPieceindex].king){

			if(index == cpy_downRight){
				isMove = true;
				if(checkers[1].color=="white"){
					executeMove( multiplier * 1, multiplier * -1, multiplier * -7);
					if(mustAttack) eliminateCheck ( index  + 7) ;
				}
				else{
					executeMove( multiplier * 1, multiplier * 1, multiplier * 9);
					if(mustAttack) eliminateCheck ( index  - 9) ;
				}
			}

		if(index == cpy_downLeft){
			isMove = true;
				if(checkers[1].color=="white"){
					executeMove( multiplier * -1, multiplier * -1, multiplier * -9);
					if(mustAttack) eliminateCheck ( index  + 9) ;
				}
				else{
					executeMove( multiplier * -1, multiplier * 1, multiplier * 7);
					if(mustAttack) eliminateCheck ( index  - 7) ;
				}
			}
		}

	eraseOptions(0);
	checkers[selectedPieceindex].checkIfKing();

	if (isMove) {
			secondMove = undefined;
		 if(mustAttack) {
			 	secondMove = attackMoves(checkers[selectedPieceindex]);
		 }
		if (secondMove){
			firstMove = checkers[selectedPieceindex];
			showMoves(firstMove);
		}
		else{
			firstMove = undefined;
		 	changeTurns(checkers[1]);
		 	gameOver = checkIfLost();
		 	if(gameOver) { setTimeout( victory(),3000 ); return false};
		 	gameOver = checkForMoves();
		 	if(gameOver) { setTimeout( victory() ,3000) ; return false};
		}
	}
}

function executeMove (X,Y,nSquare){
	checkers[selectedPieceindex].changeCoord(X,Y);
	checkers[selectedPieceindex].setCoord(0,0);
	block[checkers[selectedPieceindex].ocupied_square].ocupied = false;
	block[checkers[selectedPieceindex].ocupied_square + nSquare].ocupied = true;
	block[checkers[selectedPieceindex].ocupied_square + nSquare].pieceId = 	block[checkers[selectedPieceindex].ocupied_square ].pieceId;
	block[checkers[selectedPieceindex].ocupied_square ].pieceId = undefined;
	checkers[selectedPieceindex].ocupied_square += nSquare;

}

function checkMove(Apiece,tLimit,tLimit_Side,moveDirection,theDirection){
	if(Apiece.coordY != tLimit){
		if(Apiece.coordX != tLimit_Side && !block[ Apiece.ocupied_square + moveDirection ].ocupied){
			block[ Apiece.ocupied_square + moveDirection ].id.style.background = "#704923";
			theDirection = Apiece.ocupied_square + moveDirection;
		}
	else
			theDirection = undefined;
	}
	else
		theDirection = undefined;
	return theDirection;
}

function  checkAttack( check , X, Y , negX , negY, squareMove, direction){
	if(check.coordX * negX >= 	X * negX && check.coordY *negY <= Y * negY && block[check.ocupied_square + squareMove ].ocupied && block[check.ocupied_square + squareMove].pieceId.color != check.color && !block[check.ocupied_square + squareMove * 2 ].ocupied){
		mustAttack = true;
		direction = check.ocupied_square +  squareMove*2 ;
		block[direction].id.style.background = "#704923";
		return direction ;
	}
	else
		direction =  undefined;
		return direction;
}

function eliminateCheck(secondIndex){
	if(secondIndex < 1 || secondIndex > 64)
		return  0;

	var x = block[secondIndex].pieceId ;
	x.alive =false;
	block[secondIndex].ocupied = false;
	x.id.style.display  = "none";
}

function attackMoves(ckc){

 		upRight = undefined;
 		upLeft = undefined;
 		downRight = undefined;
 		downLeft = undefined;

 	if(ckc.king ) {
 		if(ckc.color == "white"){
			upRight = checkAttack( ckc , 6, 3 , -1 , -1 , -7, upRight );
			upLeft = checkAttack( ckc, 3 , 3 , 1 , -1 , -9 , upLeft );
		}
		else {
	 		downLeft = checkAttack( ckc , 3, 6, 1 , 1 , 7 , downLeft );
			downRight = checkAttack( ckc , 6 , 6 , -1, 1 ,9 , downRight );
		}
	}
	if (ckc.color == "white") {
	 	downLeft = checkAttack( ckc , 3, 6, 1 , 1 , 7 , downLeft );
		downRight = checkAttack( ckc , 6 , 6 , -1, 1 ,9 , downRight );
	}
	else {
		upRight = checkAttack( ckc , 6, 3 , -1 , -1 , -7, upRight );
		upLeft = checkAttack( ckc, 3 , 3 , 1 , -1 , -9 , upLeft );
	}

 	if(ckc.color== "black" && (upRight || upLeft || downLeft || downRight ) ) {
	 	var p = upLeft;
	 	upLeft = downLeft;
	 	downLeft = p;

	 	p = upRight;
	 	upRight = downRight;
	 	downRight = p;

	 	p = downLeft ;
	 	downLeft = downRight;
	 	downRight = p;

	 	p = upRight ;
	 	upRight = upLeft;
	 	upLeft = p;
 	}
 	if(upLeft != undefined || upRight != undefined || downRight != undefined || downLeft != undefined){
 		return true;

 	}
 	return false;
}

function changeTurns(ckc){
		if(ckc.color=="white")
	checkers = checkerBlack;
else
	checkers = checkerWhite;
 }

function checkIfLost(){
	var i;
	for(i = 1 ; i <= 12; i++)
		if(checkers[i].alive)
			return false;
	return true;
}

function  checkForMoves(){
	var i ;
	for(i = 1 ; i <= 12; i++)
		if(checkers[i].alive && showMoves(checkers[i].id)){
			eraseOptions(0);
			return false;
		}
	return true;
}

function victory() {
if(checkers[1].color == "white") {
	score.innerHTML = "White Wins!";
	victoryAudio.play();
}
else {
	score.innerHTML = "Black Wins!";
	victoryAudio.play();
}
}

function getdimension (){
	contor++;
 windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;  ;
 windowWidth =  window.innerWidth 	|| document.documentElement.clientWidth	|| document.body.clientWidth;
}

document.getElementsByTagName("BODY")[0].onresize = function(){

	getdimension();
	var cpy_screens = screens ;

if(windowWidth < 650){
		length = 50;
		deviation = 6;
		if(screens == 1) screens = -1;
	}
if(windowWidth > 650){
		length = 80;
		deviation = 10;
		if(screens == -1) screens = 1;
	}

	if(screens !=cpy_screens){
	for(var i = 1; i <= 12; i++){
		checkerBlack[i].setCoord(0,0);
		checkerWhite[i].setCoord(0,0);
	}
	}
}
