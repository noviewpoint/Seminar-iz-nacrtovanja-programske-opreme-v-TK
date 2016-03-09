(function() {
    "use strict";

    angular
        .module("minesweeper")
        .service("restService", restService)
        .service("gameSettingsService", gameSettingsService)
        .service("countriesService", countriesService);

    function restService($http) {
        console.log("In restService");

        return {
            postScore: postScore,
            requestScores: requestScores,
            postFormRegister: postFormRegister,
            postFormLogin: postFormLogin,
            logout: logout
        }

        // vse spodaj so ASYNCANI REQUESTI!
        // če ni napisan header za Content-Type ga privzeto angular naredi kot: {"Content-Type": "application/json"}
        // GET caching in browser

        function postScore(x) {
            console.log("In function postScore", x);
            return $http({method: "POST", url: "http://www.genics.eu/androidApp/php/post_score.php", data: x});
        }

        function requestScores() {
            return $http({method: "GET", url: "http://www.genics.eu/androidApp/php/request_scores.php"});
        }

        function postFormRegister(x) {
            console.log("In function postFormRegister", x);
            return $http({
                method: "POST",
                url: "http://www.genics.eu/androidApp/php/registracija.php",
                data: "username=" + encodeURIComponent(x.username) + "&password=" + encodeURIComponent(x.password) + "&country=" + encodeURIComponent(x.country.name_countries),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
            });
        }

        function postFormLogin(x) {
            console.log("In function postFormLogin", x)
            return $http({
                method: "POST",
                url: "http://www.genics.eu/androidApp/php/prijava.php",
                data: "username=" + encodeURIComponent(x.username) + "&password=" + encodeURIComponent(x.password) + "&country=" + encodeURIComponent(x.country.name_countries),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
            });
        }

        function logout() {
            console.log("V logout");
            return $http({
                method: "GET",
                url: "http://www.genics.eu/androidApp/php/odjava.php"
            });
        }

    }

    function gameSettingsService() {
        console.log("In gameSettingsService");

        var difficultyIndex = 0;
        var userData = {};

        var time = 0;

        return {
            getDifficultyIndex: getDifficultyIndex,
            setDifficultyIndex: setDifficultyIndex,

            getTime: getTime,
            setTime: setTime,

            getUserData: getUserData,
            setUserData: setUserData
        };

        function getDifficultyIndex() {
            return difficultyIndex;
        }

        function setDifficultyIndex(x) {
            difficultyIndex = x;
        }

        function getTime() {
            return time;
        }

        function setTime(x) {
            time = x;
        }

        function getUserData() {
            return userData;
        }

        function setUserData(x) {
            userData = x;
        }
    }

    function countriesService() {
        console.log("In countriesService");

        // exportana lista drzav v json z uporabo PhpMyAdmin
        var isoCountriesForView = [
            {"id_countries":"1","name_countries":"Andorra","acronym_countries":"AD"}, {"id_countries":"2","name_countries":"United Arab Emirates","acronym_countries":"AE"}, {"id_countries":"3","name_countries":"Afghanistan","acronym_countries":"AF"}, {"id_countries":"4","name_countries":"Antigua and Barbuda","acronym_countries":"AG"}, {"id_countries":"5","name_countries":"Anguilla","acronym_countries":"AI"}, {"id_countries":"6","name_countries":"Albania","acronym_countries":"AL"}, {"id_countries":"7","name_countries":"Armenia","acronym_countries":"AM"}, {"id_countries":"8","name_countries":"Netherlands Antilles","acronym_countries":"AN"}, {"id_countries":"9","name_countries":"Angola","acronym_countries":"AO"}, {"id_countries":"10","name_countries":"Antarctica","acronym_countries":"AQ"}, {"id_countries":"11","name_countries":"Argentina","acronym_countries":"AR"}, {"id_countries":"12","name_countries":"American Samoa","acronym_countries":"AS"}, {"id_countries":"13","name_countries":"Austria","acronym_countries":"AT"}, {"id_countries":"14","name_countries":"Australia","acronym_countries":"AU"}, {"id_countries":"15","name_countries":"Aruba","acronym_countries":"AW"}, {"id_countries":"16","name_countries":"Azerbaijan","acronym_countries":"AZ"}, {"id_countries":"17","name_countries":"Bosnia and Herzegovina","acronym_countries":"BA"}, {"id_countries":"18","name_countries":"Barbados","acronym_countries":"BB"}, {"id_countries":"19","name_countries":"Bangladesh","acronym_countries":"BD"}, {"id_countries":"20","name_countries":"Belgium","acronym_countries":"BE"}, {"id_countries":"21","name_countries":"Burkina Faso","acronym_countries":"BF"}, {"id_countries":"22","name_countries":"Bulgaria","acronym_countries":"BG"}, {"id_countries":"23","name_countries":"Bahrain","acronym_countries":"BH"}, {"id_countries":"24","name_countries":"Burundi","acronym_countries":"BI"}, {"id_countries":"25","name_countries":"Benin","acronym_countries":"BJ"}, {"id_countries":"26","name_countries":"Bermuda","acronym_countries":"BM"}, {"id_countries":"27","name_countries":"Brunei Darussalam","acronym_countries":"BN"}, {"id_countries":"28","name_countries":"Bolivia","acronym_countries":"BO"}, {"id_countries":"29","name_countries":"Brazil","acronym_countries":"BR"}, {"id_countries":"30","name_countries":"Bahamas","acronym_countries":"BS"}, {"id_countries":"31","name_countries":"Bhutan","acronym_countries":"BT"}, {"id_countries":"32","name_countries":"Bouvet Island","acronym_countries":"BV"}, {"id_countries":"33","name_countries":"Botswana","acronym_countries":"BW"}, {"id_countries":"34","name_countries":"Belarus","acronym_countries":"BY"}, {"id_countries":"35","name_countries":"Belize","acronym_countries":"BZ"}, {"id_countries":"36","name_countries":"Canada","acronym_countries":"CA"}, {"id_countries":"37","name_countries":"Cocos (Keeling) Islands","acronym_countries":"CC"}, {"id_countries":"38","name_countries":"Congo, the Democratic Republic of the","acronym_countries":"CD"}, {"id_countries":"39","name_countries":"Central African Republic","acronym_countries":"CF"}, {"id_countries":"40","name_countries":"Congo","acronym_countries":"CG"}, {"id_countries":"41","name_countries":"Switzerland","acronym_countries":"CH"}, {"id_countries":"42","name_countries":"Cote D'Ivoire","acronym_countries":"CI"}, {"id_countries":"43","name_countries":"Cook Islands","acronym_countries":"CK"}, {"id_countries":"44","name_countries":"Chile","acronym_countries":"CL"}, {"id_countries":"45","name_countries":"Cameroon","acronym_countries":"CM"}, {"id_countries":"46","name_countries":"China","acronym_countries":"CN"}, {"id_countries":"47","name_countries":"Colombia","acronym_countries":"CO"}, {"id_countries":"48","name_countries":"Costa Rica","acronym_countries":"CR"}, {"id_countries":"49","name_countries":"Serbia and Montenegro","acronym_countries":"CS"}, {"id_countries":"50","name_countries":"Cuba","acronym_countries":"CU"}, {"id_countries":"51","name_countries":"Cape Verde","acronym_countries":"CV"}, {"id_countries":"52","name_countries":"Christmas Island","acronym_countries":"CX"}, {"id_countries":"53","name_countries":"Cyprus","acronym_countries":"CY"}, {"id_countries":"54","name_countries":"Czech Republic","acronym_countries":"CZ"}, {"id_countries":"55","name_countries":"Germany","acronym_countries":"DE"}, {"id_countries":"56","name_countries":"Djibouti","acronym_countries":"DJ"}, {"id_countries":"57","name_countries":"Denmark","acronym_countries":"DK"}, {"id_countries":"58","name_countries":"Dominica","acronym_countries":"DM"}, {"id_countries":"59","name_countries":"Dominican Republic","acronym_countries":"DO"}, {"id_countries":"60","name_countries":"Algeria","acronym_countries":"DZ"}, {"id_countries":"61","name_countries":"Ecuador","acronym_countries":"EC"}, {"id_countries":"62","name_countries":"Estonia","acronym_countries":"EE"}, {"id_countries":"63","name_countries":"Egypt","acronym_countries":"EG"}, {"id_countries":"64","name_countries":"Western Sahara","acronym_countries":"EH"}, {"id_countries":"65","name_countries":"Eritrea","acronym_countries":"ER"}, {"id_countries":"66","name_countries":"Spain","acronym_countries":"ES"}, {"id_countries":"67","name_countries":"Ethiopia","acronym_countries":"ET"}, {"id_countries":"68","name_countries":"Finland","acronym_countries":"FI"}, {"id_countries":"69","name_countries":"Fiji","acronym_countries":"FJ"}, {"id_countries":"70","name_countries":"Falkland Islands (Malvinas)","acronym_countries":"FK"}, {"id_countries":"71","name_countries":"Micronesia, Federated States of","acronym_countries":"FM"}, {"id_countries":"72","name_countries":"Faroe Islands","acronym_countries":"FO"}, {"id_countries":"73","name_countries":"France","acronym_countries":"FR"}, {"id_countries":"74","name_countries":"Gabon","acronym_countries":"GA"}, {"id_countries":"75","name_countries":"United Kingdom","acronym_countries":"GB"}, {"id_countries":"76","name_countries":"Grenada","acronym_countries":"GD"}, {"id_countries":"77","name_countries":"Georgia","acronym_countries":"GE"}, {"id_countries":"78","name_countries":"French Guiana","acronym_countries":"GF"}, {"id_countries":"79","name_countries":"Ghana","acronym_countries":"GH"}, {"id_countries":"80","name_countries":"Gibraltar","acronym_countries":"GI"}, {"id_countries":"81","name_countries":"Greenland","acronym_countries":"GL"}, {"id_countries":"82","name_countries":"Gambia","acronym_countries":"GM"}, {"id_countries":"83","name_countries":"Guinea","acronym_countries":"GN"}, {"id_countries":"84","name_countries":"Guadeloupe","acronym_countries":"GP"}, {"id_countries":"85","name_countries":"Equatorial Guinea","acronym_countries":"GQ"}, {"id_countries":"86","name_countries":"Greece","acronym_countries":"GR"}, {"id_countries":"87","name_countries":"South Georgia and the South Sandwich Islands","acronym_countries":"GS"}, {"id_countries":"88","name_countries":"Guatemala","acronym_countries":"GT"}, {"id_countries":"89","name_countries":"Guam","acronym_countries":"GU"}, {"id_countries":"90","name_countries":"Guinea-Bissau","acronym_countries":"GW"}, {"id_countries":"91","name_countries":"Guyana","acronym_countries":"GY"}, {"id_countries":"92","name_countries":"Hong Kong","acronym_countries":"HK"}, {"id_countries":"93","name_countries":"Heard Island and Mcdonald Islands","acronym_countries":"HM"}, {"id_countries":"94","name_countries":"Honduras","acronym_countries":"HN"}, {"id_countries":"95","name_countries":"Croatia","acronym_countries":"HR"}, {"id_countries":"96","name_countries":"Haiti","acronym_countries":"HT"}, {"id_countries":"97","name_countries":"Hungary","acronym_countries":"HU"}, {"id_countries":"98","name_countries":"Indonesia","acronym_countries":"ID"}, {"id_countries":"99","name_countries":"Ireland","acronym_countries":"IE"}, {"id_countries":"100","name_countries":"Israel","acronym_countries":"IL"}, {"id_countries":"101","name_countries":"India","acronym_countries":"IN"}, {"id_countries":"102","name_countries":"British Indian Ocean Territory","acronym_countries":"IO"}, {"id_countries":"103","name_countries":"Iraq","acronym_countries":"IQ"}, {"id_countries":"104","name_countries":"Iran, Islamic Republic of","acronym_countries":"IR"}, {"id_countries":"105","name_countries":"Iceland","acronym_countries":"IS"}, {"id_countries":"106","name_countries":"Italy","acronym_countries":"IT"}, {"id_countries":"107","name_countries":"Jamaica","acronym_countries":"JM"}, {"id_countries":"108","name_countries":"Jordan","acronym_countries":"JO"}, {"id_countries":"109","name_countries":"Japan","acronym_countries":"JP"}, {"id_countries":"110","name_countries":"Kenya","acronym_countries":"KE"}, {"id_countries":"111","name_countries":"Kyrgyzstan","acronym_countries":"KG"}, {"id_countries":"112","name_countries":"Cambodia","acronym_countries":"KH"}, {"id_countries":"113","name_countries":"Kiribati","acronym_countries":"KI"}, {"id_countries":"114","name_countries":"Comoros","acronym_countries":"KM"}, {"id_countries":"115","name_countries":"Saint Kitts and Nevis","acronym_countries":"KN"}, {"id_countries":"116","name_countries":"Korea, Democratic People's Republic of","acronym_countries":"KP"}, {"id_countries":"117","name_countries":"Korea, Republic of","acronym_countries":"KR"}, {"id_countries":"118","name_countries":"Kuwait","acronym_countries":"KW"}, {"id_countries":"119","name_countries":"Cayman Islands","acronym_countries":"KY"}, {"id_countries":"120","name_countries":"Kazakhstan","acronym_countries":"KZ"}, {"id_countries":"121","name_countries":"Lao People's Democratic Republic","acronym_countries":"LA"}, {"id_countries":"122","name_countries":"Lebanon","acronym_countries":"LB"}, {"id_countries":"123","name_countries":"Saint Lucia","acronym_countries":"LC"}, {"id_countries":"124","name_countries":"Liechtenstein","acronym_countries":"LI"}, {"id_countries":"125","name_countries":"Sri Lanka","acronym_countries":"LK"}, {"id_countries":"126","name_countries":"Liberia","acronym_countries":"LR"}, {"id_countries":"127","name_countries":"Lesotho","acronym_countries":"LS"}, {"id_countries":"128","name_countries":"Lithuania","acronym_countries":"LT"}, {"id_countries":"129","name_countries":"Luxembourg","acronym_countries":"LU"}, {"id_countries":"130","name_countries":"Latvia","acronym_countries":"LV"}, {"id_countries":"131","name_countries":"Libyan Arab Jamahiriya","acronym_countries":"LY"}, {"id_countries":"132","name_countries":"Morocco","acronym_countries":"MA"}, {"id_countries":"133","name_countries":"Monaco","acronym_countries":"MC"}, {"id_countries":"134","name_countries":"Moldova, Republic of","acronym_countries":"MD"}, {"id_countries":"135","name_countries":"Madagascar","acronym_countries":"MG"}, {"id_countries":"136","name_countries":"Marshall Islands","acronym_countries":"MH"}, {"id_countries":"137","name_countries":"Macedonia, the Former Yugoslav Republic of","acronym_countries":"MK"}, {"id_countries":"138","name_countries":"Mali","acronym_countries":"ML"}, {"id_countries":"139","name_countries":"Myanmar","acronym_countries":"MM"}, {"id_countries":"140","name_countries":"Mongolia","acronym_countries":"MN"}, {"id_countries":"141","name_countries":"Macao","acronym_countries":"MO"}, {"id_countries":"142","name_countries":"Northern Mariana Islands","acronym_countries":"MP"}, {"id_countries":"143","name_countries":"Martinique","acronym_countries":"MQ"}, {"id_countries":"144","name_countries":"Mauritania","acronym_countries":"MR"}, {"id_countries":"145","name_countries":"Montserrat","acronym_countries":"MS"}, {"id_countries":"146","name_countries":"Malta","acronym_countries":"MT"}, {"id_countries":"147","name_countries":"Mauritius","acronym_countries":"MU"}, {"id_countries":"148","name_countries":"Maldives","acronym_countries":"MV"}, {"id_countries":"149","name_countries":"Malawi","acronym_countries":"MW"}, {"id_countries":"150","name_countries":"Mexico","acronym_countries":"MX"}, {"id_countries":"151","name_countries":"Malaysia","acronym_countries":"MY"}, {"id_countries":"152","name_countries":"Mozambique","acronym_countries":"MZ"}, {"id_countries":"153","name_countries":"Namibia","acronym_countries":"NA"}, {"id_countries":"154","name_countries":"New Caledonia","acronym_countries":"NC"}, {"id_countries":"155","name_countries":"Niger","acronym_countries":"NE"}, {"id_countries":"156","name_countries":"Norfolk Island","acronym_countries":"NF"}, {"id_countries":"157","name_countries":"Nigeria","acronym_countries":"NG"}, {"id_countries":"158","name_countries":"Nicaragua","acronym_countries":"NI"}, {"id_countries":"159","name_countries":"Netherlands","acronym_countries":"NL"}, {"id_countries":"160","name_countries":"Norway","acronym_countries":"NO"}, {"id_countries":"161","name_countries":"Nepal","acronym_countries":"NP"}, {"id_countries":"162","name_countries":"Nauru","acronym_countries":"NR"}, {"id_countries":"163","name_countries":"Niue","acronym_countries":"NU"}, {"id_countries":"164","name_countries":"New Zealand","acronym_countries":"NZ"}, {"id_countries":"165","name_countries":"Oman","acronym_countries":"OM"}, {"id_countries":"166","name_countries":"Panama","acronym_countries":"PA"}, {"id_countries":"167","name_countries":"Peru","acronym_countries":"PE"}, {"id_countries":"168","name_countries":"French Polynesia","acronym_countries":"PF"}, {"id_countries":"169","name_countries":"Papua New Guinea","acronym_countries":"PG"}, {"id_countries":"170","name_countries":"Philippines","acronym_countries":"PH"}, {"id_countries":"171","name_countries":"Pakistan","acronym_countries":"PK"}, {"id_countries":"172","name_countries":"Poland","acronym_countries":"PL"}, {"id_countries":"173","name_countries":"Saint Pierre and Miquelon","acronym_countries":"PM"}, {"id_countries":"174","name_countries":"Pitcairn","acronym_countries":"PN"}, {"id_countries":"175","name_countries":"Puerto Rico","acronym_countries":"PR"}, {"id_countries":"176","name_countries":"Palestinian Territory, Occupied","acronym_countries":"PS"}, {"id_countries":"177","name_countries":"Portugal","acronym_countries":"PT"}, {"id_countries":"178","name_countries":"Palau","acronym_countries":"PW"}, {"id_countries":"179","name_countries":"Paraguay","acronym_countries":"PY"}, {"id_countries":"180","name_countries":"Qatar","acronym_countries":"QA"}, {"id_countries":"181","name_countries":"Reunion","acronym_countries":"RE"}, {"id_countries":"182","name_countries":"Romania","acronym_countries":"RO"}, {"id_countries":"183","name_countries":"Russian Federation","acronym_countries":"RU"}, {"id_countries":"184","name_countries":"Rwanda","acronym_countries":"RW"}, {"id_countries":"185","name_countries":"Saudi Arabia","acronym_countries":"SA"}, {"id_countries":"186","name_countries":"Solomon Islands","acronym_countries":"SB"}, {"id_countries":"187","name_countries":"Seychelles","acronym_countries":"SC"}, {"id_countries":"188","name_countries":"Sudan","acronym_countries":"SD"}, {"id_countries":"189","name_countries":"Sweden","acronym_countries":"SE"}, {"id_countries":"190","name_countries":"Singapore","acronym_countries":"SG"}, {"id_countries":"191","name_countries":"Saint Helena","acronym_countries":"SH"}, {"id_countries":"192","name_countries":"Slovenia","acronym_countries":"SI"}, {"id_countries":"193","name_countries":"Svalbard and Jan Mayen","acronym_countries":"SJ"}, {"id_countries":"194","name_countries":"Slovakia","acronym_countries":"SK"}, {"id_countries":"195","name_countries":"Sierra Leone","acronym_countries":"SL"}, {"id_countries":"196","name_countries":"San Marino","acronym_countries":"SM"}, {"id_countries":"197","name_countries":"Senegal","acronym_countries":"SN"}, {"id_countries":"198","name_countries":"Somalia","acronym_countries":"SO"}, {"id_countries":"199","name_countries":"Suriname","acronym_countries":"SR"}, {"id_countries":"200","name_countries":"Sao Tome and Principe","acronym_countries":"ST"}, {"id_countries":"201","name_countries":"El Salvador","acronym_countries":"SV"}, {"id_countries":"202","name_countries":"Syrian Arab Republic","acronym_countries":"SY"}, {"id_countries":"203","name_countries":"Swaziland","acronym_countries":"SZ"}, {"id_countries":"204","name_countries":"Turks and Caicos Islands","acronym_countries":"TC"}, {"id_countries":"205","name_countries":"Chad","acronym_countries":"TD"}, {"id_countries":"206","name_countries":"French Southern Territories","acronym_countries":"TF"}, {"id_countries":"207","name_countries":"Togo","acronym_countries":"TG"}, {"id_countries":"208","name_countries":"Thailand","acronym_countries":"TH"}, {"id_countries":"209","name_countries":"Tajikistan","acronym_countries":"TJ"}, {"id_countries":"210","name_countries":"Tokelau","acronym_countries":"TK"}, {"id_countries":"211","name_countries":"Timor-Leste","acronym_countries":"TL"}, {"id_countries":"212","name_countries":"Turkmenistan","acronym_countries":"TM"}, {"id_countries":"213","name_countries":"Tunisia","acronym_countries":"TN"}, {"id_countries":"214","name_countries":"Tonga","acronym_countries":"TO"}, {"id_countries":"215","name_countries":"Turkey","acronym_countries":"TR"}, {"id_countries":"216","name_countries":"Trinidad and Tobago","acronym_countries":"TT"}, {"id_countries":"217","name_countries":"Tuvalu","acronym_countries":"TV"}, {"id_countries":"218","name_countries":"Taiwan, Province of China","acronym_countries":"TW"}, {"id_countries":"219","name_countries":"Tanzania, United Republic of","acronym_countries":"TZ"}, {"id_countries":"220","name_countries":"Ukraine","acronym_countries":"UA"}, {"id_countries":"221","name_countries":"Uganda","acronym_countries":"UG"}, {"id_countries":"222","name_countries":"United States Minor Outlying Islands","acronym_countries":"UM"}, {"id_countries":"223","name_countries":"United States","acronym_countries":"US"}, {"id_countries":"224","name_countries":"Uruguay","acronym_countries":"UY"}, {"id_countries":"225","name_countries":"Uzbekistan","acronym_countries":"UZ"}, {"id_countries":"226","name_countries":"Holy See (Vatican City State)","acronym_countries":"VA"}, {"id_countries":"227","name_countries":"Saint Vincent and the Grenadines","acronym_countries":"VC"}, {"id_countries":"228","name_countries":"Venezuela","acronym_countries":"VE"}, {"id_countries":"229","name_countries":"Virgin Islands, British","acronym_countries":"VG"}, {"id_countries":"230","name_countries":"Virgin Islands, U.s.","acronym_countries":"VI"}, {"id_countries":"231","name_countries":"Viet Nam","acronym_countries":"VN"}, {"id_countries":"232","name_countries":"Vanuatu","acronym_countries":"VU"}, {"id_countries":"233","name_countries":"Wallis and Futuna","acronym_countries":"WF"}, {"id_countries":"234","name_countries":"Samoa","acronym_countries":"WS"}, {"id_countries":"235","name_countries":"Yemen","acronym_countries":"YE"}, {"id_countries":"236","name_countries":"Mayotte","acronym_countries":"YT"}, {"id_countries":"237","name_countries":"South Africa","acronym_countries":"ZA"}, {"id_countries":"238","name_countries":"Zambia","acronym_countries":"ZM"}, {"id_countries":"239","name_countries":"Zimbabwe","acronym_countries":"ZW"}
        ];

        return {
            getCountries: getCountries
        };

        function getCountries() {
            return isoCountriesForView;
        }

    }

})();
