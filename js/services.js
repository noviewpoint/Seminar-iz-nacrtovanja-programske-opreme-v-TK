(function() {
    "use strict";

    angular
        .module("minesweeper")
        .service("restService", restService);

    function restService($http) {
        console.log("In service restService");
        var self = this; // brez rabe angular.bind

        // vse spodaj so ASYNCANI REQUESTI!
        // privzeto angularjs naredi headers: {"Content-Type": "application/json"}
        // GET caching in browser

        return {
            postScore: function(x) {
                return $http({method: "POST", url: "http://nacomnet.lucami.org/test/api/php/post_score.php", data: x});
            },
            requestScores: function() {
                return $http({method: "GET", url: "http://nacomnet.lucami.org/test/api/php/request_scores.php"});
            }
        };
    }

})();
