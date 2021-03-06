//timer v basic functions
var globalState = 0;
var rightOrLeftClick = 0;//hrani vrednost, ki programu sporoči, da je bil izveden levi oz. desni klik
var alternativePlay = 0;//za aktiviranje mobilnega načina, prvič mora uporabnik pritisniti števec min, nadaljne pa prazno polje

function getUserInputs() {
    optionType = angular.element(document.getElementById("vsebina")).scope().getUserInputs() - 1;

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

function drawFieldsHTML() {

    _("timer").innerHTML = "";
    _("mr_smiley").className = "play";
    _("counter").innerHTML = "";


    izpis = "<div id='table_wrapper' style='margin:0 auto;'><table id='minskoPolje' class='a'>";
    for (i = 0; i < rows; i++) {
        izpis += "<tr>";
        for (j = 0; j < columns; j++) {
            izpis += "<td id='[" + i + "][" + j + "]' class='neodprtoPolje' onmousedown='funkcijaKlik(event, " + i + ", " + j + ")'></td>";//onmousedown za najhitrejše igranje
        }
        izpis += "</tr>";
    }
    izpis += "</table></div>";
    _("gameFields").innerHTML = izpis;

}

function polje() {//objektno
    this.osnovno=0;//mines označene z 1, ostala polja z 0
    this.presteto=0;//mines označene z "m", ostala polja z 0 - 8 (glede na število sosesednjih min)
    this.zastavica=0;//zastavice označene z 1, polja brez zastavice z 0
    this.aktivno=0;//aktivirana (že odprta) polja ali polja z zastavico
}

function drawFields() {
    console.log("Risem polja v DOM");
    globalState = 0;
    stopCount();
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

    drawFieldsHTML();

    for (i = 0; i < rows; i++) {
        for (j = 0; j < columns; j++) {
            if (polja[i][j].osnovno == 1) {
                polja[i][j].presteto = "m";
            }
            else {
                osnovno = "osnovno";
                polja[i][j].presteto = count(polja, osnovno, i + 1, j) + count(polja, osnovno, i, j + 1) + count(polja, osnovno, i - 1, j) + count(polja, osnovno, i, j - 1) + count(polja, osnovno, i + 1, j + 1) + count(polja, osnovno, i + 1, j - 1) + count(polja, osnovno, i - 1, j + 1) + count(polja, osnovno, i - 1, j - 1);

            }
        }
    }
    alternativePlay = 1;
    kontrolna();
}


function count(zbirka, lastnost, i, j) {
    if (i >= 0 && j >= 0 && i < rows && j < columns) {
        return zbirka[i][j][lastnost];//ne smeš klicat s piko object propertyja
    }
    else {
        return 0;
    }
}

function funkcijaKlik(event, i, j) {

    // 2 stavka za debugiranje z bazo; instanta zmaga ob prvem kliku!
    //stopCount();//najprej ustavim stevec, nato berem
    //obZmagi();

    if (globalState == 0) {

        _("counter").innerHTML = mines;
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
                                _("[" + p + "][" + v + "]").className = "rumenaMina";//loop, ki prikaže vse mines na ekran
                                polja[p][v].aktivno = 1;
                            }
                            if ((polja[p][v].zastavica == 1) && (polja[p][v].osnovno == 0)) {
                                _("[" + p + "][" + v + "]").className = "prekrižanaZastavica";
                                polja[p][v].aktivno = 1;
                            }
                            _("[" + p + "][" + v + "]").setAttribute("onmousedown", "funkcijaKlik(event, " + i + ", " + j + ")");//po porazu nastavi nazaj event, da lahko s klikom na katerokoli polje uporabnik resetira mrežo
                        }
                    }
                    globalState = 1;
                    stopCount();
                    _("[" + i + "][" + j + "]").className = "rdečaMina";
                    _("mr_smiley").className = "defeat";
                }
            }
            break;

            case 1: {//right click na mino
                if (polja[i][j].aktivno == 0) {
                    if (polja[i][j].zastavica == 0) {//brez zastavice
                        _("[" + i + "][" + j + "]").className = "zastavica";
                        polja[i][j].zastavica = 1;
                        _("counter").innerHTML = --mines;
                        checkVictory();
                    }
                    else {//z zastavico
                        _("[" + i + "][" + j + "]").className= "neodprtoPolje";
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
            zastavica = "zastavica";
            seštevek = count(polja, zastavica, i + 1, j) + count(polja, zastavica, i, j + 1) + count(polja, zastavica, i - 1, j) + count(polja, zastavica, i, j - 1) + count(polja, zastavica, i + 1, j + 1) + count(polja, zastavica, i + 1,j - 1) + count(polja, zastavica, i - 1, j + 1) + count(polja, zastavica, i - 1, j - 1);

                if ((polja[i][j].aktivno == 0) && (polja[i][j].zastavica == 0)) {
                    if (polja[i][j].presteto == 0) {
                        //sound(1);
                        openEmpties(i, j);
                    }
                    else {//itak nikoli ne more priti do "m"-jev v arrayu poljaAlternative, ker so "m"-ji na istih pozicijah kot 1ke v arrayu polja
                        _("[" + i + "][" + j + "]").className = "razred" + polja[i][j].presteto;
                        _("[" + i + "][" + j + "]").innerHTML = polja[i][j].presteto;
                        polja[i][j].aktivno = 1;
                    }
                }
                else if ((polja[i][j].aktivno == 1) && (polja[i][j].presteto == seštevek)) {

                        maliKlik(i - 1, j - 1);
                        maliKlik (i - 1, j);
                        maliKlik(i - 1, j + 1);
                        maliKlik(i, j - 1);
                        maliKlik(i, j + 1);
                        maliKlik(i + 1, j - 1);
                        maliKlik(i + 1, j);
                        maliKlik(i + 1, j +1);
                }
                else if ((polja[i][j].aktivno == 1) && (polja[i][j].presteto != seštevek) && (seštevek != 0)) {
                //sound(4);
                }
                if (globalState == 1) {//ce pride z malim klikom do poraza
                    //sound(2);
                        for (p = 0; p < rows; p++) {
                            for (v = 0; v  < columns; v++) {
                                if ((polja[p][v].zastavica == 0) && (polja[p][v].osnovno == 1)) {
                                    _("[" + p + "][" + v + "]").className = "rumenaMina";
                                    polja[p][v].aktivno = 1;
                                }
                                if ((polja[p][v].zastavica == 1) && (polja[p][v].osnovno == 0)) {
                                    _("[" + p + "][" + v + "]").className = "prekrižanaZastavica";
                                    polja[p][v].aktivno = 1;
                                }
                                _("[" + p + "][" + v + "]").setAttribute("onmousedown", "funkcijaKlik(event, " + i + ", " + j + ")");
                            }
                        }

                    globalState = 1;
                    stopCount();
                    _("mr_smiley").className = "defeat";//ne more pa ozniciti rdece mine saj ni nobene mine konkretno zadel z malim klikom!
                }
            }
            break;

            case 1: {//right click
                if (polja[i][j].aktivno == 0) {
                    if (polja[i][j].zastavica == 0) {
                        _("[" + i + "][" + j + "]").className= "zastavica";//zamenja neodprto polje za zastavico
                        polja[i][j].zastavica = 1;
                        _("counter").innerHTML = --mines;
                    }
                    else {
                        _("[" + i + "][" + j + "]").className = "neodprtoPolje";//zamenja zastavico za neodprto polje
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
        stopCount();//najprej ustavim stevec, nato berem
        obZmagi();
    }
}

function openEmpties(i,j) {
    if(i >= 0 && j >= 0 && i < rows && j < columns && polja[i][j].aktivno == 0 && polja[i][j].zastavica == 0) {//omeji področje za rekurzije
        _("[" + i + "][" + j + "]").className = "razred" + polja[i][j].presteto;
        _("[" + i + "][" + j + "]").innerHTML = polja[i][j].presteto;
        polja[i][j].aktivno = 1;

        if(polja[i][j].presteto == 0) {
            _("[" + i + "][" + j + "]").setAttribute("onmousedown", "menjaj();");//preveri in odpre vse prazne sosede v vseh smereh

            // v smeri urinega kazalca
            openEmpties(i - 1,     j); //  S
            openEmpties(i - 1, j + 1); // SV
            openEmpties(    i, j + 1); //  V
            openEmpties(i + 1, j + 1); // JV
            openEmpties(i + 1,     j); //  J
            openEmpties(i + 1, j - 1); // JZ
            openEmpties(    i, j - 1); //  Z
            openEmpties(i - 1, j - 1); // SZ
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
                        _("[" + i + "][" + j + "]").className = "razred" + polja[i][j].presteto;
                        _("[" + i + "][" + j + "]").innerHTML = polja[i][j].presteto;
                        polja[i][j].aktivno = 1;
                    }
                }
        }
        break;
    }
    }
}

function obZmagi() {
    angular.element(document.getElementById("vsebina")).scope().setTime(seconds+60*minutes+3600*hours);
    //angular.element(document.getElementById("vsebina")).scope().setTime(13);

    angular.element(document.getElementById("vsebina")).scope().openModalNewResult();
}
