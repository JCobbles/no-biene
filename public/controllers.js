angular.module('myApp')
    .controller('HomepageController', HomepageController)
    .controller('CauseCreationController', CauseCreationController)
    .controller('ViewCauseController', ViewCauseController)
    .controller('PopulateController', PopulateController)
    .controller('LoginController', LoginController);

HomepageController.$inject = ['$scope', '$http'];
CauseCreationController.$inject = ['$scope', '$http'];

function HomepageController($scope, $http) {
    $scope.formData = {};

    $http.get('/api/causes/list')
        .success(function(data) {
            $scope.causes = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}

function CauseCreationController($scope, $http) {
    $scope.create = function(cause) {
        $http.post('/api/causes/create', { cause: cause }, function(data) {
            console.log(data);
        });
    };
}

function ViewCauseController($scope, $http, $routeParams) {
    $http.get('/api/causes/find/' + $routeParams.id)
        .success(function(cause) {
            $scope.cause = cause;
        })
        .error(function(error) {
            console.log(error);
        });
        console.log(JSON.parse(window.localStorage.getItem("user")));
    $scope.normalUser = window.localStorage.getItem("user") != undefined && 
        JSON.parse(window.localStorage.getItem("user")).type == "normal";
}

function PopulateController($scope, $http) {
    $http.get('/populate', function(data) {
        console.log(data);
    });
}

function LoginController($scope, $http) {
    $scope.login = function(user) {
        $http.post('/api/users/create', { user })
            .success(function(data) {
                $scope.loggedIn = true;
                window.localStorage.setItem("user", JSON.stringify(data.user));
            });
    };
}