function highscoresAJAX() {
	var izbranaMožnost = document.getElementById("tipScorov").options[document.getElementById("tipScorov").selectedIndex].text;
	var xmlhttp;
	if (window.XMLHttpRequest) {//IE7+
		xmlhttp = new XMLHttpRequest();
	}
	else {//starejši IE
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			document.getElementById("izBaze").innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET", "highscores.php?d="+izbranaMožnost, true);
	xmlhttp.send(); 
}