// Allen Meyer 2018
// Javascript chess logic

var $ = function(id) { return document.getElementById(id); };
var objsbyclass = function(classname) { return document.getElementsByClassName(classname); };

// Piece constructors
function copyPiece(piece) {
	switch(piece.type) {
		case "pawn":
			ret = new Pawn(piece.team, piece.location, piece.index, piece.teamindex);
			ret.hasmoved = true;
			if (piece.team == "white") {
				whitepieces[piece.teamindex] = ret;
				whitepawns[piece.index] = ret;
			} else {
				blackpieces[piece.teamindex] = ret;
				blackpawns[piece.index] = ret;
			}
			return ret;
		case "bishop":
			ret = new Bishop(piece.team, piece.location, piece.index, piece.teamindex);
			if (piece.team == "white") {
				whitepieces[piece.teamindex] = ret;
				whitebishops[piece.index] = ret;
			} else {
				blackpieces[piece.teamindex] = ret;
				blackbishops[piece.index] = ret;
			}
			return ret;
		case "rook":
			ret = new Rook(piece.team, piece.location, piece.index, piece.teamindex);
			ret.hasmoved = true;
			if (piece.team == "white") {
				whitepieces[piece.teamindex] = ret;
				whiterooks[piece.index] = ret;
			} else {
				blackpieces[piece.teamindex] = ret;
				blackrooks[piece.index] = ret;
			}
			return ret;
		case "knight":
			ret = new Knight(piece.team, piece.location, piece.index, piece.teamindex);
			if (piece.team == "white") {
				whitepieces[piece.teamindex] = ret;
				whiteknights[piece.index] = ret;
			} else {
				blackpieces[piece.teamindex] = ret;
				blackknights[piece.index] = ret;
			}
			return ret;
		case "queen":
			ret = new Queen(piece.team, piece.location, piece.index, piece.teamindex);
			if (piece.team == "white") {
				whitepieces[piece.teamindex] = ret;
				whitequeens[piece.index] = ret;
			} else {
				blackpieces[piece.teamindex] = ret;
				blackqueens[piece.index] = ret;
			}
			return ret;
		case "king":
			ret = new King(piece.team, piece.location, piece.teamindex);
			ret.hasmoved = true;
			if (piece.team == "white") {
				whitepieces[piece.teamindex] = ret;
			} else {
				blackpieces[piece.teamindex] = ret;
			}
			return ret;
	}
}

function Pawn(team, location, index, teamindex) {
	this.type = "pawn";
	this.team = team;
	this.hasmoved = false;
	this.location = location;
	this.isCaptured = false;
	this.teamindex = teamindex;
	this.index = index;
	if (team == "white") {
		this.moveableSquares = function() { return whitepawnMoveableSquares(this); };
	} else {
		this.moveableSquares = function() { return blackpawnMoveableSquares(this); };
	}
}

function Bishop(team, location, index, teamindex) {
	this.type = "bishop";
	this.team = team;
	this.hasmoved = undefined;
	this.location = location;
	this.isCaptured = false;
	this.teamindex = teamindex;
	this.index = index;
	this.moveableSquares = function() { return bishopMoveableSquares(this); };
}

function Knight(team, location, index, teamindex) {
	this.type = "knight";
	this.team = team;
	this.hasmoved = undefined;
	this.location = location;
	this.isCaptured = false;
	this.teamindex = teamindex;
	this.index = index;
	this.moveableSquares = function() { return knightMoveableSquares(this); };
}

function Rook(team, location, index, teamindex) {
	this.type = "rook";
	this.team = team;
	this.hasmoved = false;
	this.location = location;
	this.isCaptured = false;
	this.teamindex = teamindex;
	this.index = index;
	this.moveableSquares = function() { return rookMoveableSquares(this); };
}

function Queen(team, location, index, teamindex) {
	this.type = "queen";
	this.team = team;
	this.hasmoved = undefined;
	this.location = location;
	this.isCaptured = false;
	this.index = index;
	this.teamindex = teamindex;
	this.moveableSquares = function() { return queenMoveableSquares(this); };
}

function King(team, location, teamindex) {
	this.type = "king";
	this.team = team;
	this.hasmoved = false;
	this.location = location;
	this.isCaptured = false;
	this.teamindex = teamindex;
	this.moveableSquares = function() { return kingMoveableSquares(this); };
}

// Used to create a piece from pawn promotion
function Piece(type, team, location, index, teamindex) {
	var ret;
	switch(type) {
		case 'queen':
			ret = new Queen(team, location, index, teamindex);
			return ret;
		case 'rook':
			ret = new Rook(team, location, index, teamindex);
			ret.hasmoved = true;
			return ret;
		case 'bishop':
			ret = new Bishop(team, location, index, teamindex);
			return ret;
		case 'knight':
			ret = new Knight(team, location, index, teamindex);
			return ret;
	}
}

// Move constructor.
// Used to keep track of moves in the game

function Move(prevloc, newloc, Move, piece) {
	this.prevloc = prevloc;
	this.newloc = newloc;
	this.prevMove = Move;
	this.piece = piece;
}

// White pieces
var whitepieces = [];
var whitepiecescounter = 0;

var whitepawnsInitSpaces = ['12', '22', '32', '42', '52', '62', '72', '82'];
var whitepawns = [];
for (var i = 0; i < 8; i++) {
	var thiswhitepawn = new Pawn("white", whitepawnsInitSpaces[i], i, whitepiecescounter);
	whitepieces.push(thiswhitepawn);
	whitepawns.push(thiswhitepawn);
	whitepiecescounter++;
}

var whitebishopsInitSpaces = ['31', '61'];
var whitebishops = [];
for (var i = 0; i < 2; i++) {
	var thiswhitebishop = new Bishop("white", whitebishopsInitSpaces[i], i, whitepiecescounter);
	whitepieces.push(thiswhitebishop);
	whitebishops.push(thiswhitebishop);
	whitepiecescounter++;											
}

var whiterooksInitSpaces = ['11', '81'];
var whiterooks = [];
for (var i = 0; i < 2; i++) {
	var thiswhiterook = new Rook("white", whiterooksInitSpaces[i], i, whitepiecescounter);
	whitepieces.push(thiswhiterook);
	whiterooks.push(thiswhiterook);
	whitepiecescounter++;
}

var whiteknightsInitSpaces = ['21', '71'];
var whiteknights = [];
for (var i = 0; i < 2; i++) {
	var thiswhiteknight = new Knight("white", whiteknightsInitSpaces[i], i, whitepiecescounter);
	whitepieces.push(thiswhiteknight);
	whiteknights.push(thiswhiteknight);
	whitepiecescounter++;
}

var whitequeenInitSpace = ['41'];
var whitequeen = new Queen("white", whitequeenInitSpace[0], 0, whitepiecescounter);
var whitequeens = [];
whitepieces.push(whitequeen);
whitepiecescounter++;

var whitekingInitSpace = '51';
var whiteking = new King("white", whitekingInitSpace, whitepiecescounter);
whitepieces.push(whiteking);
whitepiecescounter++;

// Black pieces
var blackpieces = [];
var blackpiecescounter = 0;

var blackpawnsInitSpaces = ['17', '27', '37', '47', '57', '67', '77', '87'];
var blackpawns = [];
for (var i = 0; i < 8; i++) {
	var thisblackpawn = new Pawn("black", blackpawnsInitSpaces[i], i, blackpiecescounter);
	blackpieces.push(thisblackpawn);
	blackpawns.push(thisblackpawn);
	blackpiecescounter++;
}

var blackbishopsInitSpaces = ['38', '68'];
var blackbishops = [];
for (var i = 0; i < 2; i++) {
	var thisblackbishop = new Bishop("black", blackbishopsInitSpaces[i], i, blackpiecescounter);
	blackpieces.push(thisblackbishop);
	blackbishops.push(thisblackbishop);
	blackpiecescounter++;													
}

var blackrooksInitSpaces = ['18', '88'];
var blackrooks = [];
for (var i = 0; i < 2; i++) {
	var thisblackrook = new Rook("black", blackrooksInitSpaces[i], i, blackpiecescounter);
	blackpieces.push(thisblackrook);
	blackrooks.push(thisblackrook);
	blackpiecescounter++;
}

var blackknightsInitSpaces = ['28', '78'];
var blackknights = [];
for (var i = 0; i < 2; i++) {
	var thisblackknight = new Knight("black", blackknightsInitSpaces[i], i, blackpiecescounter);
	blackpieces.push(thisblackknight);
	blackknights.push(thisblackknight);
	blackpiecescounter++;
}

var blackqueenInitSpace = ['48'];
var blackqueens = [];
var blackqueen = new Queen("black", blackqueenInitSpace[0], 0, blackpiecescounter);
blackpieces.push(blackqueen);
blackpiecescounter++;

var blackkingInitSpace = '58';
var blackking = new King("black", blackkingInitSpace, blackpiecescounter);
blackpieces.push(blackking);
blackpiecescounter++;


// Game functionality



var whosTurn = 'white';
var status = 'playing';
var paused = true;

