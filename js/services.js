(function() {
    "use strict";

    angular
        .module("minesweeper")
        .service("restService", restService)
        .service("gameSettingsService", gameSettingsService);

    function restService($http) {
        console.log("In restService");

        return {
            postScore: postScore,
            requestScores: requestScores,
            postFormRegister: postFormRegister,
            postFormLogin: postFormLogin,
            dobiPonije: dobiPonije
        }

        // vse spodaj so ASYNCANI REQUESTI!
        // privzeto angular naredi headers: {"Content-Type": "application/json"}
        // GET caching in browser

        function postScore(x) {
            console.log("V post score", x);
            return $http({method: "POST", url: "http://www.genics.eu/androidApp/php/post_score.php", data: x});
        }
        function requestScores() {
            return $http({method: "GET", url: "http://www.genics.eu/androidApp/php/request_scores.php"});
        }
        function postFormRegister(x) {
            return $http({
                method: "POST",
                url: "php/registracija.php",
                data: "username=" + encodeURIComponent(x.js_username) + "&password=" + encodeURIComponent(x.js_password) + "&country=" + encodeURIComponent(x.js_country),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
            });
            // header tak ker gre za form serialized data?
        }
        function postFormLogin(x) {
            return $http({
                method: "POST",
                url: "php/prijava.php",
                data: "username=" + encodeURIComponent(x.js_username) + "&password=" + encodeURIComponent(x.js_password) + "&country=" + encodeURIComponent(x.js_country),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
            });
            // header tak ker gre za form serialized data?
        }

        function dobiPonije() {
            return $http({method: "GET", url: "js/poniji.json"});
        }

    }

    function gameSettingsService() {
        console.log("In gameSettingsService");

        var difficultyIndex = 0;

        var time = 0;

        return {
            getDifficultyIndex: getDifficultyIndex,
            setDifficultyIndex: setDifficultyIndex,

            getTime: getTime,
            setTime: setTime
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
    }

})();
