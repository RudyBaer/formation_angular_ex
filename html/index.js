var app = angular.module("monapp", []);

app.config(function (localStorageServiceProvider) {

});

app.run(function(localStorageService){

});


app.controller("main", ['$scope',  'jokeService', function ($scope, jokeService) {
        $scope.name = "Kevin";
        $scope.jokes = [];


        jokeService.getJokes().then(function (data) {
            $scope.jokes = data;
        });



        $scope.addJoke = function (joke) {

            jokeService.addJoke(joke).then(function () {
                var j = {};
                j.txt = joke;
                j.date = new Date();
                $scope.jokes.push(j);
                $scope.joke = "";
            })

        };

        $scope.predicate = '';
        $scope.reverse = false;
        $scope.order = function (order) {
            $scope.predicate = order;
            $scope.reverse = !$scope.reverse;
        }

    }]
);

app.controller("jokeController", ['$scope', '$http', function ($scope, $http) {
        $scope.addFavorite = function (joke) {
            joke.favorite = true;
            updateJoke(joke);
        };

        $scope.removeFavorite = function (joke) {
            joke.favorite = false;
            updateJoke(joke);
        };

        $scope.plusOne = function (joke) {

            if (joke.score == undefined) {
                joke.score = 0;

            }
            joke.score = 1;
            updateJoke(joke);
        };


        var updateJoke = function (joke) {
            $http.put('api/joke', joke)
                .then(function (data) {

                })
                .catch(function (data, status, headers, config) {
                    console.log(data);
                });
        };
    }]
);


app.factory("jokeService", ['$http', '$q', function ($http, $q) {
    var jokeService = {};
    jokeService.getJokes = function () {
        var defer = $q.defer();
        $http.get('api/joke')
            .then(function (data) {

                defer.resolve(data);
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
]);