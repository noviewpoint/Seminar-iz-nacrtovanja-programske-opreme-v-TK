var x  = document.getElementById("demo");//iz w3schools html5 geolokacija, http://www.w3schools.com/html/html5_geolocation.asp, vrne koordinate in poveže z google maps
function dobiLokacijo() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else {
	x.innerHTML = "Geolokacija ni podprta v vašem brskalniku.";
	}
}

function showPosition(position) {
	var širinaDolžina = position.coords.latitude + ", " + position.coords.longitude;
	var slika= "http://maps.googleapis.com/maps/api/staticmap?center=" + širinaDolžina + "&zoom=14&size=400x300&sensor=true";
	document.getElementById("zemljevid").innerHTML = "<img src='"+slika+"'>";
}

function showError(error) {
	switch(error.code) 
    {
		case error.PERMISSION_DENIED:
		x.innerHTML = "Preprečili ste poizvedbo o geolokaciji."
		break;
		
		case error.POSITION_UNAVAILABLE:
		x.innerHTML = "Informacija o vaši lokaciji trenutno ni na voljo."
		break;
		
		case error.TIMEOUT:
        x.innerHTML = "Poizvedba je zastarala."
        break;
		case error.UNKNOWN_ERROR:
        x.innerHTML = "Pripetila se je neznana napaka."
        break;
    }
}