var prevSquares = [];
var numMoves = 0;
var prevLoc;
var selectedPiece;
var prevMove;
function checksquares(thisPiece) {
	if ((!paused || !started) &&
		((whosTurn == 'white' && thisPiece.classList.contains('whitepiece')) ||
		(whosTurn == 'black' && thisPiece.classList.contains('blackpiece')))) {
		
		var loc = thisPiece.parentElement.id;
		selectedPiece = getPieceByLocation(loc);
		// Remove dots from previously clicked piece
		clearDots();
		
		// Logic to handle whether or not to display the dots based on if
		// the user has clicked the same piece multiple times in a row.
		if (prevLoc === undefined) {
			var squares = selectedPiece.moveableSquares();
			addDots(squares);
			prevLoc = loc;
		} else {
			if (prevLoc != loc) {
				var squares = selectedPiece.moveableSquares();
				addDots(squares);
				prevLoc = loc;
			} else { 
				/* This means the user has clicked the same piece 3 or more
				 * times in a row, in which case we want the piece to be
				 * able to display its squares again on the third click. */
				prevLoc = undefined;
			}
		}
	}
}

function addDots(squares) {
	for (var i = 0; i < squares.length; i++) {
		var dot = document.createElement("img");
		dot.src = "images/dot.png";
		dot.alt = "dot";
		dot.classList.add("dot");
		dot.onclick = function() { movePiece(this); };
		dot.style.zIndex = "100";
		if (isOccupied(squares[i].id)) {
			dot.style.opacity = .5;
		}
		squares[i].appendChild(dot);
		prevSquares.push(squares[i]);
	}
}

// Returns a boolean that represents if the given king is in check
function isInCheck(king) {
	var team = king.team;
	var attackedsquares = getTeamAttackedSquares(team);
	if (attackedsquares.includes(king.location)) {
		return true;
	} else {
		return false;
	}
}

// Returns a boolean that represents if a given move puts the king in check
// input: the piece, and the square it wants to move to
// Need candidate location because it it possible the square it wants
// to move to does not put the king in check, ex. 2 bishops on the same
// diagonal
// return true if it is legal, false if it puts the king in check
function isLegalMove(piece, candidateLocation) {
	var team = piece.team;
	var oldLoc = piece.location;
	var wouldCapture = false;
	var capturedPieceTeamIndex;
	if (team == 'white') {
		if (getPieceByLocation(candidateLocation) !== undefined) { 
			if (getPieceByLocation(candidateLocation).team == 'black') { // There is a black piece here
				capturedPieceTeamIndex = getPieceByLocation(candidateLocation).teamindex;
				blackpieces[getPieceByLocation(candidateLocation).teamindex].isCaptured = true;
				whitepieces[piece.teamindex].location = candidateLocation;
				wouldCapture = true;
			}
		} else {
			whitepieces[piece.teamindex].location = candidateLocation;
		}
	} else {
		if (getPieceByLocation(candidateLocation) !== undefined) { 
			if (getPieceByLocation(candidateLocation).team == 'white') { // There is a white piece here
				capturedPieceTeamIndex = getPieceByLocation(candidateLocation).teamindex;
				whitepieces[getPieceByLocation(candidateLocation).teamindex].isCaptured = true;
				blackpieces[piece.teamindex].location = candidateLocation;
				wouldCapture = true;
			}
		} else {
			blackpieces[piece.teamindex].location = candidateLocation;
		}
	}
	king = getKing(team);
	if (isInCheck(king)) {
		if (team == 'white') {
			whitepieces[piece.teamindex].location = oldLoc;
			if (wouldCapture) {
				blackpieces[capturedPieceTeamIndex].isCaptured = false;
			}
		} else {
			blackpieces[piece.teamindex].location = oldLoc;
			if (wouldCapture) {
				whitepieces[capturedPieceTeamIndex].isCaptured = false;
			}
		}
		return false;
	} else {
		if (team == 'white') {
			whitepieces[piece.teamindex].location = oldLoc;
			if (wouldCapture) {
				blackpieces[capturedPieceTeamIndex].isCaptured = false;
			}
		} else {
			blackpieces[piece.teamindex].location = oldLoc;
			if (wouldCapture) {
				whitepieces[capturedPieceTeamIndex].isCaptured = false;
			}
		}
		return true;
	}
}

var pieceWasCaptured = false;
function movePiece(dot) {
	var square = $(dot.parentElement.id);
	var currentloc = selectedPiece.location;
	var index = selectedPiece.teamindex;
	
	var check = false;
	var castledinfo = '';
	var promotion = false;
	if (selectedPiece.type == 'pawn') {
		var index = selectedPiece.teamindex;
		if (getPieceByLocation(square.id) === undefined) {
			if (selectedPiece.location.substring(0,1) != square.id.substring(0,1) &&
				selectedPiece.location.substring(1,2) != square.id.substring(1,2)) {
				// If we get here, the pawn captured en passant
				if (selectedPiece.team == 'white') {
					var enPassantSquare = square.id.substring(0,1) + (square.id.substring(1,2) - 1).toString();
					removePiece($(enPassantSquare));
					pieceWasCaptured = true;
				} else {
					var enPassantSquare = square.id.substring(0,1) + (parseInt(square.id.substring(1,2))+1).toString();
					removePiece($(enPassantSquare));
					pieceWasCaptured = true;
				}
			}
		}
	} else if (selectedPiece.type == 'king') {
		// Check if the King can castle/is trying to castle and do so if possible
		if (canCastleKingSide(selectedPiece) || canCastleQueenSide(selectedPiece)) {
			if (selectedPiece.team == 'white') {
				if (square.id == '31') { // Queenside castle
					addPieceToSquare(copyPiece(selectedPiece), square);
					addPieceToSquare(copyPiece(getPieceByLocation('11')), $('41'));
					$(currentloc).innerHTML = '';
					$('11').innerHTML = '';
					castledinfo = 'queenside';
					prevMove = new Move(currentloc, square.id, prevMove,
						[whitepieces[selectedPiece.index], whitepieces[getPieceByLocation('41').teamindex]]);
				} else if (square.id == '71') { // Kingside castle
					addPieceToSquare(copyPiece(selectedPiece), square);
					addPieceToSquare(copyPiece(getPieceByLocation('81')), $('61'));
					$(currentloc).innerHTML = '';
					$('81').innerHTML = '';
					castledinfo = 'kingside';
					prevMove = new Move(currentloc, square.id, prevMove,
						[whitepieces[selectedPiece.index], whitepieces[getPieceByLocation('61').teamindex]]);
				}
			} else {
				if (square.id == '38') { // Queenside castle
					addPieceToSquare(copyPiece(selectedPiece), square);
					addPieceToSquare(copyPiece(getPieceByLocation('18')), $('48'));
					$(currentloc).innerHTML = '';
					$('18').innerHTML = '';
					castledinfo = 'queenside';
					prevMove = new Move(currentloc, square.id, prevMove,
						[whitepieces[selectedPiece.index], whitepieces[getPieceByLocation('48').teamindex]]);
				} else if (square.id == '78') { // Kingside castle
					addPieceToSquare(copyPiece(selectedPiece), square);
					addPieceToSquare(copyPiece(getPieceByLocation('88')), $('68'));
					$(currentloc).innerHTML = '';
					$('88').innerHTML = '';
					castledinfo = 'kingside';
					prevMove = new Move(currentloc, square.id, prevMove,
						[whitepieces[selectedPiece.index], whitepieces[getPieceByLocation('68').teamindex]]);
				}
			}
		}
	}		
				
	if (hasPiece(square) && castledinfo == '') {
		pieceWasCaptured = true;
		removePiece(square);
	}
	if (castledinfo == '') {
		//piece = copyPiece(selectedPiece);
		selectedPiece.location = square.id;
		addPieceToSquare(selectedPiece, square);
		$(currentloc).innerHTML = '';
	
		var type = selectedPiece.type;
		if (type == 'pawn') {
			if (selectedPiece.team == 'white') {
				promotion = checkPromotion(selectedPiece);
				prevMove = new Move(currentloc, square.id, prevMove, [whitepieces[index]]);
			} else {
				promotion = checkPromotion(selectedPiece);
				prevMove = new Move(currentloc, square.id, prevMove, [blackpieces[index]]);
			}
		} else {
			if (selectedPiece.team == 'white') {
				prevMove = new Move(currentloc, square.id, prevMove, [whitepieces[index]]);
			} else {
				prevMove = new Move(currentloc, square.id, prevMove, [blackpieces[index]]);
			}
		}
	}
	numMoves++;
	clearDots();
	if (!promotion) {
		recordMove(prevMove, castledinfo, undefined);
	}
	paused = false;
	started = true;
}

// Determines the status of the game, either checkmate, stalemate, or playing
function gameStatus(turn) {
	if (turn == 'white') {
		for (var i = 0; i < blackpieces.length; i++) {
			if (blackpieces[i].moveableSquares().length > 0) {
				return 'playing';
			}
		}
		if (!isInCheck(getKing('black'))) {
			return 'stalemate';
		} else {
			return 'checkmate';
		}		
	} else {
		for (var i = 0; i < whitepieces.length; i++) {
			if (whitepieces[i].moveableSquares().length > 0) {
				return 'playing';
			}
		}
		if (!isInCheck(getKing('white'))) {
			return 'stalemate';
		} else {
			return 'checkmate';
		}	
	}
}

// Adds a piece to a DOM square, used for moving pieces
// Square is the document element
// Piece is an object type like that of one created in this js file
function addPieceToSquare(piece, square) {
	var newpiece = document.createElement('img');
	var imgsrc = 'images/' + piece.team + '/' + piece.type + '.png';
	newpiece.src = imgsrc;
	var imgalt = piece.team + piece.type;
	newpiece.alt = imgalt;
	var classes = ['piece', piece.team + 'piece'];
	newpiece.classList.add(classes[0]);
	newpiece.classList.add(classes[1]);
	newpiece.onclick = function() { checksquares(this); };
	
	square.appendChild(newpiece);
	
	piece.location = square.id;
}

