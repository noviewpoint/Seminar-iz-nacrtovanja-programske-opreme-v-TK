globalState = 0;//če je uporabnik že zmagal v trenutni igri
rightOrLeft = 0;
alternativePlay = 0;

function getUserInputs() {
    optionType = _("gameType").selectedIndex;

    switch (optionType) {
        case 0:
        columns = 9;
        rows = 9;
        mines = 10;
        break;
        
        case 1:
        columns = 16;
        rows = 16;
        mines = 40;
        break;
        
        case 2:
        columns = 30;
        rows = 16;
        mines = 99;
        break;
    }
}

function kontrolna() {
    if (!alternativePlay) {
        alternativePlay = 1;
        rightOrLeft = 1;
        _("counter").className = "aktivirano";
        _("minskoPolje").className = "b";
    }
    else {
        alternativePlay = 0;
        rightOrLeft = 0;
        _("counter").className = "deaktivirano";
        _("minskoPolje").className = "a";
    }
}

function menjaj() {//menja event desnega in levega klika, narejeno za mobitele
    if (rightOrLeft && alternativePlay) {
        rightOrLeft = 0;
        _("minskoPolje").className = "a";
    }
    else if (!rightOrLeft && alternativePlay){
        rightOrLeft = 1;
        _("minskoPolje").className = "b";
    }
}

function polje() {//objektno
    this.osnovno=0;//mines označene z 1, ostala polja z 0
    this.presteto=0;//mines označene z "m", ostala polja z 0 - 8 (glede na število sosesednjih min)
    this.zastavica=0;//zastavice označene z 1, polja brez zastavice z 0
    this.aktivno=0;//aktivirana (že odprta) polja ali polja z zastavico 
}

function redrawClass (i, j, text) {
    _("[" + i + "][" + j + "]").className = text;
}


function drawFields() {

    makeArrays();
    _("timer").innerHTML = "";
    _("mr_smiley").className = "play";
    _("counter").innerHTML = "";
    _("submitHighscores").style.display = "none";
    _("gameFields").style.display= "initial";

    izpis = "<div style='table_wrapper'><table id='mine_field'>";

    for (i = 0; i < rows; i++) {
        izpis += "<tr>";
        for (j = 0; j < columns; j++) {
            izpis += "<td id='[" + i + "][" + j + "]' onmousedown='userClicks(event, " + i + ", " + j + ")'></td>";//onmousedown za najhitrejše igranje
        }
        izpis += "</tr>";
    }
    izpis += "</table></div>";
    _("gameFields").innerHTML = izpis;
}


function makeArrays() {
    
    stopCount();
    globalState = 0;
    getUserInputs();

    polja = [];
    for (i = 0; i < rows; i++) {
        polja[i] = new Array(columns);
        for (j = 0; j < columns; j++) {
            polja[i][j] = new polje();
        }
    }

    for (i = 0; i < mines; i++) {
        do {
            var lokacijaMineVrstice = Math.floor(Math.random()*rows);
            var lokacijaMineStolpci = Math.floor(Math.random()*columns);
        }
        while (lokacijaMineVrstice == rows && lokacijaMineStolpci == columns && polja[lokacijaMineVrstice][lokacijaMineStolpci].osnovno == 1);
        polja[lokacijaMineVrstice][lokacijaMineStolpci].osnovno = 1;   
    }

    for (a = 0; a < rows; a++) {
        for (j = 0; j < columns; j++) {
            if (polja[a][j].osnovno == 1) {
                polja[a][j].presteto = "m";
            }           
            else {
                polja[a][j].presteto = count(polja, "osnovno", i, j);
            }
        }
    }
}

function count(givenArray, givenProperty, q, w) {
    
    var sum = 0;
    for (i = q-1; i <= q+1; i++) {
        for (j = w-1; j <= w+1; j++) {
            if (i >= 0 && j >= 0 && i < rows && j < columns) {
                sum += givenArray[i][j][givenProperty];//ne smeš klicat s piko object propertyja
            }
        }
    }
    return sum;
}



