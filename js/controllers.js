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

    function MenuController($location, $scope, $uibModal, $state) {
        console.log("In controller MenuController");
        var self = this; // brez rabe angular.bind

        self.openModalRules = openModalRules;
        self.openModalSetDifficulty = openModalSetDifficulty;

        function openModalRules() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "partials/modal_rules.html",
                controller: "ModalInstanceRulesController",
                controllerAs: "MIRCtrl",
                size: "lg"
            });
        }

        function openModalSetDifficulty() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "partials/modal_set_difficulty.html",
                controller: "ModalInstanceSetDifficultyController",
                controllerAs: "MISDCtrl",
                size: "lg"
            });
        }
    }

    function ModalInstanceRulesController($scope, $uibModalInstance) {
        console.log("In controller ModalInstanceRulesController");
        var self = this; // brez rabe angular.bind
    }

    function ModalInstanceSetDifficultyController($state, $scope, $uibModalInstance, gameSettings) {
        console.log("In controller ModalInstanceSetDifficultyController");
        var self = this; // brez rabe angular.bind

        self.difficulties = [
            {
                "tekst" : "Lahko | 9x9 | 10 min",
                "index" : 1
            },
            {
                "tekst" : "Srednje | 16x16 | 40 min",
                "index" : 2
            },
            {
                "tekst" : "Težko | 30x16 | 99min",
                "index" : 3
            }
        ];
        self.setDifficulty = setDifficulty;

        function setDifficulty(x) {
            $uibModalInstance.close();
            console.log(x);
            gameSettings.setDifficultyIndex(x.index);
            $state.go("game");
        }
    }

    function GameController($scope, $uibModal, $state, gameSettings) {
        console.log("In controller GameController");
        var self = this; // brez rabe angular.bind

        /* dostopno iz DOMa prek $scope */
        $scope.getUserInputs = gameSettings.getDifficultyIndex;
        $scope.setTime = gameSettings.setTime;
        $scope.openModalNewResult = openModalNewResult;

        drawFields();

        function openModalNewResult() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "partials/modal_new_result.html",
                controller: "ModalInstanceNewResultController",
                controllerAs: "MINRCtrl",
                size: "lg"
            });
        }
    }

    function ModalInstanceNewResultController($scope, $uibModalInstance, $state, gameSettings) {
        console.log("In controller ModalInstanceNewResult");
        var self = this; // brez rabe angular.bind

        $scope.getTime = gameSettings.getTime();

        //$state.reload("game");
    }

    function HighscoresController(restService) {
        console.log("In controller HighscoresController");
        var self = this; // brez rabe angular.bind

        restService.requestScores()
            .then(function(response) {
                console.log("Success in function restService.requestScores", response);
                self.x = response.data;
            }, function(reponse) {
                console.log("Error in function restService.requestScores", response);
            });
    }

})();