function removePiece(square) {
	square.removeChild(square.getElementsByClassName('piece')[0]);
	getPieceByLocation(square.id).isCaptured = true;
}

function hasPiece(square) {
	return square.getElementsByClassName('piece').length > 0;
}

function getKing(team) {
	if (team == 'white') {
		return whitepieces[15];
	} else {
		return blackpieces[15];
	}
}

function getLocationByPiece(piece) {
	return piece.location;
}

function getPieceByLocation(location) {
	// check white pieces
	for (var i = 0; i < whitepieces.length; i++) {
		if (!(whitepieces[i].isCaptured)) {
			if (location == whitepieces[i].location) {
				return whitepieces[i];
			}
		}
	}
	// check black pieces
	for (var i = 0; i < blackpieces.length; i++) {
		if (!(blackpieces[i].isCaptured)) {
			if (location == blackpieces[i].location) {
				return blackpieces[i];
			}
		}
	}
	return;
}

// Returns an array of squares a given team is being attacked by
function getTeamAttackedSquares(team) {
	if (team == 'black') {
		return getWhiteAttackedSquares();
	} else {
		return getBlackAttackedSquares();
	}
}

// Returns an array of squares that white is attacking
function getWhiteAttackedSquares() {
	var ret = [];
	for (var i = 0; i < whitepieces.length; i++) {
		if (!whitepieces[i].isCaptured) {
			var attackedsquares = getPieceAttackedSquares(whitepieces[i]);
			for (var j = 0; j < attackedsquares.length; j++) {
				if (!ret.includes(attackedsquares[j])) {
					ret.push(attackedsquares[j]);
				}
			}
		}
	}
	return ret;
}

// Returns an array of squares that black is attacking
function getBlackAttackedSquares() {
	var ret = [];
	for (var i = 0; i < blackpieces.length; i++) {
		if (!blackpieces[i].isCaptured) {
			var attackedsquares = getPieceAttackedSquares(blackpieces[i]);
			for (var j = 0; j < attackedsquares.length; j++) {
				if (!ret.includes(attackedsquares[j])) {
					ret.push(attackedsquares[j]);
				}
			}
		}
	}
	return ret;
}

function clearDots() {
	if (prevSquares.length > 0) {
		for (var i = 0; i < prevSquares.length; i++) {
			if (prevSquares[i].getElementsByClassName('dot').length > 0) {
				prevSquares[i].removeChild(prevSquares[i].getElementsByClassName('dot')[0]);
			}
		}
	}
	prevSquares = [];
}

function isOutOfBounds(location) {
	return (location.includes('9') || location.includes('-') || location.includes('0') || location.length > 2);
}

function isOppositeTeam(piece1, piece2) {
	return piece1.team != piece2.team;
}

function isOccupied(location) {
	return getPieceByLocation(location) !== undefined;
}

// Records the move on the menu to the right of the board
var moveTable = $('movedisplay');
function recordMove(move, castled, promotion) {
	var status = gameStatus(whosTurn);
	if (status == 'stalemate') {
		declareStalemate();
	} else if (status == 'checkmate') {
		declareWinner(whosTurn, 'checkmate');
	}
	
	if (whosTurn == 'white') {
		check = isInCheck(getKing('black'));
	} else {
		check = isInCheck(getKing('white'));
	}
	
	text = '';
	if (numMoves < 2 && whosTurn == 'white') {
		text += '1.   ';
		var newRow = document.createElement('tr');
		moveTable.appendChild(newRow);
	}
	var moveTableRows = moveTable.getElementsByTagName('tr');
	var currentRow = moveTableRows[moveTableRows.length-1];
	if (whosTurn == 'white' && numMoves >= 2) {
		var newRow = document.createElement('tr');
		moveTable.appendChild(newRow);
		currentRow = newRow;
		text = Math.ceil(numMoves/2) + '.   ';
	}
	var newElt = document.createElement('td');
	if (castled == 'queenside') {
		text += 'O-O-O';
	} else if (castled == 'kingside') {
		text += 'O-O';
	} else if (promotion) {
		text += getColumnByNumber(move.prevloc.substring(0,1));
		if (pieceWasCaptured) {
			text += 'x' + getColumnByNumber(promotionPiece.location.substring(0,1));
		}
		text += promotionPiece.location.substring(1,2);
		text += '=' + getPromotionNameByType(promotionPiece.type);
		promotionPiece = undefined;
	} else {
		switch(move.piece[0].type) {
			case 'pawn':
				text += getColumnByNumber(move.prevloc.substring(0,1));
				if (pieceWasCaptured) {
					text += 'x' + getColumnByNumber(move.newloc.substring(0,1)) + move.newloc.substring(1,2);
				} else {
					text += move.newloc.substring(1,2);
				}
				break;
			case 'bishop':
				text += 'B';
				var otherpieceswithmove = []; // array of other bishops that could make this move
				move.piece[0].isCaptured = true;
				if (whosTurn == 'white') {
					for (var i = 0; i < whitebishops.length; i++) {
						var squares = bishopMoveableSquares(whitebishops[i]);
						for (var j = 0; j < squares.length; j++ ) {
							if (squares[j].id == move.newloc) {
								otherpieceswithmove.push(whitebishops[i]);
							}
						}
					}
				} else {
					for (var i = 0; i < blackbishops.length; i++) {
						var squares = bishopMoveableSquares(blackbishops[i]);
						for (var j = 0; j < squares.length; j++ ) {
							if (squares[j].id == move.newloc) {
								otherpieceswithmove.push(blackbishops[i]);
							}
						}
					}
				}
				move.piece[0].isCaptured = false;
				if (otherpieceswithmove.length == 0) {
					if (pieceWasCaptured) {
						text += 'x';
					}
					text += getColumnByNumber(move.newloc.substring(0,1)) + move.newloc.substring(1,2);
				} else {
					var samecol = false;
					for (var i = 0; i < otherpieceswithmove.length; i++) {	
						if (otherpieceswithmove[i].location.substring(0,1) == move.prevloc.substring(0,1)
						 && otherpieceswithmove[i].location.substring(1,2) != move.prevloc.substring(1,2)) {
							 samecol = true;
						 }
					}
					if (samecol) {
						text += move.prevloc.substring(1,2);
					} else {
						text += getColumnByNumber(move.prevloc.substring(0,1));
					}
					if (pieceWasCaptured) {
						text += 'x';
					}
					text += getColumnByNumber(move.newloc.substring(0,1)) + move.newloc.substring(1,2);
				}
				break;
			case 'knight':
				text += 'N';
				var otherpieceswithmove = []; // array of other knights that could make this move
				move.piece[0].isCaptured = true;
				if (whosTurn == 'white') {
					for (var i = 0; i < whiteknights.length; i++) {
						var squares = knightMoveableSquares(whiteknights[i]);
						for (var j = 0; j < squares.length; j++ ) {
							if (squares[j].id == move.newloc) {
								otherpieceswithmove.push(whiteknights[i]);
							}
						}
					}
				} else {
					for (var i = 0; i < blackknights.length; i++) {
						var squares = knightMoveableSquares(blackknights[i]);
						for (var j = 0; j < squares.length; j++ ) {
							if (squares[j].id == move.newloc) {
								otherpieceswithmove.push(blackknights[i]);
							}
						}
					}
				}
				move.piece[0].isCaptured = false;
				if (otherpieceswithmove.length == 0) {
					if (pieceWasCaptured) {
						text += 'x';
					}
					text += getColumnByNumber(move.newloc.substring(0,1)) + move.newloc.substring(1,2);
				} else {
					var samecol = false;
					for (var i = 0; i < otherpieceswithmove.length; i++) {	
						if (otherpieceswithmove[i].location.substring(0,1) == move.prevloc.substring(0,1)
						 && otherpieceswithmove[i].location.substring(1,2) != move.prevloc.substring(1,2)) {
							 samecol = true;
						 }
					}
					if (samecol) {
						text += move.prevloc.substring(1,2);
					} else {
						text += getColumnByNumber(move.prevloc.substring(0,1));
					}
					if (pieceWasCaptured) {
						text += 'x';
					}
					text += getColumnByNumber(move.newloc.substring(0,1)) + move.newloc.substring(1,2);
				}
				break;
			case 'rook':
				text += 'R';
				var otherpieceswithmove = []; // array of other rooks that could make this move
				move.piece[0].isCaptured = true;
				if (whosTurn == 'white') {
					for (var i = 0; i < whiterooks.length; i++) {
						var squares = rookMoveableSquares(whiterooks[i]);
						for (var j = 0; j < squares.length; j++ ) {
							if (squares[j].id == move.newloc) {
								otherpieceswithmove.push(whiterooks[i]);
							}
						}
					}
				} else {
					for (var i = 0; i < blackrooks.length; i++) {
						var squares = rookMoveableSquares(blackrooks[i]);
						for (var j = 0; j < squares.length; j++ ) {
							if (squares[j].id == move.newloc) {
								otherpieceswithmove.push(blackrooks[i]);
							}
						}
					}
				}
				move.piece[0].isCaptured = false;
				if (otherpieceswithmove.length == 0) {
					if (pieceWasCaptured) {
						text += 'x';
					}
					text += getColumnByNumber(move.newloc.substring(0,1)) + move.newloc.substring(1,2);
				} else {
					var samecol = false;
					for (var i = 0; i < otherpieceswithmove.length; i++) {	
						if (otherpieceswithmove[i].location.substring(0,1) == move.prevloc.substring(0,1)
						 && otherpieceswithmove[i].location.substring(1,2) != move.prevloc.substring(1,2)) {
							 samecol = true;
						 }
					}
					if (samecol) {
						text += move.prevloc.substring(1,2);
					} else {
						text += getColumnByNumber(move.prevloc.substring(0,1));
					}
					if (pieceWasCaptured) {
						text += 'x';
					}
					text += getColumnByNumber(move.newloc.substring(0,1)) + move.newloc.substring(1,2);
				}
				break;
			case 'queen':
				text += 'Q';
				var otherpieceswithmove = []; // array of other queens that could make this move
				move.piece[0].isCaptured = true;
				if (whosTurn == 'white') {
					for (var i = 0; i < whitequeens.length; i++) {
						var squares = queenMoveableSquares(whitequeens[i]);
						for (var j = 0; j < squares.length; j++ ) {
							if (squares[j].id == move.newloc) {
								otherpieceswithmove.push(whitequeens[i]);
							}
						}
					}
				} else {
					for (var i = 0; i < blackqueens.length; i++) {
						var squares = queenMoveableSquares(blackqueens[i]);
						for (var j = 0; j < squares.length; j++ ) {
							if (squares[j].id == move.newloc) {
								otherpieceswithmove.push(blackqueens[i]);
							}
						}
					}
				}
				move.piece[0].isCaptured = false;
				if (otherpieceswithmove.length == 0) {
					if (pieceWasCaptured) {
						text += 'x';
					}
					text += getColumnByNumber(move.newloc.substring(0,1)) + move.newloc.substring(1,2);
				} else {
					var samecol = false;
					for (var i = 0; i < otherpieceswithmove.length; i++) {	
						if (otherpieceswithmove[i].location.substring(0,1) == move.prevloc.substring(0,1)
						 && otherpieceswithmove[i].location.substring(1,2) != move.prevloc.substring(1,2)) {
							 samecol = true;
						 }
					}
					if (samecol) {
						text += move.prevloc.substring(1,2);
					} else {
						text += getColumnByNumber(move.prevloc.substring(0,1));
					}
					if (pieceWasCaptured) {
						text += 'x';
					}
					text += getColumnByNumber(move.newloc.substring(0,1)) + move.newloc.substring(1,2);
				}
				break;
			case 'king':
				text += 'K';
				if (pieceWasCaptured) {
					text += 'x';
				}
				text += getColumnByNumber(move.newloc.substring(0,1)) + move.newloc.substring(1,2);
				break;
		}
	}
	if (status == 'checkmate') {
		text += '#';
	} else if (status == 'stalemate') {
		text += '&#189'; // 1/2 symbol
	} else { // status == 'playing'
		if (whosTurn == 'white') {
			if (isInCheck(getKing('black'))) {
				text += '+';
			}
		} else {
			if (isInCheck(getKing('white'))) {
				text += '+';
			}
		}
	}
	var newText = document.createTextNode(text);
	newElt.appendChild(newText);
	currentRow.appendChild(newElt);
	
	pieceWasCaptured = false;
	if (whosTurn == 'white') {
		whosTurn = 'black';
	} else {
		whosTurn = 'white';
	}
}