function userClicks(event, i, j) {
    if (globalState == 0) {
        
        _("counter").innerHTML = mines;//šele ko prvič klikne se pokaže counter min in se začne timer
        doTimer();

        var y = event.button;
        switch (y) {
            case 0:
            break;
        
            case 1:
            y = 0;
            break;
        
            case 2:
            y = 1;
            break;
        
            case 4://eventi za IE8 minus verzije
            y = 0;
            break;
        }
    
        if (rightOrLeft && (polja[i][j].aktivno == 0)) {//nastavi y event kot left click, omogoča le zastavico
            y = 1;
        }
    
        switch(polja[i][j].osnovno) {
        case 1://polje z mino
        switch (y) {
            case 0: {//left click na mino
                if (polja[i][j].zastavica == 0) {
                    //sound(2);
                    for (p = 0; p < rows; p++) {
                        for (v = 0; v  < columns; v++) {
                            if ((polja[p][v].zastavica == 0) && (polja[p][v].osnovno == 1)) {
                                redrawClass(p, v, "rumenaMina");//loop, ki prikaže vse mines na ekran
                            }
                            if ((polja[p][v].zastavica == 1) && (polja[p][v].osnovno == 0)) {
                                redrawClass(p, v, "prekrižanaZastavica");
                            }
                            polja[p][v].aktivno = 1;
                            //_("[" + p + "][" + v + "]").setAttribute("onmousedown", "userClicks(event, " + i + ", " + j + ")");//po porazu nastavi nazaj event, da lahko s klikom na katerokoli polje uporabnik resetira mrežo
                        }
                    }       
                    globalState = 1;
                    stopCount();
                    redrawClass(i, j, "rdečaMina");
                    _("mr_smiley").className = "defeat";
                }
            }
            break;
            
            case 1: {//right click na mino
                if (polja[i][j].aktivno == 0) {
                    if (polja[i][j].zastavica == 0) {//brez zastavice
                        redrawClass(i, j, "zastavica");
                        polja[i][j].zastavica = 1;
                        _("counter").innerHTML = --mines;
                        checkVictory();//pregleda za zmago ob postavljanju zastavic
                    }
                    else {//z zastavico
                        redrawClass(i, j, "neodprtoPolje");
                        polja[i][j].zastavica = 0;
                        _("counter").innerHTML = ++mines;
                    }
                }
            }
            break;
        }
        break;



        
        case 0://polje brez mines
        switch (y) {    
            case 0: {//left click
                var sum = count(polja, "zastavica", i, j);
                if ((polja[i][j].aktivno == 0) && (polja[i][j].zastavica == 0)) {
                    if (polja[i][j].presteto == 0) {
                        //sound(1);
                        openEmpties(i, j);
                    }
                    else {//itak nikoli ne more priti do "m"-jev v arrayu poljaAlternative, ker so "m"-ji na istih pozicijah kot 1ke v arrayu polja
                        redrawClass(i, j, "razred" + polja[i][j].presteto);
                        _("[" + i + "][" + j + "]").innerHTML = polja[i][j].presteto;
                        polja[i][j].aktivno = 1;
                    }   
                }
                else if ((polja[i][j].aktivno == 1) && (polja[i][j].presteto == sum)) {
                        
                        maliKlik(i - 1, j - 1);
                        maliKlik (i - 1, j);
                        maliKlik(i - 1, j + 1);
                        maliKlik(i, j - 1);
                        maliKlik(i, j + 1);
                        maliKlik(i + 1, j - 1);
                        maliKlik(i + 1, j);
                        maliKlik(i + 1, j +1);
                }
                else if ((polja[i][j].aktivno == 1) && (polja[i][j].presteto != seštevek) && (seštevek != 0)) {//ce klika v prazno npr. s preveč/premalo zastavic
                //sound(4);
                }
                /*if (globalState != 0) {
                    //sound(2);
                        for (p = 0; p < rows; p++) {
                            for (v = 0; v  < columns; v++) {
                                if ((polja[p][v].zastavica == 0) && (polja[p][v].osnovno == 1)) {
                                    redrawClass(p, v, "rumenaMina");
                                    polja[p][v].aktivno = 1;
                                }
                                if ((polja[p][v].zastavica == 1) && (polja[p][v].osnovno == 0)) {
                                    redrawClass(p, v, "prekrižanaZastavica");
                                    polja[p][v].aktivno = 1;
                                }
                                //_("[" + p + "][" + v + "]").setAttribute("onmousedown", "userClicks(event, " + i + ", " + j + ")");
                            }
                        }
                            
                    globalState = 1;
                    stopCount();
                    _("mr_smiley").className = "defeat";
                }*/
            }
            break;
            
            case 1: {//right click
                if (polja[i][j].aktivno == 0) {
                    if (polja[i][j].zastavica == 0) {
                        redrawClass(i, j, "zastavica");//zamenja neodprto polje za zastavico
                        polja[i][j].zastavica = 1;
                        _("counter").innerHTML = --mines;
                    }
                    else {
                        redrawClass(i, j, "neodprtoPolje");//zamenja zastavico za neodprto polje
                        polja[i][j].zastavica = 0;
                        _("counter").innerHTML = ++mines;
                    }
                    checkVictory(); 
                }
            }
            break;
        }
        break;
    }
    }
    else {
    globalState = 0;
    drawFields();
    }
}

