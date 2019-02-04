<?php
	if (ctype_alnum($_GET['time'])) {
		$time = $_GET['time'];
	} else {
		$time = 5;
	}
?>
<!-- Chess.php Allen Meyer 2018 -->

<html lang = "en">
	<head>
		<meta charset = "utf-8">
		<title> Chess </title>
		<link rel = "stylesheet" type = "text/css" href = "http://www-users.cselabs.umn.edu/~meye2348/chessgame/chessstyle.css">
		<script type = "text/javascript" src = "http://www-users.cselabs.umn.edu/~meye2348/chessgame/chesslogic.js" defer> </script>
	</head>
	<body>
		<div id = "chesselement">
			<div id = "promotionmenu">
				<table>
					<th> Promote Piece </th>
					<tr> 
						<td id = "promotioninput"> 
							<br />
							<label> <input type = "radio" name = "type" value = "queen" /> Queen </label> <br /> <br />
							<label> <input type = "radio" name = "type" value = "rook"/> Rook </label> <br /> <br />
							<label> <input type = "radio" name = "type" value = "bishop" /> Bishop </label> <br /> <br />
							<label> <input type = "radio" name = "type" value = "knight" /> Knight </label> <br /> <br />
							<button type = "button" onclick = "promotePiece()"> Submit </button>
						</td>
					</tr>
				</table>
			</div>
			<div id = "chesstable">
				<table>
					<!-- 8th rank -->
					<tr id = "row8">
						<td class = "rowlabel"> 8 </td>
						<td class = "column1 white" id = "18"> <img src = "images/black/rook.png" alt = "blackrook" class = "blackpiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column2 black" id = "28"> <img src = "images/black/knight.png" alt = "blackknight" class = "blackpiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column3 white" id = "38"> <img src = "images/black/bishop.png" alt = "blackbishop" class = "blackpiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column4 black" id = "48"> <img src = "images/black/queen.png" alt = "blackqueen" class = "blackpiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column5 white" id = "58"> <img src = "images/black/king.png" alt = "blackking" class = "blackpiece piece" id = "blackking" onclick = "checksquares(this)"> </td>
						<td class = "column6 black" id = "68"> <img src = "images/black/bishop.png" alt = "blackbishop" class = "blackpiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column7 white" id = "78"> <img src = "images/black/knight.png" alt = "blackknight" class = "blackpiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column8 black" id = "88"> <img src = "images/black/rook.png" alt = "blackrook" class = "blackpiece piece" onclick = "checksquares(this)"> </td>
					</tr>
					<!-- 7th rank -->
					<tr id = "row7">
						<td class = "rowlabel"> 7 </td>
						<td class = "column1 black" id = "17"> <img src = "images/black/pawn.png" alt = "blackpawn" class = "blackpiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column2 white" id = "27"> <img src = "images/black/pawn.png" alt = "blackpawn" class = "blackpiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column3 black" id = "37"> <img src = "images/black/pawn.png" alt = "blackpawn" class = "blackpiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column4 white" id = "47"> <img src = "images/black/pawn.png" alt = "blackpawn" class = "blackpiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column5 black" id = "57"> <img src = "images/black/pawn.png" alt = "blackpawn" class = "blackpiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column6 white" id = "67"> <img src = "images/black/pawn.png" alt = "blackpawn" class = "blackpiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column7 black" id = "77"> <img src = "images/black/pawn.png" alt = "blackpawn" class = "blackpiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column8 white" id = "87"> <img src = "images/black/pawn.png" alt = "blackpawn" class = "blackpiece piece" onclick = "checksquares(this)"> </td>
					</tr>
					<!-- 6th rank -->
					<tr id = "row6">
						<td class = "rowlabel"> 6 </td>
						<td class = "column1 white" id = "16"></td>
						<td class = "column2 black" id = "26"></td>
						<td class = "column3 white" id = "36"></td>
						<td class = "column4 black" id = "46"></td>
						<td class = "column5 white" id = "56"></td>
						<td class = "column6 black" id = "66"></td>
						<td class = "column7 white" id = "76"></td>
						<td class = "column8 black" id = "86"></td>
					</tr>
					<!-- 5th rank -->
					<tr id = "row5">
						<td class = "rowlabel"> 5 </td>
						<td class = "column1 black" id = "15"></td>
						<td class = "column2 white" id = "25"></td>
						<td class = "column3 black" id = "35"></td>
						<td class = "column4 white" id = "45"></td>
						<td class = "column5 black" id = "55"></td>
						<td class = "column6 white" id = "65"></td>
						<td class = "column7 black" id = "75"></td>
						<td class = "column8 white" id = "85"></td>
					</tr>
					<!-- 4th rank -->
					<tr id = "row4">
						<td class = "rowlabel"> 4 </td>
						<td class = "column1 white" id = "14"></td>
						<td class = "column2 black" id = "24"></td>
						<td class = "column3 white" id = "34"></td>
						<td class = "column4 black" id = "44"></td>
						<td class = "column5 white" id = "54"></td>
						<td class = "column6 black" id = "64"></td>
						<td class = "column7 white" id = "74"></td>
						<td class = "column8 black" id = "84"></td>
					</tr>
					<!-- 3rd rank -->
					<tr id = "row3">
						<td class = "rowlabel"> 3 </td>
						<td class = "column1 black" id = "13"></td>
						<td class = "column2 white" id = "23"></td>
						<td class = "column3 black" id = "33"></td>
						<td class = "column4 white" id = "43"></td>
						<td class = "column5 black" id = "53"></td>
						<td class = "column6 white" id = "63"></td>
						<td class = "column7 black" id = "73"></td>
						<td class = "column8 white" id = "83"></td>
					</tr>
					<!-- 2nd rank -->
					<tr id = "row2">
						<td class = "rowlabel"> 2 </td>
						<td class = "column1 white" id = "12"> <img src = "images/white/pawn.png" alt = "whitepawn" class = "whitepiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column2 black" id = "22"> <img src = "images/white/pawn.png" alt = "whitepawn" class = "whitepiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column3 white" id = "32"> <img src = "images/white/pawn.png" alt = "whitepawn" class = "whitepiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column4 black" id = "42"> <img src = "images/white/pawn.png" alt = "whitepawn" class = "whitepiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column5 white" id = "52"> <img src = "images/white/pawn.png" alt = "whitepawn" class = "whitepiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column6 black" id = "62"> <img src = "images/white/pawn.png" alt = "whitepawn" class = "whitepiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column7 white" id = "72"> <img src = "images/white/pawn.png" alt = "whitepawn" class = "whitepiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column8 black" id = "82"> <img src = "images/white/pawn.png" alt = "whitepawn" class = "whitepiece piece" onclick = "checksquares(this)"> </td>
					</tr>
					<!-- 1st rank -->
					<tr id = "row1">
						<td class = "rowlabel"> 1 </td>
						<td class = "column1 black" id = "11"> <img src = "images/white/rook.png" alt = "whiterook" class = "whitepiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column2 white" id = "21"> <img src = "images/white/knight.png" alt = "whiteknight" class = "whitepiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column3 black" id = "31"> <img src = "images/white/bishop.png" alt = "whitebishop" class = "whitepiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column4 white" id = "41"> <img src = "images/white/queen.png" alt = "whitequeen" class = "whitepiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column5 black" id = "51"> <img src = "images/white/king.png" alt = "whiteking" class = "whitepiece piece" id = "whiteking" onclick = "checksquares(this)"> </td>
						<td class = "column6 white" id = "61"> <img src = "images/white/bishop.png" alt = "whitebishop" class = "whitepiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column7 black" id = "71"> <img src = "images/white/knight.png" alt = "whiteknight" class = "whitepiece piece" onclick = "checksquares(this)"> </td>
						<td class = "column8 white" id = "81"> <img src = "images/white/rook.png" alt = "whiterook" class = "whitepiece piece" onclick = "checksquares(this)"> </td>
					</tr>
					<tr id = "columnlabel">
						<td> </td>
						<td> a </td>
						<td> b </td>
						<td> c </td>
						<td> d </td>
						<td> e </td>
						<td> f </td>
						<td> g </td>
						<td> h </td>
					</tr>
				</table>
			</div>
			<div id = "chessmenu">
				<label id = "blacktimer"><?php print($time); ?>:00</label>
				<div id = "scrolltable">
					<table id = "movedisplay"> 
						<thead> 
							<button type = "button" id = "pausebutton" onclick = "pauseButton()">Pause</button>
						</thead>
					</table>
				</div>
				<label id = "whitetimer"><?php print($time); ?>:00</label>
			</div>
		</div>
	</body>
</html>