function getPromotionNameByType(type) {
	switch(type) {
		case 'queen': return 'Q';
		case 'knight': return 'N';
		case 'bishop': return 'B';
		case 'rook': return 'R';
	}
}

function getColumnByNumber(num) {
	switch(num) {
		case '1': return 'a';
		case '2': return 'b';
		case '3': return 'c';
		case '4': return 'd';
		case '5': return 'e';
		case '6': return 'f';
		case '7': return 'g';
		case '8': return 'h';
	}
}

// Returns an array of the squares a given piece is attacking
function getPieceAttackedSquares(piece) {
	switch (piece.type) {
		case 'pawn':
			if (piece.team == 'white') {
				return whitepawnAttackedSquares(piece);
			} else {
				return blackpawnAttackedSquares(piece);
			}
		case 'knight':
			return knightAttackedSquares(piece);
		case 'bishop':
			return bishopAttackedSquares(piece);
		case 'rook':
			return rookAttackedSquares(piece);
		case 'queen':
			return queenAttackedSquares(piece);
		case 'king':
			return kingAttackedSquares(piece);
	}
}

function blackpawnMoveableSquares(pawn) {
	if (!pawn.isCaptured) {
		var squares = [];
		if (pawn.hasmoved) {
			var testsquareloc = pawn.location.substring(0,1) + (pawn.location.substring(1,2) - 1).toString()
			var testsquare = $(testsquareloc);
			if (!isOccupied(testsquareloc)) {
				if (isLegalMove(pawn, testsquareloc)) {
					squares.push(testsquare);
				}
			}
			var enPassantSquare = captureEnPassantSquares(pawn);
			if (enPassantSquare !== undefined) {
				squares.push($(enPassantSquare));
			}
		} else {
			var testsquare1loc = pawn.location.substring(0,1) + (pawn.location.substring(1,2) - 1).toString()
			var testsquare1 = $(testsquare1loc);
			if (!isOccupied(testsquare1loc)) {
				if (isLegalMove(pawn, testsquare1loc)) {
					squares.push(testsquare1);
					var testsquare2loc = pawn.location.substring(0,1) + (pawn.location.substring(1,2) - 2).toString();
					var testsquare2 = $(testsquare2loc);
					if (!isOccupied(testsquare2loc)) {	
						if (isLegalMove(pawn, testsquare2loc)) {
							squares.push(testsquare2);
						}
					}
				}
			}
		}
		var capturesquare1loc = (parseInt(pawn.location.substring(0,1),10) - 1).toString() + (pawn.location.substring(1,2) - 1).toString();
		var capturesquare1 = $(capturesquare1loc);
		if (!isOutOfBounds(capturesquare1loc)) {
			if (isOccupied(capturesquare1loc)) {
				if (isOppositeTeam(pawn, getPieceByLocation(capturesquare1loc))) {
					if (isLegalMove(pawn, capturesquare1loc)) {				
						squares.push(capturesquare1);
					}
				}
			}
		}
		var capturesquare2loc = (parseInt(pawn.location.substring(0,1), 10) + 1).toString() + (pawn.location.substring(1,2) - 1).toString();
		var capturesquare2 = $(capturesquare2loc);
		if (!isOutOfBounds(capturesquare2loc)) {
			if (isOccupied(capturesquare2loc)) {
				if (isOppositeTeam(pawn, getPieceByLocation(capturesquare2loc))) {
					if (isLegalMove(pawn, capturesquare1loc)) {
						squares.push(capturesquare2);
					}
				}
			}
		}
		return squares;
	}
	return [];
}

// returns an array of squares that a given black pawn is attacking
function blackpawnAttackedSquares(pawn) {
	var attackedsquares = [];
	
	var capturesquare1loc = (parseInt(pawn.location.substring(0,1),10) - 1).toString() + (pawn.location.substring(1,2) - 1).toString();
	if (!isOutOfBounds(capturesquare1loc)) {
		attackedsquares.push(capturesquare1loc);
	}
	var capturesquare2loc = (parseInt(pawn.location.substring(0,1), 10) + 1).toString() + (pawn.location.substring(1,2) - 1).toString();
	if (!isOutOfBounds(capturesquare2loc)) {
		attackedsquares.push(capturesquare2loc);
	}
	return attackedsquares;
}

function whitepawnMoveableSquares(pawn) {
	if (!pawn.isCaptured) {
		var squares = [];
		if (pawn.hasmoved) {
			var testsquareloc = pawn.location.substring(0,1) + (parseInt(pawn.location.substring(1,2), 10) + 1).toString();
			var testsquare = $(testsquareloc);
			if (!isOccupied(testsquareloc)) {	
				if (isLegalMove(pawn, testsquareloc)) {
					squares.push(testsquare);
				}
			}
			var enPassantSquare = captureEnPassantSquares(pawn);
			if (enPassantSquare !== undefined) {
				squares.push($(enPassantSquare));
			}
		} else {
			var testsquare1loc = pawn.location.substring(0,1) + (parseInt(pawn.location.substring(1,2), 10) + 1).toString()
			var testsquare1 = $(testsquare1loc);
			if (!isOccupied(testsquare1loc)) {	
				if (isLegalMove(pawn, testsquare1loc)) {
					squares.push(testsquare1);
					var testsquare2loc = pawn.location.substring(0,1) + (parseInt(pawn.location.substring(1,2), 10) + 2).toString();
					var testsquare2 = $(testsquare2loc);
					if (!isOccupied(testsquare2loc)) {
						if (isLegalMove(pawn, testsquare2loc)) {
							squares.push(testsquare2);
						}
					}
				}
			}
		}	
		
		var capturesquare1loc = (pawn.location.substring(0,1) - 1).toString() + (parseInt(pawn.location.substring(1,2), 10) + 1).toString();
		var capturesquare1 = $(capturesquare1loc);
		if (!isOutOfBounds(capturesquare1loc)) {
			if (isOccupied(capturesquare1loc)) {	
				if (isOppositeTeam(pawn, getPieceByLocation(capturesquare1loc))) {	
					if (isLegalMove(pawn, capturesquare1loc)) {
						squares.push(capturesquare1);
					}
				}
			}
		}
		var capturesquare2loc = (parseInt(pawn.location.substring(0,1), 10) + 1).toString() + (parseInt(pawn.location.substring(1,2),10) + 1).toString();
		var capturesquare2 = $(capturesquare2loc);
		if (!isOutOfBounds(capturesquare2loc)) {
			if (isOccupied(capturesquare2loc)) {	
				if (isOppositeTeam(pawn, getPieceByLocation(capturesquare2loc))) {	
					if (isLegalMove(pawn, capturesquare2loc)) {
						squares.push(capturesquare2);
					}
				}
			}
		}
		return squares;
	}
	return [];
}

