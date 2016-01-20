(function() {
    "use strict";

    angular
        .module("minesweeper", ["ui.router", "ui.bootstrap"])
        .config(config)
        .run(run);

    function config($urlRouterProvider, $stateProvider) {
        // For any unmatched url, redirect
        $urlRouterProvider
            .otherwise("/");

        $stateProvider
            .state("menu", {
                url: "/",
                templateUrl: "partials/menu.html",
                controller: "MenuController",
                controllerAs: "MenuCtrl"
            })
            .state("game", {
                url: "/game",
                templateUrl: "partials/game.html",
                controller: "GameController",
                controllerAs: "GameCtrl"
            })
            .state("highscores", {
                url: "/highscores",
                templateUrl: "partials/highscores.html",
                controller: "HighscoresController",
                controllerAs: "HighscoresCtrl"
            })
    }

    function run($location) {
        // ob reloadu se aplikacija vedno postavi na zacetek
        $location.path("/");
    }

})();
