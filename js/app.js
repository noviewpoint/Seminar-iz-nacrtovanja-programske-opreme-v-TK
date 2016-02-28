(function() {
    "use strict";

    angular
        .module("minesweeper", ["ui.router", "ui.bootstrap", "ngCookies"])
        .config(config)
        .run(run);

    function config($urlRouterProvider, $stateProvider) {
        // For any unmatched url, redirect
        $urlRouterProvider
            .otherwise("/");

        $stateProvider
            .state("prijava", {
                url: "/",
                templateUrl: "partials/prijava.html",
                controller: "PrijavaController",
                controllerAs: "PrijavaCtrl"
            })
            .state("menu", {
                url: "/menu",
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

    function run($location, $rootScope) {
        // ob reloadu se aplikacija vedno postavi na zacetek
        $location.path("/");

        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            console.log("Application has switched from state", fromState, "to state", toState);
        });
    }

})();
