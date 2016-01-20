<link type="text/css" rel="stylesheet" href="minesweeper/css/stylesheet.css" />


<body onkeydown="pressKeysMP(event);">


<div id="content">
<div class="game" id="minesweeper">
<div id="space" oncontextmenu="return false;"><!--onemogoči desni klik-->

<div id="go_back" onclick="goBack();"><p>press M for menu or P for pause</p></div>

<div id="space_menu">
<div id="menu_play" onclick="drawFields();">play</div>
<div id="menu_highscores" onclick="switchToHighscores();">highscores</div>
<div id="menu_options">options</div>
<div id="menu_exit">exit</div>
</div>

<div id="space_game" class="invisible">
<div id="top_wrapper">
<div id="timer"></div>
<div id="mr_smiley" class="play" onclick="drawFields();"></div>
<div id="counter" class="deaktivirano" onmousedown="kontrolna();"></div>
</div>

<div id="submitScore" class="invisible"></div>
<div id="gameFields"></div>

<div id="izbiralnik">
<select name="gameType" id="gameType" style="width:200px;" onchange="drawFields();">
<option>easy &nbsp (9×9) &nbsp 10 min</option>
<option>normal &nbsp (16×16) &nbsp 40 min</option>
<option>hard &nbsp (30×16) &nbsp 99 min</option>
</select>
</div>

</div>
<div id="highscores" class="invisible">
<div id="highscoresSelect" style="margin:0 auto;width:200px;">
<select name="highscoresType" id="highscoresType" style="width:200px;" onchange="highscoresAJAX();">
<option>easy</option>
<option>normal</option>
<option>hard</option>
</select>
</div>
<div id="highscoresFromDatabase"></div>

</div>

</div>
</div>
</div>





<script src="minesweeper/javascript/minesweeper-head.js"></script>
<script src="javascript/basic_functions.js"></script>
<script src="http://www.geoplugin.net/javascript.gp"></script><!--vključena skripta za geolokacijo-->