// returns an array of squares that a given white pawn is attacking
function whitepawnAttackedSquares(pawn) {
	var attackedsquares = [];
	
	var capturesquare1loc = (pawn.location.substring(0,1) - 1).toString() + (parseInt(pawn.location.substring(1,2), 10) + 1).toString();
	if (!isOutOfBounds(capturesquare1loc)) {
		attackedsquares.push(capturesquare1loc);
	}
	var capturesquare2loc = (parseInt(pawn.location.substring(0,1), 10) + 1).toString() + (parseInt(pawn.location.substring(1,2),10) + 1).toString();
	if (!isOutOfBounds(capturesquare2loc)) {
		attackedsquares.push(capturesquare2loc);
	}
	return attackedsquares;
}

// check if a pawn can capture 'en passant', return the square(s) it can if so
function captureEnPassantSquares(pawn) {
	if (pawn.team == 'white' && pawn.location.substring(1,2) == '5') {
		prevMovedPiece = prevMove.piece[0];
		if (prevMovedPiece.type == 'pawn') {
			if (prevMove.prevloc.substring(1,2) == '7' && prevMove.newloc.substring(1,2) == '5') {
				var enPassantSquare = prevMove.newloc.substring(0,1) + (parseInt(prevMove.newloc.substring(1,2)) + 1).toString();
				prevMovedPiece.isCaptured = true;
				if (isLegalMove(pawn, enPassantSquare)) {
					prevMovedPiece.isCaptured = false;
					return enPassantSquare;
				} else {
					prevMovedPiece.isCaptured = false;
					return;
				}
			} else {
				return;
			}
		} else {
			return;
		}
	} else if (pawn.team == 'black' && pawn.location.substring(1,2) == '4') {
		prevMovedPiece = prevMove.piece[0];
		if (prevMovedPiece.type == 'pawn') {
			if (prevMove.prevloc.substring(1,2) == '2' && prevMove.newloc.substring(1,2) == '4') {
				prevMovedPiece.isCaptured = true;
				var enPassantSquare = prevMove.newloc.substring(0,1) + (prevMove.newloc.substring(1,2) - 1).toString();
				if (isLegalMove(pawn, enPassantSquare)) {
					prevMovedPiece.isCaptured = false;
					return enPassantSquare;
				} else {
					prevMovedPiece.isCaptured = false;
					return;
				}
			} else {
				return;
			}
		} else {
			return;
		}
	} else {
		return;
	}
}

// checks if a pawn should be promoted
var promotionPiece;
function checkPromotion(pawn) {
	if (pawn.team == 'white') {
		if (pawn.location.substring(1,2) == '8') { // Promote
			$('promotionmenu').style.visibility = 'visible';
			promotionPiece = pawn;
			return true;
		}
	} else {
		if (pawn.location.substring(1,2) == '1') { // Promote
			$('promotionmenu').style.visibility= 'visible';
			promotionPiece = pawn;
			return true;
		}
	}
}

function promotePiece() {
	$('promotionmenu').style.visibility = 'visible';
	var promotionType;
	var team = selectedPiece.team;
	var typesArray = document.getElementsByName('type');
	for (var i = 0; i < typesArray.length; i++) {
		if (typesArray[i].checked) {
			promotionType = typesArray[i].value;
		}
	}
	if (team) {
		var newPiece = new Piece(promotionType, 'white', selectedPiece.location, 0, whitepieces.length);
		whitepieces.push(newPiece);
		addPieceToTeamPieceArray(newPiece);
		whitepiecescounter++;
		removePiece($(selectedPiece.location));
		addPieceToSquare(newPiece, $(newPiece.location));
	} else {
		var newPiece = new Piece(promotionType, 'black', selectedPiece.location, 0, blackpieces.length);
		blackpieces.push(newPiece);
		addPieceToTeamPieceArray(newPiece);
		blackpiecescounter++;
		removePiece($(selectedPiece.location));
		addPieceToSquare(newPiece, $(newPiece.location));
	}
	
	// Clear the radio inputs and make the menu disappear
	for (var i = 0; i < typesArray.length; i++) {
		if (typesArray[i].checked) {
			typesArray[i].checked = false;
		}
	}
	recordMove(prevMove, '', true);
	$('promotionmenu').style.visibility = 'hidden';
}

function addPieceToTeamPieceArray(piece) {
	switch(piece.type) {
		case 'knight':
			if (piece.team == 'white') {
				piece.index = whiteknights.length;
				whiteknights.push(piece);
			} else {
				piece.index = blackknights.length;
				blackknights.push(piece);
			}
			return;
		case 'bishop':
			if (piece.team == 'white') {
				piece.index = whitebishops.length;
				whitebishops.push(piece);
			} else {
				piece.index = blackbishops.length;
				blackbishops.push(piece);
			}
			return;
		case 'rook':
			if (piece.team == 'white') {
				piece.index = whiterooks.length;
				whiterooks.push(piece);
			} else {
				piece.index = blackrooks.length;
				blackrooks.push(piece);
			}
			return;
		case 'queen':
			if (piece.team == 'white') {
				piece.index = whitequeens.length;
				whitequeens.push(piece);
			} else {
				piece.index = blackqueens.length;
				blackqueens.push(piece);
			}
			return;
	}
}

function bishopMoveableSquares(bishop) {
	if (!bishop.isCaptured) {
		var loc = bishop.location;
		var squares = [];
		
		var testloc = (parseInt(loc.substring(0,1), 10) + 1).toString() + (parseInt(loc.substring(1,2), 10) + 1);
		var testsquare = $(testloc);
		// Check squares in increasing row&col order
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(bishop, getPieceByLocation(testloc))){
					if (isLegalMove(bishop, testloc)) {
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			} else {
				if (isLegalMove(bishop, testloc)) {
					squares.push(testsquare);
				}
			}
					
			// Increment
			testloc = (parseInt(testloc.substring(0,1), 10) + 1).toString() + (parseInt(testloc.substring(1,2), 10) + 1);
			testsquare = $(testloc);
		}
		// Check squares in increasing row order & decreasing col order
		testloc = (parseInt(loc.substring(0,1), 10) - 1).toString() + (parseInt(loc.substring(1,2), 10) + 1);
		testsquare = $(testloc);
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(bishop, getPieceByLocation(testloc))){
					if (isLegalMove(bishop, testloc)) {
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			} else {
				if (isLegalMove(bishop, testloc)) {
					squares.push(testsquare);
				}
			}
			
			testloc = (parseInt(testloc.substring(0,1), 10) - 1).toString() + (parseInt(testloc.substring(1,2), 10) + 1);
			testsquare = $(testloc);
		}
		// Check squares in decreasing row order & increasing col order
		testloc = (parseInt(loc.substring(0,1), 10) + 1).toString() + (parseInt(loc.substring(1,2), 10) - 1);
		testsquare = $(testloc);
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(bishop, getPieceByLocation(testloc))){
					if (isLegalMove(bishop, testloc)) {
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			} else {
				if (isLegalMove(bishop, testloc)) {
					squares.push(testsquare);
				}
			}
					
			testloc = (parseInt(testloc.substring(0,1), 10) + 1).toString() + (parseInt(testloc.substring(1,2), 10) - 1);
			testsquare = $(testloc);
		}
		// Finally, check squares in decreasing row&col order
		testloc = (parseInt(loc.substring(0,1), 10) - 1).toString() + (parseInt(loc.substring(1,2), 10) - 1);
		testsquare = $(testloc);
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(bishop, getPieceByLocation(testloc))){
					if (isLegalMove(bishop, testloc)) {	
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				} 
			} else {
				if (isLegalMove(bishop, testloc)) {
					squares.push(testsquare);
				}
			}
			
					
			testloc = (parseInt(testloc.substring(0,1), 10) - 1).toString() + (parseInt(testloc.substring(1,2), 10) - 1);
			testsquare = $(testloc);
		}
		return squares;
	}
	return [];
}

// Returns an array of squares a given bishop is attacking
function bishopAttackedSquares(bishop) {
	var attackedsquares = [];
	var loc = bishop.location;
	
	// Check squares in increasing row&col order
	var testloc = (parseInt(loc.substring(0,1), 10) + 1).toString() + (parseInt(loc.substring(1,2), 10) + 1);
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' && 
				isOppositeTeam(bishop, getPieceByLocation(testloc))) {
				attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
				
		// Increment
		testloc = (parseInt(testloc.substring(0,1), 10) + 1).toString() + (parseInt(testloc.substring(1,2), 10) + 1);
	}
	
	// Check squares in increasing row order & decreasing col order
	testloc = (parseInt(loc.substring(0,1), 10) - 1).toString() + (parseInt(loc.substring(1,2), 10) + 1);
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' && 
				isOppositeTeam(bishop, getPieceByLocation(testloc))) {
				attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
		
		testloc = (parseInt(testloc.substring(0,1), 10) - 1).toString() + (parseInt(testloc.substring(1,2), 10) + 1);
	}
	
	// Check squares in decreasing row order & increasing col order
	testloc = (parseInt(loc.substring(0,1), 10) + 1).toString() + (parseInt(loc.substring(1,2), 10) - 1);
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' && 
				isOppositeTeam(bishop, getPieceByLocation(testloc))) {
				attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
				
		testloc = (parseInt(testloc.substring(0,1), 10) + 1).toString() + (parseInt(testloc.substring(1,2), 10) - 1);
	}
	// Finally, check squares in decreasing row&col order
	testloc = (parseInt(loc.substring(0,1), 10) - 1).toString() + (parseInt(loc.substring(1,2), 10) - 1);
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' && 
				isOppositeTeam(bishop, getPieceByLocation(testloc))) {
				attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
				
		testloc = (parseInt(testloc.substring(0,1), 10) - 1).toString() + (parseInt(testloc.substring(1,2), 10) - 1);
	}
	return attackedsquares;
}

