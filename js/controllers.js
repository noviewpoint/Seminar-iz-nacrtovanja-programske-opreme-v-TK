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
        .controller("PrijavaController", PrijavaController)
        .controller("ModalWrongPasswordController", ModalWrongPasswordController)
        .controller("ModalNotExistController", ModalNotExistController)
        .controller("RegistracijaController", RegistracijaController)
        .controller("ModalInstanceRegistracijaController", ModalInstanceRegistracijaController);

    function MenuController($uibModal) {
        console.log("In MenuController");
        var vm = this; // brez rabe angular.bind

        vm.openModalRules = openModalRules;
        vm.openModalSetDifficulty = openModalSetDifficulty;

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
        // tu se nic ne dogaja, zgolj staticni prikaz vsebine
    }

    function ModalInstanceSetDifficultyController($state, $scope, $uibModalInstance, gameSettingsService) {
        console.log("In ModalInstanceSetDifficultyController");
        var vm = this;

        vm.difficulties = [{
            "tekst" : "Lahko | 9x9 | 10 min",
            "index" : 1
        }, {
            "tekst" : "Srednje | 16x16 | 40 min",
            "index" : 2
        }, {
            "tekst" : "Težko | 30x16 | 99min",
            "index" : 3
        }];

        vm.setDifficulty = setDifficulty;

        function setDifficulty(x) {
            $uibModalInstance.close();
            gameSettingsService.setDifficultyIndex(x.index);
            $state.go("game");
        }
    }

    function GameController($scope, $uibModal, $state, gameSettingsService) {
        console.log("In GameController");
        var vm = this;

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
                size: "lg"
            });
        }
    }

    function ModalInstanceNewResultController($uibModalInstance, $state, gameSettingsService, $timeout, restService) {
        console.log("In ModalInstanceNewResultController");
        var vm = this;

        vm.getTime = gameSettingsService.getTime();
        vm.okModal = okModal;
        vm.besedilo = "ok";

        var poslano = {
            username: gameSettingsService.getUserData().username,
            country: gameSettingsService.getUserData().country.name_countries,
            difficulty: gameSettingsService.getDifficultyIndex(),
            score: vm.getTime
        };
        restService.postScore(poslano)
            .then(function(successResponse) {
                var linije = successResponse.data;
                vm.besedilo = linije.substring(linije.indexOf("Čestitke"));

            }, function(errResponse) {
                console.log("Napaka", errResponse);
            });

        function okModal() {
            $uibModalInstance.close();
            $state.reload("game");
        }

    }

    function HighscoresController(restService, gameSettingsService) {
        console.log("In HighscoresController");
        var vm = this;
        var zastavica = true;

        // privzeto prikaze easy highscore
        vm.tezavnost = 1;

        vm.rezultati = [];
        var x = [];
        var y = [];
        vm.userjeveTezavnosti = userjeveTezavnosti;

        restService.requestScores()
            .then(function(response) {
                console.log("Success in function restService.requestScores", response);
                x = response.data;
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].username_users === gameSettingsService.getUserData().username) {
                        y.push(response.data[i]);
                    }
                }
                vm.rezultati = x;
            }, function(reponse) {
                console.log("Error in function restService.requestScores", response);
            });

        function userjeveTezavnosti() {

            if(zastavica) {
                vm.rezultati = y;
                document.getElementById("userjeveTezavnosti").style.backgroundColor = "#DEAE57";
                zastavica = false;
            } else {
                vm.rezultati = x;
                document.getElementById("userjeveTezavnosti").style.backgroundColor = "rgb(201, 201, 201)";
                zastavica = true;
            }


        }
    }

    function PrijavaController($state, $cookies, restService, gameSettingsService, countriesService, $http, $uibModal) {
        console.log("In PrijavaController");
        var vm = this;

        // ce necesa ni v local storigu, je vrednost null
        vm.dataModel = JSON.parse(localStorage.getItem('uporabnikovi_podatki'));
        console.log(vm.dataModel);
        //vm.dataModel = $cookies.getObject("uporabniskiPodatki");
        if (!vm.dataModel) {
            vm.dataModel = {
                "username": null,
                "password": null,
                "country": {
                    id_countries: null,
                    acronym_countries: null,
                    name_countries: null
                }
            };
        }


        vm.postFormLogin = postFormLogin;
        vm.countries = countriesService.getCountries();

        // da dela preselectanje
        vm.dataModel.country = vm.countries[parseInt(vm.dataModel.country.id_countries) - 1];

        function postFormLogin()  {
            console.log("In function postFormLogin");
            console.log("Before function vm.logout");
            restService.logout()
                .then(function(successResponse) {
                    console.log("successResponse");
                    restService.postFormLogin(vm.dataModel)
                        .then(function(successResponse) {
                            console.log("It's a success :)", successResponse.data);
                            var linije = successResponse.data;
                            if (linije.match(/Uspešen login/g)) {
                                console.log("Uspešen login!");


                                //console.log("Shranjujem podatke v cookie");
                                //$cookies.putObject("uporabniskiPodatki", vm.dataModel);

                                console.log("Shranjujem podatke v Local Storage");
                                localStorage.setItem('uporabnikovi_podatki', JSON.stringify(vm.dataModel));


                                gameSettingsService.setUserData(vm.dataModel);
                                $state.go("menu");
                            }

                            if (linije.match(/Napačno geslo/g)) {
                                console.log("Napačno geslo!");
                                openModalNapacnoGeslo();
                            }

                            if (linije.match(/ne obstaja/g)) {
                                console.log("Uporabnik ne obstaja!");
                                openModalNeObstaja();
                            }

                        }, function(errorResponse) {
                            console.log("It's an error :(", errorResponse);
                        });

                }, function(errorResponse) {
                    console.log("errorResponse");
                });
        }
        // $cookies.remove("geslo", []);

        function openModalNapacnoGeslo(x) {
            vm.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "partials/modal_napacno_geslo.html",
                size: "lg",
                controller: "ModalWrongPasswordController",
                controllerAs: "MWPCtrl"
            });
        }
        function openModalNeObstaja(x) {
            vm.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "partials/modal_ne_obstaja.html",
                size: "lg",
                controller: "ModalNotExistController",
                controllerAs: "MNECtrl"
            });
        }

    }

    function ModalWrongPasswordController($uibModalInstance) {
        console.log("In ModalWrongPasswordController");
        var vm = this;

        vm.okModal = okModal;

        function okModal() {
            $uibModalInstance.close();
        }

    }

    function ModalNotExistController($uibModalInstance) {
        console.log("In ModalNotExistController");
        var vm = this;

        vm.okModal = okModal;

        function okModal() {
            $uibModalInstance.close();
        }

    }


    function RegistracijaController($state, $cookies, restService, gameSettingsService, countriesService, $uibModal) {
        console.log("In RegistracijaController");
        var vm = this;

        /* $timeout(function() {
            $("#vpisiIme").focus();
        }, 10); */

        vm.postFormRegister = postFormRegister;
        vm.countries = countriesService.getCountries();

        // vedno prazna polja ob registraciji
        vm.dataModel = {
            "username": null,
            "password": null,
            "country": null
        };

        vm.passwordDrugic = "";

        function postFormRegister()  {
            console.log("In function postFormRegister");

            if(vm.passwordDrugic != vm.dataModel.password) {
                alert("Passworda se ne ujemata!");
            }

            restService.postFormRegister(vm.dataModel).
                then(function(successResponse) {
                    console.log("It's a success :)", successResponse.data);
                    var linije = successResponse.data;
                    if (linije.match(/Registracija uspešna/g)) {
                        console.log("Uspešna registracija!");


                        //console.log("Shranjujem podatke v cookie");
                        //$cookies.putObject("uporabniskiPodatki", vm.dataModel);

                        console.log("Shranjujem podatke v Local Storage");
                        localStorage.setItem('uporabnikovi_podatki', JSON.stringify(vm.dataModel));


                        openModalRegistracija(true);
                    }
                }, function(errorResponse) {
                    openModalRegistracija(false);
                    console.log("It's an error :(", errorResponse);
                });
        }

        function openModalRegistracija(x) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "partials/modal_registracija.html",
                controller: "ModalInstanceRegistracijaController",
                controllerAs: "MIRCtrl",
                size: "lg"
            });
        }
    }

    function ModalInstanceRegistracijaController($uibModalInstance, $state) {
        console.log("In ModalInstanceRegistracijaController");
        var vm = this;

        vm.okModal = okModal;

        function okModal() {
            $uibModalInstance.close();
            $state.go("prijava");
        }

    }

})();
