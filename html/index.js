var app = angular.module("monapp", ['LocalStorageModule']);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('yourAppName')
        .setStorageType('sessionStorage');
});

app.run(function(localStorageService){
    localStorageService.set("truc", "machin");

});


app.controller("main", ['$scope', '$http', function ($scope, $http) {
        $scope.name = "Kevin";
        $scope.jokes = [];

        //
        $http.get('api/joke')
            .then(function (data) {
                $scope.jokes = data;
            })
            .catch(function (data, status, headers, config) {
                console.log(data);
            });



        $scope.addJoke = function (joke) {
            console.log(joke);
            $scope.joke = "";

            var j = {};
            j.txt = joke;
            j.date = new Date();

            $http.post('api/joke', j)
                .then(function (data) {
                    $scope.jokes.push(j);
                    $scope.joke = "";
                })
                .catch(function (data, status, headers, config) {
                    console.log(data);
                });
        };

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