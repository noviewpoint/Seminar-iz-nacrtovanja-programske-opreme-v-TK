(function() {

  var minesweeper_app = angular.module("minesweeper_app", ["ngRoute", "myControllers"]);

  minesweeper_app.config(["$routeProvider",
    function($routeProvider) {

      $routeProvider
        .when('/', {
          templateUrl: "minesweeper/partials/igra.html", 
          controller: "changePageController"
        })
        .otherwise({
          redirectTo:'/'
        });
        
    }]);

})();