function knightMoveableSquares(knight) {
	if (!knight.isCaptured) {
		var squares = [];
		var loc = knight.location;
		
		// Square up 2, right 1
		var square1loc = (parseInt(loc.substring(0,1),10) + 1).toString() + (parseInt(loc.substring(1,2),10)+2).toString();
		var square1 = $(square1loc);
		if (!isOutOfBounds(square1loc)) {
			if (isLegalMove(knight, square1loc)) {
				if (isOccupied(square1loc)) {
					if (isOppositeTeam(knight, getPieceByLocation(square1loc))) {
						squares.push(square1);
					}
				} else {
					squares.push(square1);
				}
			}
		}
		
		// Square up 2, left 1
		var square2loc = (loc.substring(0,1)-1).toString() + (parseInt(loc.substring(1,2),10)+2).toString();
		var square2 = $(square2loc);
		if (!isOutOfBounds(square2loc)) {
			if (isLegalMove(knight, square2loc)) {
				if (isOccupied(square2loc)) {
					if (isOppositeTeam(knight, getPieceByLocation(square2loc))) {
						squares.push(square2);
					}
				} else {
					squares.push(square2);
				}
			}
		}
		
		// Square up 1, right 2
		var square3loc = (parseInt(loc.substring(0,1),10)+2).toString() + (parseInt(loc.substring(1,2),10)+1).toString();
		var square3 = $(square3loc);
		if (!isOutOfBounds(square3loc)) {
			if (isLegalMove(knight, square3loc)) {
				if (isOccupied(square3loc)) {
					if (isOppositeTeam(knight, getPieceByLocation(square3loc))) {
						squares.push(square3);
					}
				} else {
					squares.push(square3);
				}
			}
		}
		
		// Square up 1, left 2
		var square4loc = (loc.substring(0,1)-2).toString() + (parseInt(loc.substring(1,2),10)+1).toString();
		var square4 = $(square4loc);
		if (!isOutOfBounds(square4loc)) {
			if (isLegalMove(knight, square4loc)) {
				if (isOccupied(square4loc)) {
					if (isOppositeTeam(knight, getPieceByLocation(square4loc))) {
						squares.push(square4);
					}
				} else {
					squares.push(square4);
				}
			}
		}
		
		// Square down 2, right 1
		var square5loc = (parseInt(loc.substring(0,1),10)+1).toString() + (loc.substring(1,2)-2).toString();
		var square5 = $(square5loc);
		if (!isOutOfBounds(square5loc)) {
			if (isLegalMove(knight, square5loc)) {
				if (isOccupied(square5loc)) {
					if (isOppositeTeam(knight, getPieceByLocation(square5loc))) {
						squares.push(square5);
					}
				} else {
					squares.push(square5);
				}
			}
		}
		
		// Square down 2, left 1
		var square6loc = (loc.substring(0,1)-1).toString() + (loc.substring(1,2)-2).toString();
		var square6 = $(square6loc);
		if (!isOutOfBounds(square6loc)) {
			if (isLegalMove(knight, square4loc)) {
				if (isOccupied(square6loc)) {
					if (isOppositeTeam(knight, getPieceByLocation(square6loc))) {
						squares.push(square6);
					}
				} else {
					squares.push(square6);
				}
			}
		}
		
		// Square down 1, right 2
		var square7loc = (parseInt(loc.substring(0,1),10)+2).toString() + (loc.substring(1,2)-1).toString();
		var square7 = $(square7loc);
		if (!isOutOfBounds(square7loc)) {
			if (isLegalMove(knight, square4loc)) {
				if (isOccupied(square7loc)) {
					if (isOppositeTeam(knight, getPieceByLocation(square7loc))) {
						squares.push(square7);
					}
				} else {
					squares.push(square7);
				}
			}
		}
		
		// Square down 1, left 2
		var square8loc = (loc.substring(0,1)-2).toString() + (loc.substring(1,2)-1).toString();
		var square8 = $(square8loc);
		if (!isOutOfBounds(square8loc)) {
			if (isLegalMove(knight, square4loc)) {
				if (isOccupied(square8loc)) {
					if (isOppositeTeam(knight, getPieceByLocation(square8loc))) {
						squares.push(square8);
					}
				} else {
					squares.push(square8);
				}
			}
		}
		
		return squares;
	}
	return [];
}

// Returns an array of squares a given knight is attacking
function knightAttackedSquares(knight) {
	var attackedsquares = [];
	var loc = knight.location;
	
	// Square up 2, right 1
	var square1loc = (parseInt(loc.substring(0,1),10) + 1).toString() + (parseInt(loc.substring(1,2),10)+2).toString();
	if (!isOutOfBounds(square1loc)) {
		attackedsquares.push(square1loc);
	}
	
	// Square up 2, left 1
	var square2loc = (loc.substring(0,1)-1).toString() + (parseInt(loc.substring(1,2),10)+2).toString();
	if (!isOutOfBounds(square2loc)) {
		attackedsquares.push(square2loc);
	}
	
	// Square up 1, right 2
	var square3loc = (parseInt(loc.substring(0,1),10)+2).toString() + (parseInt(loc.substring(1,2),10)+1).toString();
	if (!isOutOfBounds(square3loc)) {
		attackedsquares.push(square3loc);
	}
	
	// Square up 1, left 2
	var square4loc = (loc.substring(0,1)-2).toString() + (parseInt(loc.substring(1,2),10)+1).toString();
	if (!isOutOfBounds(square4loc)) {
		attackedsquares.push(square4loc);
	}
	
	// Square down 2, right 1
	var square5loc = (parseInt(loc.substring(0,1),10)+1).toString() + (loc.substring(1,2)-2).toString();
	if (!isOutOfBounds(square5loc)) {
		attackedsquares.push(square5loc);
	}
	
	// Square down 2, left 1
	var square6loc = (loc.substring(0,1)-1).toString() + (loc.substring(1,2)-2).toString();
	if (!isOutOfBounds(square6loc)) {
		attackedsquares.push(square6loc);
	}
	
	// Square down 1, right 2
	var square7loc = (parseInt(loc.substring(0,1),10)+2).toString() + (loc.substring(1,2)-1).toString();
	if (!isOutOfBounds(square7loc)) {
		attackedsquares.push(square7loc);
	}
	
	// Square down 1, left 2
	var square8loc = (loc.substring(0,1)-2).toString() + (loc.substring(1,2)-1).toString();
	if (!isOutOfBounds(square8loc)) {
		attackedsquares.push(square8loc);
	}
	
	return attackedsquares;
}

function rookMoveableSquares(rook) {
	if (!rook.isCaptured) {
		var squares = [];
		var loc = rook.location;
		
		// Check squares to left
		var testloc = (loc.substring(0,1)-1).toString() + loc.substring(1,2);
		var testsquare = $(testloc);
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(rook, getPieceByLocation(testloc))) {
					if (isLegalMove(rook, testloc)) {
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			} else {
				if (isLegalMove(rook, testloc)) {
					squares.push(testsquare);
				}
			}
			
			testloc = (testloc.substring(0,1)-1).toString() + testloc.substring(1,2);
			testsquare = $(testloc);
		}
		
		// Check squares to right
		testloc = (parseInt(loc.substring(0,1),10)+1).toString() + loc.substring(1,2);
		var testsquare = $(testloc);
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(rook, getPieceByLocation(testloc))) {
					if (isLegalMove(rook, testloc)) {
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			} else {
				if (isLegalMove(rook, testloc)) {
					squares.push(testsquare);
				}
			}
			
			testloc = (parseInt(testloc.substring(0,1),10)+1).toString() + testloc.substring(1,2);
			testsquare = $(testloc);
		}
		
		// Check squares above
		testloc = loc.substring(0,1) + (parseInt(loc.substring(1,2),10)+1).toString();
		var testsquare = $(testloc);
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(rook, getPieceByLocation(testloc))) {
					if (isLegalMove(rook, testloc)) {
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			} else {
				if (isLegalMove(rook, testloc)) {
					squares.push(testsquare);
				}
			}
			
			testloc = testloc.substring(0,1) + (parseInt(testloc.substring(1,2),10)+1);
			testsquare = $(testloc);
		}
		
		// Check squares below
		testloc = loc.substring(0,1) + (parseInt(loc.substring(1,2),10)-1);
		var testsquare = $(testloc);
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(rook, getPieceByLocation(testloc))) {
					if (isLegalMove(rook, testloc)) {
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			} else {
				if (isLegalMove(rook, testloc)) {
					squares.push(testsquare);
				}
			}
			
			testloc = testloc.substring(0,1) + (parseInt(testloc.substring(1,2),10)-1);
			testsquare = $(testloc);
		}
		
		return squares;
	}
	return [];
}