function checkVictory() {   
    var c = 0;
    for (i = 0; i < rows; i++) {
        for (j = 0; j < columns; j++) {
            if (polja[i][j].zastavica == polja[i][j].osnovno) {c++;}
        }
    }
    
    if (c == rows*columns) {
        //sound(5);
        _("mr_smiley").className = "win";
        stopCount();
        var time = _("timer").innerHTML;
        obZmagi(time);
        //izdelajTabelo();
    }
}

function openEmpties(i,j) {
    if(i >= 0 && j >= 0 && i < rows && j < columns && polja[i][j].aktivno == 0 && polja[i][j].zastavica == 0) {//omeji področje za rekurzije
        redrawClass(i, j, "razred" + polja[i][j].presteto);
        _("[" + i + "][" + j + "]").innerHTML = polja[i][j].presteto;
        polja[i][j].aktivno = 1;

        if(polja[i][j].presteto == 0) {
            _("[" + i + "][" + j + "]").setAttribute("onmousedown", "menjaj();");//preveri in odpre vse prazne sosede v vseh smereh
            openEmpties(i + 1, j);
            openEmpties(i, j + 1);
            openEmpties(i - 1, j);
            openEmpties(i, j - 1);
            openEmpties(i + 1,j + 1);
            openEmpties(i + 1,j - 1);
            openEmpties(i - 1,j + 1);
            openEmpties(i - 1,j - 1);
        }
    } 
}

function maliKlik(i, j) {   
    if (i >= 0 && j >= 0 && i < rows && j < columns) {
    switch(polja[i][j].osnovno) {
        case 1: {//polje z mino 
                if (polja[i][j].zastavica == 0) {
                    globalState++;
                }
        }
        break;

        case 0: {//polje brez mines
                if ((polja[i][j].aktivno == 0) && (polja[i][j].zastavica == 0)) {
                    if (polja[i][j].presteto == 0) {
                        //sound(1);
                        openEmpties(i, j);
                    }
                    else {//itak nikoli ne more priti do "m"-jev v arayu poljaAlternative, ker so "m"-ji na istih pozicijah kot 1ke v arrayu polja
                        redrawClass(i, j, "razred" + polja[i][j].presteto);
                        _("[" + i + "][" + j + "]").innerHTML = polja[i][j].presteto;
                        polja[i][j].aktivno = 1;
                    }
                }
        }
        break;
    }
    }
}

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
    xmlhttp.open("GET", "minesweeper/php/highscores.php?d="+izbranaMožnost, true);
    xmlhttp.send(); 
}

function klicAJAX(vnos, time) { 
    if (vnos.length < 16 && vnos != null && vnos != "") {
    var xmlhttp;
    if (window.XMLHttpRequest) {//IE7+
        xmlhttp = new XMLHttpRequest();
    }
    else {//starejši IE
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }//če je skripta geoplugin onemogočena, vrže browser napako "geoplugin_countryName() is not defined"; ajax ne odda strežniku, igra pa stoji 
    xmlhttp.open("POST", "minesweeper/php/highscores.php?q="+vnos+"u7Kls"+time+"u7Kls"+optionType+"u7Kls"+geoplugin_countryName()+"u7Kls"+geoplugin_countryCode(), true);
    //preko oblike linka sporoči PHPju spremenljivke, ki jih ta potem vpisuje v SQL bazo
    xmlhttp.send();
    //_("submitHighscores").style.visibility = "hidden";
    //sound(3);

        //_("vrednostIme").style.background="#C98F89"; 
    
}}

function naredix() {
    //_("gameFields").remove();
    var izpis = "<div id='izBaze'></div><div id='highscoresSelect'><select name='tipScorov'\
id='tipScorov' onchange='highscoresAJAX();'><option>easy</option>\
<option>normal</option><option>hard</option></select></div><div onclick='izdelajTabelo()'>nazaj na igro</div>";
    _("wrapper2").style.display = "block";
//_("wrapper2").innerHTML = izpis;

//_("wrapper").style.display = "none";
}

function obZmagi(time) {
    _("gameFields").style.display= "none";
    _("submitHighscores").style.display = "block";//spodaj uporaba --> \
    var tekst = "Tvoj time je bil: " + time + " sekund. Vpiši svoje ime (največ 15 znakov) za vnos rezultata v highscores: <br />\
    <input id='vrednostIme' style='position:relative;width:125px;left:95px;top:-5px;' type='text'><button type='submit' style='position:relative;\
     left:100px;top:-10px;' onclick='klicAJAX(_(\"vrednostIme\").value, " + seconds + ")'>Potrdi</button>";
    //_("wrapper").innerHTML = tekst;
}