(function () {
    'use strict';


    angular
        .module('monapp')
        .directive('jokeHistory', jokeHistory);

    function jokeHistory() {
        var directive = {
            replace: true,
            restrict: 'EA',
            templateUrl: 'joke-history.html',
            scope: {
                "jokes": "="
            },
            controller: jokeHistoryController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    jokeHistoryController.$inject = ['$http'];

    /* @ngInject */
    function jokeHistoryController($http) {
        var vm = this;
        vm.predicate = '';
        vm.reverse = false;

        vm.order = order;
        vm.addFavorite = addFavorite;
        vm.removeFavorite = removeFavorite;
        vm.plusOne = plusOne;


        function plusOne(joke) {

            if (joke.score == undefined) {
                joke.score = 0;
            }
            joke.score += 1;
            updateJoke(joke);
        }


        function removeFavorite(joke) {
            joke.favorite = false;
            updateJoke(joke);
        }


        function addFavorite(joke) {
            joke.favorite = true;
            updateJoke(joke);
        }

        function order(order) {
            vm.predicate = order;
            vm.reverse = !vm.reverse;
        }

        function updateJoke(joke) {
            $http.put('api/joke', joke)
                .then(function (data) {

                })
                .catch(function (data, status, headers, config) {
                    console.log(data);
                });
        }



    }
})();