// Returns an array of squares that a given rook is attacking
function rookAttackedSquares(rook) {
	var attackedsquares = [];
	var loc = rook.location;
	
	// Check squares to left
	var testloc = (loc.substring(0,1)-1).toString() + loc.substring(1,2);
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' &&
				isOppositeTeam(rook, getPieceByLocation(testloc))) {
					attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
		
		testloc = (testloc.substring(0,1)-1).toString() + testloc.substring(1,2);
	}
	
	// Check squares to right
	testloc = (parseInt(loc.substring(0,1),10)+1).toString() + loc.substring(1,2);
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' &&
				isOppositeTeam(rook, getPieceByLocation(testloc))) {
					attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
		
		testloc = (parseInt(testloc.substring(0,1),10)+1).toString() + testloc.substring(1,2);
	}
	
	// Check squares above
	testloc = loc.substring(0,1) + (parseInt(loc.substring(1,2),10)+1).toString();
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' &&
				isOppositeTeam(rook, getPieceByLocation(testloc))) {
					attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
		
		testloc = testloc.substring(0,1) + (parseInt(testloc.substring(1,2),10)+1);
	}
	
	// Check squares below
	testloc = loc.substring(0,1) + (parseInt(loc.substring(1,2),10)-1);
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' &&
				isOppositeTeam(rook, getPieceByLocation(testloc))) {
					attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
		
		testloc = testloc.substring(0,1) + (parseInt(testloc.substring(1,2),10)-1);
	}
	
	return attackedsquares;
}

function queenMoveableSquares(queen) {
	if (!queen.isCaptured) {
		var loc = queen.location;
		var squares = [];
		
		// Check squares to left
		var testloc = (loc.substring(0,1)-1).toString() + loc.substring(1,2);
		var testsquare = $(testloc);
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(queen, getPieceByLocation(testloc))) {
					if (isLegalMove(queen, testloc)) {
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			} else {
				if (isLegalMove(queen, testloc)) {
					squares.push(testsquare);
				}
			}
			
			testloc = (testloc.substring(0,1)-1).toString() + testloc.substring(1,2);
			testsquare = $(testloc);
		}
		
		// Check squares to right
		testloc = (parseInt(loc.substring(0,1),10)+1).toString() + loc.substring(1,2);
		var testsquare = $(testloc);
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(queen, getPieceByLocation(testloc))) {
					if (isLegalMove(queen, testloc)) {
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			} else {
				if (isLegalMove(queen, testloc)) {
					squares.push(testsquare);
				}
			}
			
			testloc = (parseInt(testloc.substring(0,1),10)+1).toString() + testloc.substring(1,2);
			testsquare = $(testloc);
		}
		
		// Check squares above
		testloc = loc.substring(0,1) + (parseInt(loc.substring(1,2),10)+1).toString();
		var testsquare = $(testloc);
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(queen, getPieceByLocation(testloc))) {
					if (isLegalMove(queen, testloc)) {
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			} else {
				if (isLegalMove(queen, testloc)) {
					squares.push(testsquare);
				}
			}
			
			testloc = testloc.substring(0,1) + (parseInt(testloc.substring(1,2),10)+1);
			testsquare = $(testloc);
		}
		
		// Check squares below
		testloc = loc.substring(0,1) + (parseInt(loc.substring(1,2),10)-1);
		var testsquare = $(testloc);
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(queen, getPieceByLocation(testloc))) {
					if (isLegalMove(queen, testloc)) {
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			} else {
				if (isLegalMove(queen, testloc)) {
					squares.push(testsquare);
				}
			}
			
			testloc = testloc.substring(0,1) + (parseInt(testloc.substring(1,2),10)-1);
			testsquare = $(testloc);
		}
		
		testloc = (parseInt(queen.location.substring(0,1), 10) + 1).toString() + (parseInt(queen.location.substring(1,2), 10) + 1);
		var testsquare = $(testloc);
		// Check squares in increasing row&col order
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(queen, getPieceByLocation(testloc))){
					if (isLegalMove(queen, testloc)) {
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			} else {
				if (isLegalMove(queen, testloc)) {
					squares.push(testsquare);
				}
			}
					
			// Increment
			testloc = (parseInt(testloc.substring(0,1), 10) + 1).toString() + (parseInt(testloc.substring(1,2), 10) + 1);
			testsquare = $(testloc);
		}
		// Check squares in increasing row order & decreasing col order
		testloc = (parseInt(queen.location.substring(0,1), 10) - 1).toString() + (parseInt(queen.location.substring(1,2), 10) + 1);
		testsquare = $(testloc);
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(queen, getPieceByLocation(testloc))){
					if (isLegalMove(queen, testloc)) {
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			} else {
				if (isLegalMove(queen, testloc)) {
					squares.push(testsquare);
				}
			}
			
			testloc = (parseInt(testloc.substring(0,1), 10) - 1).toString() + (parseInt(testloc.substring(1,2), 10) + 1);
			testsquare = $(testloc);
		}
		// Check squares in decreasing row order & increasing col order
		testloc = (parseInt(queen.location.substring(0,1), 10) + 1).toString() + (parseInt(queen.location.substring(1,2), 10) - 1);
		testsquare = $(testloc);
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(queen, getPieceByLocation(testloc))){
					if (isLegalMove(queen, testloc)) {
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			} else {
				if (isLegalMove(queen, testloc)) {
					squares.push(testsquare);
				}
			}
					
			testloc = (parseInt(testloc.substring(0,1), 10) + 1).toString() + (parseInt(testloc.substring(1,2), 10) - 1);
			testsquare = $(testloc);
		}
		// Finally, check squares in decreasing row&col order
		testloc = (parseInt(queen.location.substring(0,1), 10) - 1).toString() + (parseInt(queen.location.substring(1,2), 10) - 1);
		testsquare = $(testloc);
		while (!isOutOfBounds(testloc)) {
			if (isOccupied(testloc)) {
				if (isOppositeTeam(queen, getPieceByLocation(testloc))){
					if (isLegalMove(queen, testloc)) {
						squares.push(testsquare);
						break;
					} else {
						break;
					}
				} else {
					break;
				}
			} else {
				if (isLegalMove(queen, testloc)) {
					squares.push(testsquare);
				}
			}
					
			testloc = (parseInt(testloc.substring(0,1), 10) - 1).toString() + (parseInt(testloc.substring(1,2), 10) - 1);
			testsquare = $(testloc);
		}
		
		return squares;
	}
	return [];
}

// Returns an array of squares that a given queen is attacking
function queenAttackedSquares(queen) {
	var loc = queen.location;
	var attackedsquares = [];
	
	// Check squares to left
	var testloc = (loc.substring(0,1)-1).toString() + loc.substring(1,2);
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' &&
				isOppositeTeam(queen, getPieceByLocation(testloc))) {
				attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
		
		testloc = (testloc.substring(0,1)-1).toString() + testloc.substring(1,2);
	}
	
	// Check squares to right
	testloc = (parseInt(loc.substring(0,1),10)+1).toString() + loc.substring(1,2);
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' &&
				isOppositeTeam(queen, getPieceByLocation(testloc))) {
				attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
		
		testloc = (parseInt(testloc.substring(0,1),10)+1).toString() + testloc.substring(1,2);
	}
	
	// Check squares above
	testloc = loc.substring(0,1) + (parseInt(loc.substring(1,2),10)+1).toString();
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' &&
				isOppositeTeam(queen, getPieceByLocation(testloc))) {
				attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
		
		testloc = testloc.substring(0,1) + (parseInt(testloc.substring(1,2),10)+1);
	}
	
	// Check squares below
	testloc = loc.substring(0,1) + (parseInt(loc.substring(1,2),10)-1);
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' &&
				isOppositeTeam(queen, getPieceByLocation(testloc))) {
				attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
		
		testloc = testloc.substring(0,1) + (parseInt(testloc.substring(1,2),10)-1);
	}
	
	
	testloc = (parseInt(loc.substring(0,1), 10) + 1).toString() + (parseInt(loc.substring(1,2), 10) + 1);
	// Check squares in increasing row&col order
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' &&
				isOppositeTeam(queen, getPieceByLocation(testloc))) {
				attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
				
		// Increment
		testloc = (parseInt(testloc.substring(0,1), 10) + 1).toString() + (parseInt(testloc.substring(1,2), 10) + 1);
	}
	// Check squares in increasing row order & decreasing col order
	testloc = (parseInt(loc.substring(0,1), 10) - 1).toString() + (parseInt(loc.substring(1,2), 10) + 1);
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' &&
				isOppositeTeam(queen, getPieceByLocation(testloc))) {
				attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
		
		testloc = (parseInt(testloc.substring(0,1), 10) - 1).toString() + (parseInt(testloc.substring(1,2), 10) + 1);
	}
	// Check squares in decreasing row order & increasing col order
	testloc = (parseInt(loc.substring(0,1), 10) + 1).toString() + (parseInt(loc.substring(1,2), 10) - 1);
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' &&
				isOppositeTeam(queen, getPieceByLocation(testloc))) {
				attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
				
		testloc = (parseInt(testloc.substring(0,1), 10) + 1).toString() + (parseInt(testloc.substring(1,2), 10) - 1);
	}
	// Finally, check squares in decreasing row&col order
	testloc = (parseInt(loc.substring(0,1), 10) - 1).toString() + (parseInt(loc.substring(1,2), 10) - 1);
	while (!isOutOfBounds(testloc)) {
		if (isOccupied(testloc)) {
			if (getPieceByLocation(testloc).type == 'king' &&
				isOppositeTeam(queen, getPieceByLocation(testloc))) {
				attackedsquares.push(testloc);
			} else {
				attackedsquares.push(testloc);
				break;
			}
		} else {
			attackedsquares.push(testloc);
		}
				
		testloc = (parseInt(testloc.substring(0,1), 10) - 1).toString() + (parseInt(testloc.substring(1,2), 10) - 1);
	}
	
	return attackedsquares;
}

