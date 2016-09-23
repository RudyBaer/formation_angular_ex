(function () {
    'use strict';

    angular
        .module('monapp')
        .factory('jokeService', JokeService);


    JokeService.$inject = ['$http', '$q'];
    function JokeService($http, $q) {

        var jokeService = {};
        jokeService.getJokes = function () {
            var defer = $q.defer();
            $http.get('api/joke')
                .then(function (response) {
                    defer.resolve(response.data);
                })
                .catch(function (data, status, headers, config) {
                console.log(data);
            });
            return defer.promise;
        };

        jokeService.addJoke = function (joke) {
            var defer = $q.defer();
            console.log(joke);

            var j = {};
            j.txt = joke;
            j.date = new Date();
            $http.post('api/joke', j)
                .then(function (data) {
                    defer.resolve();
                })
                .catch(function (data, status, headers, config) {
                defer.reject();
                console.log(data);
            });
            return defer.promise;
        };

        return jokeService;
    }
})
();