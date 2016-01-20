(function() {
  
  var myControllers = angular.module('myControllers', []);

  myControllers.controller('changePageController', ['$scope', '$routeParams',
    function($scope, $routeParams) {
      //$scope.phoneId = $routeParams.phoneId;
    }
  ]);

})();