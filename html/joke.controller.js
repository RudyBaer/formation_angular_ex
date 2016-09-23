(function() {
    'use strict';

    angular
        .module('monapp')
        .controller('JokeController', JokeController);

    JokeController.$inject = ['jokeService'];
    function JokeController(jokeService) {
        var vm = this;
        vm.name = "Kevin";
        vm.jokes= [];
        vm.addJoke = addJoke;

        activate();

        function activate() {
            jokeService.getJokes().then(function (data) {
                vm.jokes = data;
            });
        }

        function addJoke(joke) {
            jokeService.addJoke(joke).then(function () {
                var j = {};
                j.txt = joke;
                j.date = new Date();
                vm.jokes.push(j);
                vm.joke = "";
            })
        }

    }

})();