(function() {
    "use strict";

    angular
        .module("minesweeper")
        .controller("MenuController", MenuController)
        .controller("ModalInstanceRulesController", ModalInstanceRulesController)
        .controller("ModalInstanceSetDifficultyController", ModalInstanceSetDifficultyController)
        .controller("GameController", GameController)
        .controller("ModalInstanceNewResultController", ModalInstanceNewResultController)
        .controller("HighscoresController", HighscoresController);

    function MenuController($scope, $uibModal, $state) {
        console.log("In controller MenuController");
        var self = this; // brez rabe angular.bind

        self.openModalRules = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "partials/modal_rules.html",
                controller: "ModalInstanceRulesController",
                controllerAs: "MIRCtrl",
                size: "lg"
            });
        };

        self.openModalSetDifficulty = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "partials/modal_set_difficulty.html",
                controller: "ModalInstanceSetDifficultyController",
                controllerAs: "MISDCtrl",
                size: "lg"
            });
        };

    }

    function ModalInstanceRulesController($scope, $uibModalInstance) {
        console.log("In controller ModalInstanceRulesController");
        var self = this; // brez rabe angular.bind
    }

    function ModalInstanceSetDifficultyController($scope, $uibModalInstance) {
        console.log("In controller ModalInstanceSetDifficultyController");
        var self = this; // brez rabe angular.bind
        self.difficulties = ["Lahko | 9x9 | 10 min", "Srednje | 16x16 | 40 min", "Težko | 30x16 | 99min"];
    }

    function GameController($scope, $uibModal, $state) {
        console.log("In controller GameController");
        var self = this; // brez rabe angular.bind

        drawFields();

        /* dostopno iz DOMa */

        $scope.openModalNewResult = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "partials/modal_new_result.html",
                controller: "ModalInstanceNewResultController",
                controllerAs: "MINRCtrl",
                size: "lg"
            });
        };
    }

    function ModalInstanceNewResultController($scope, $uibModalInstance, $state) {
        console.log("In controller ModalInstanceNewResult");
        var self = this; // brez rabe angular.bind

        $state.reload("game");
    }

    function HighscoresController(restService) {
        console.log("In controller HighscoresController");
        var self = this; // brez rabe angular.bind

        restService.requestScores()
            .success(function(data, status, headers, config) {
                // The API call to the back-end was successful (i.e. a valid session)
                console.log("Success in function restService.requestScores");
                self.x = data;
                console.table(self.x);
            })
            .error(function(data, status, headers, config) {
                console.log("Error in function restService.requestScores");
            });
    }

})();
