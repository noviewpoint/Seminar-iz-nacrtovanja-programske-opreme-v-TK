(function() {
    "use strict";

    angular
        .module("minesweeper")
        .service("restService", restService)
        .service("gameSettings", gameSettings);

    function restService($http) {
        console.log("In service restService");
        var self = this; // brez rabe angular.bind

        // vse spodaj so ASYNCANI REQUESTI!
        // privzeto angularjs naredi headers: {"Content-Type": "application/json"}
        // GET caching in browser

        return {
            postScore: function(x) {
                return $http({method: "POST", url: "http://nacomnet.lucami.org/test/PKPPZ/api/php/post_score.php", data: x});
            },
            requestScores: function() {
                return $http({method: "GET", url: "http://nacomnet.lucami.org/test/PKPPZ/api/php/request_scores.php"});
            }
        };
    }

    function gameSettings() {
        console.log("In service gameSettings");
        var self = this; // brez rabe angular.bind

        self.difficultyIndex = 0;
        self.seconds = 0;
        self.minutes = 0;
        self.hours = 0;

        return {
            getDifficultyIndex: getDifficultyIndex,
            setDifficultyIndex: setDifficultyIndex,

            getTime: getTime,
            setTime: setTime
        };

        function getDifficultyIndex() {
            return self.difficultyIndex;
        }

        function setDifficultyIndex(x) {
            self.difficultyIndex = x;
        }

        function getTime() {
            return {
                seconds: self.seconds,
                minutes: self.minutes,
                hours: self.hours
            };
        }

        function setTime(seconds, minutes, hours) {
            console.log("Angular prejel cas", seconds, minutes, hours);
            self.seconds = seconds;
            self.minutes = minutes;
            self.hours = hours;
        }
    }

})();
