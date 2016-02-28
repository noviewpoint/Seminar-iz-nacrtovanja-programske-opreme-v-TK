(function() {
    "use strict";

    angular
        .module("minesweeper")
        .controller("MenuController", MenuController)
        .controller("ModalInstanceRulesController", ModalInstanceRulesController)
        .controller("ModalInstanceSetDifficultyController", ModalInstanceSetDifficultyController)
        .controller("GameController", GameController)
        .controller("ModalInstanceNewResultController", ModalInstanceNewResultController)
        .controller("HighscoresController", HighscoresController)
        .controller("PrijavaController", PrijavaController);

    function MenuController($location, $scope, $uibModal, $state) {
        console.log("In MenuController");
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
        console.log("In ModalInstanceRulesController");
        var self = this; // brez rabe angular.bind
    }

    function ModalInstanceSetDifficultyController($state, $scope, $uibModalInstance, gameSettingsService) {
        console.log("In ModalInstanceSetDifficultyController");
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
            gameSettingsService.setDifficultyIndex(x.index);
            $state.go("game");
        }
    }

    function GameController($scope, $uibModal, $state, gameSettingsService) {
        console.log("In GameController");
        var self = this; // brez rabe angular.bind

        /* dostopno iz DOMa prek $scope */
        $scope.getUserInputs = gameSettingsService.getDifficultyIndex;
        $scope.setTime = gameSettingsService.setTime;
        $scope.openModalNewResult = openModalNewResult;

        drawFields();

        function openModalNewResult() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "partials/modal_new_result.html",
                controller: "ModalInstanceNewResultController",
                controllerAs: "MINRCtrl",
                size: "lg",
                resolve: {
                    wtf: function() {
                        return $scope
                    }
                }
            });
        }
    }

    function ModalInstanceNewResultController($scope, $uibModalInstance, $state, gameSettingsService, $timeout, restService) {
        console.log("In ModalInstanceNewResultController");
        var self = this; // brez rabe angular.bind

        self.vnos = "David";
        self.getTime = gameSettingsService.getTime();
        self.okModal = okModal;
        self.cancelModal = cancelModal;

        $timeout(function() {
            $("#vpisiIme").focus();
        }, 10);

        function okModal() {
            console.log(self.vnos);
            var poslano = {
                username: self.vnos,
                difficulty: gameSettingsService.getDifficultyIndex(),
                score: self.getTime
            };
            restService.postScore(poslano);
            $uibModalInstance.close();
            $state.reload("game");
        }

        function cancelModal() {
            $uibModalInstance.dismiss('cancel');
            $state.reload("game");
        }

        //$state.reload("game");
        //$uibModalInstance.close();
    }

    function HighscoresController(restService) {
        console.log("In HighscoresController");
        var self = this; // brez rabe angular.bind

        restService.requestScores()
            .then(function(response) {
                console.log("Success in function restService.requestScores", response);
                self.x = response.data;
            }, function(reponse) {
                console.log("Error in function restService.requestScores", response);
            });
    }

    function PrijavaController($cookies, restService, $http, $q) {
        console.log("In PrijavaController");
        var vm = this;

        vm.postFormRegister = postFormRegister;
        vm.postFormLogin = postFormLogin;
        vm.poniji;

        function postFormRegister()  {
            console.log("In function postFormRegister");
            restService.postFormRegister(vm.piskot).
                then(function(successResponse) {
                    console.log("It's a success :)", successResponse.data);
                }, function(errorResponse) {
                    console.log("It's an error :('", errorResponse);
                });
        }

        function postFormLogin()  {
            console.log("In function postFormLogin");
            restService.postFormLogin(vm.piskot).
                then(function(successResponse) {
                    console.log("It's a success :)", successResponse.data);
                }, function(errorResponse) {
                    console.log("It's an error :('", errorResponse);
                });
        }

        //$cookies.put("geslo", "abc123");
        //$cookies.remove("geslo", []);

        var x = {
            "js_username" : "markoskace",
            "js_password" : "plaintextmothaphucker",
            "js_country" : "Slovenija"
        };

        // za koliko casa se shrani piskot?
        //$cookies.putObject("uporabniskiPodatki", x, []);

        vm.piskot = $cookies.getObject("uporabniskiPodatki");

        /*restService.dobiPonije()
        .then(function(successResponse) {
            console.log("dobil ponije");
            vm.poniji = successResponse.data;
        });*/

        var getPoneys = function() {

            var defer = $q.defer();

            $http.get("js/poniji.json")
                .then(function(successResponse) {
                    console.log("dobil ponije success");
                    defer.resolve(successResponse.data);
                }, function(errorResponse) {
                    console.log("dobil ponije error");
                    defer.reject(successResponse.data);
                });

            return defer.promise;
        };

        vm.poniji = getPoneys();


    }

})();
