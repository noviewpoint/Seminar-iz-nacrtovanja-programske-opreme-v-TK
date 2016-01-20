function _(element){
	return document.getElementById(element);
}

/*dodaj trig*/

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

var seconds = 0;
var minutes = 0;
var hours = 0;
var timerIsOn = 0;
var t = 0;

function timedCount() {
	seconds += 1;
	formatTime();
	t = setTimeout(function(){timedCount()}, 1000);//kliče samega sebe s 1000ms timeouta, merilec časa
}

function formatTime() {

	if (seconds > 59) {minutes += 1; seconds = 0;}
	if (minutes > 59) {hours += 1; minutes = 0;}

	if (seconds < 10) {var addSec = "0";}
	else {var addSec = "";}
	if (minutes < 10) {var addMin = "0";}
	else {var addMin = "";}
	if (hours < 10) {var addHour = "0";}
	else {var addHour = "";}

	_("timer").innerHTML = addHour + hours + " : " + addMin + minutes + " : " + addSec + seconds;
}

function doTimer() {
	if (!timerIsOn) {
		timerIsOn = 1;
        seconds = 0;
        minutes = 0;
        hours = 0;
		timedCount();
	}
}

function stopCount() {
	clearTimeout(t);
	timerIsOn = 0;
}

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
