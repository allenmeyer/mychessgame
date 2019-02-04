function redirect(time) {
	window.location.href = 'http://www-users.cselabs.umn.edu/~meye2348/chessgame/chess.php?time='+time.id;
}

function customredirect() {
	var time = document.getElementById('custominput').value;
	var test = /^[0-9]+$/.test(time);
	if (test && time > 0 && time < 99 && time !== undefined) {
		for (var i = 0; true; i++) {
			if (time[0] == 0) {
				time = time.substring(1);
			} else {
				break;
			}
		}
		window.location.href = 'http://www-users.cselabs.umn.edu/~meye2348/chessgame/chess.php?time='+time;
		
	} else {
		alert('Time value must be alphanumeric.');
	}
}