function kingMoveableSquares(king) {
	var loc = king.location;
	var squares = [];

	var testsquarelocs = [];
	
	var squareaboveloc = loc.substring(0,1) + (parseInt(loc.substring(1,2),10)+1).toString();
	testsquarelocs.push(squareaboveloc);

	var squarebelowloc = (loc.substring(0,1) + (loc.substring(1,2)-1)).toString();
	testsquarelocs.push(squarebelowloc);
	
	var squarerightloc = (parseInt(loc.substring(0,1),10)+1).toString() + (loc.substring(1,2));
	testsquarelocs.push(squarerightloc);
	
	var squareleftloc = (loc.substring(0,1)-1).toString() + (loc.substring(1,2));
	testsquarelocs.push(squareleftloc);
	
	var squareuprightloc = (parseInt(loc.substring(0,1),10)+1).toString() + (parseInt(loc.substring(1,2),10)+1);
	testsquarelocs.push(squareuprightloc);
	
	var squareupleftloc = (loc.substring(0,1)-1).toString() + (parseInt(loc.substring(1,2),10)+1).toString();
	testsquarelocs.push(squareupleftloc);
	
	var squaredownrightloc = (parseInt(loc.substring(0,1),10)+1).toString() + (loc.substring(1,2)-1).toString();
	testsquarelocs.push(squaredownrightloc);
	
	var squaredownleftloc = (loc.substring(0,1)-1).toString() + (loc.substring(1,2)-1).toString();
	testsquarelocs.push(squaredownleftloc);
	
	if (selectedPiece.type == 'king') {
		if (canCastleKingSide(king)) {
			if (king.team == 'white') {
				testsquarelocs.push('71');
			} else {
				testsquarelocs.push('78');
			}
		}
		if (canCastleQueenSide(king)) {
			if (king.team == 'white') {
				testsquarelocs.push('31');
			} else {
				testsquarelocs.push('38');
			}
		}
	}
	
	var attackedsquares = getTeamAttackedSquares(king.team);
	
	for (var i = 0; i < testsquarelocs.length; i++) {		
		if (!isOutOfBounds(testsquarelocs[i])) {
			if (!attackedsquares.includes(testsquarelocs[i])) {
				if (isOccupied(testsquarelocs[i])) {
					if (isOppositeTeam(king, getPieceByLocation(testsquarelocs[i]))) {
						squares.push($(testsquarelocs[i]));
					}
				} else {
					squares.push($(testsquarelocs[i]));
				}
			}
		}
	}
	return squares;
}
	
// Returns an array of squares a given king is attacking
function kingAttackedSquares(king) {
	var loc = king.location;
	var attackedsquares = [];

	var testsquarelocs = [];
	
	var squareaboveloc = loc.substring(0,1) + (parseInt(loc.substring(1,2),10)+1).toString();
	testsquarelocs.push(squareaboveloc);

	var squarebelowloc = (loc.substring(0,1) + (loc.substring(1,2)-1)).toString();
	testsquarelocs.push(squarebelowloc);
	
	var squarerightloc = (parseInt(loc.substring(0,1),10)+1).toString() + (loc.substring(1,2));
	testsquarelocs.push(squarerightloc);
	
	var squareleftloc = (loc.substring(0,1)-1).toString() + (loc.substring(1,2));
	testsquarelocs.push(squareleftloc);
	
	var squareuprightloc = (parseInt(loc.substring(0,1),10)+1).toString() + (parseInt(loc.substring(1,2),10)+1);
	testsquarelocs.push(squareuprightloc);
	
	var squareupleftloc = (loc.substring(0,1)-1).toString() + (parseInt(loc.substring(1,2),10)+1).toString();
	testsquarelocs.push(squareupleftloc);
	
	var squaredownrightloc = (parseInt(loc.substring(0,1),10)+1).toString() + (loc.substring(1,2)-1).toString();
	testsquarelocs.push(squaredownrightloc);
	
	var squaredownleftloc = (loc.substring(0,1)-1).toString() + (loc.substring(1,2)-1).toString();
	testsquarelocs.push(squaredownleftloc);
	
	for (var i = 0; i < testsquarelocs.length; i++) {
		if (!isOutOfBounds(testsquarelocs[i])) {
			attackedsquares.push(testsquarelocs[i]);
		}
	}
	return attackedsquares;
}

// Returns a boolean that represents whether or not a king can castle king side
function canCastleKingSide(king) {
	if (king.hasmoved || isInCheck(king)) {
		return false;
	} else {
		if (king.team == 'white') {
			if (getPieceByLocation('81') === undefined) {
				return false;
			} else if (getPieceByLocation('81').type != 'rook') {
				return false;
			} else if (getPieceByLocation('81').hasmoved) {
				return false;
			} else {
				// check if either of the squares the king has to travel over/to are attacked
				var square1 = '61';
				var square2 = '71';
				if (isOccupied(square1) || isOccupied(square2)) {
					return false;
				} else {
					var attackedsquares = getTeamAttackedSquares(king.team);
					return !(attackedsquares.includes(square1) || attackedsquares.includes(square2));
				}
			}
		} else {
			if (getPieceByLocation('88') === undefined) {
				return false;
			} else if (getPieceByLocation('88').type != 'rook') {
				return false;
			} else if (getPieceByLocation('88').hasmoved) {
				return false;
			} else {
				// check if either of the squares the king has to travel over/to are attacked
				var square1 = '68';
				var square2 = '78';
				if (isOccupied(square1) || isOccupied(square2)) {
					return false;
				} else {
					var attackedsquares = getTeamAttackedSquares(king.team);
					return !(attackedsquares.includes(square1) || attackedsquares.includes(square2));
				}
			}
		}
	}
}

// Returns a boolean that represents whether or not a king can castle queen side
function canCastleQueenSide(king) {
	if (king.hasmoved || isInCheck(king)) {
		return false;
	} else {
		if (king.team == 'white') {
			if (getPieceByLocation('11') === undefined) {
				return false;
			} else if (getPieceByLocation('11').type != 'rook') {
				return false;
			} else if (getPieceByLocation('11').hasmoved) {
				return false;
			} else {
				// check if any of the squares the king has to travel thru/to are attacked
				var square1 = '21';
				var square2 = '31';
				var square3 = '41';
				if (isOccupied(square1) || isOccupied(square2) || isOccupied(square3)) {
					return false;
				} else {
					var attackedsquares = getTeamAttackedSquares(king.team);
					return !(attackedsquares.includes(square2) || attackedsquares.includes(square3));
				}
			}
		} else {
			if (getPieceByLocation('18') === undefined) {
				return false;
			} else if (getPieceByLocation('18').type != 'rook') {
				return false;
			} else if (getPieceByLocation('18').hasmoved) {
				return false;
			} else {
				// check if any of the squares the king has to travel thru/to are attacked
				var square1 = '28';
				var square2 = '38';
				var square3 = '48';
				if (isOccupied(square1) || isOccupied(square2) || isOccupied(square3)) {
					return false;
				} else {
					var attackedsquares = getTeamAttackedSquares(king.team);
					return !(attackedsquares.includes(square2) || attackedsquares.includes(square3));
				}
			}
		}
	}
}

// Winning player logic

function declareStalemate() {
	var statusdiv = document.createElement('div');
	var statustext = document.createTextNode('Stalemate, game drawn');
	statusdiv.appendChild(statustext);
	statusdiv.style.margin = '0 auto';
	statusdiv.style.textAlign = 'center';
	statusdiv.style.fontSize = '30px';
	document.body.appendChild(createElement('br'));
	document.body.appendChild(statusdiv);
}

function declareWinner(team, method) {
	var statusdiv = document.createElement('p');
	var statustext;
	if (method == 'checkmate') {
		statustext = document.createTextNode('Checkmate, ' + team + ' wins.');
	} else if (method == 'time') {
		statustext = document.createTextNode(team + ' wins on time.');
	}
	statusdiv.appendChild(statustext);
	statusdiv.style.margin = '0 auto';
	statusdiv.style.textAlign = 'center';
	statusdiv.style.fontSize = '30px';
	statusdiv.style.width = '1000px';
	statusdiv.style.marginTop = '480px';
	document.body.appendChild(document.createElement('br'));
	document.body.appendChild(statusdiv);
}

// Timer logic
var whiteTimer = $('whitetimer');
var blackTimer = $('blacktimer');
var started = false;
var generalTimer = setInterval(function() { updateTimer(whosTurn); }, 1000);

function updateTimer(player) {
	if (!paused) {
		if (player == 'white') {
			decrementTimer(whiteTimer);
		} else {
			decrementTimer(blackTimer);
		}
	}
}

function decrementTimer(timer) {
	var values = timer.innerHTML.split(':');
	var minutes = values[0];
	var seconds = values[1];
	if (minutes == '0' && seconds == '00') {
		clearInterval(generalTimer);
		if (whosTurn == 'white') {
			declareWinner('black', 'time');
		} else {
			declareWinner('white', 'time');
		}
	} else if (seconds == '00') {
		minutes = parseInt(minutes) - 1;
		seconds = '59';
	} else {
		seconds = parseInt(seconds) - 1;
		if (seconds < 10) {
			seconds = '0' + seconds.toString();
		}
	}
	timer.innerHTML = minutes + ':' + seconds;
}

// Handles logic with pausing and unpausing the timers
var pausebutton = $('pausebutton');

function pauseButton() {
	if (started) {
		if (paused) {
			paused = false;
			generalTimer = setInterval(function () { updateTimer(whosTurn); }, 1000);
			pausebutton.innerHTML = 'Pause';
		} else {
			paused = true;
			clearInterval(generalTimer);
			pausebutton.innerHTML = 'Play';
		}
	}
}
