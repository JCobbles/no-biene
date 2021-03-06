angular.module('myApp')
    .controller('HomepageController', HomepageController)
    .controller('CauseCreationController', CauseCreationController)
    .controller('ViewCauseController', ViewCauseController)
    .controller('PopulateController', PopulateController)
    .controller('LoginController', LoginController)
    .controller('LogoutController', LogoutController);

HomepageController.$inject = ['$scope', '$http'];
CauseCreationController.$inject = ['$scope', '$http', '$location'];
LogoutController.$inject = ['$scope', '$http', '$window'];
ViewCauseController.$inject = ['$scope', '$http', '$routeParams', '$window'];

function HomepageController($scope, $http) {
    $scope.formData = {};


    $http.get('/api/causes/list')
        .success(function(data) {
            $scope.causes = data;
            populateMap(undefined);
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}

function CauseCreationController($scope, $http, $location) {
    $scope.loggedIn = window.localStorage.getItem("user") !== undefined && window.localStorage.getItem("user") !== null

    if ($scope.loggedIn) {
        $scope.create = function(cause) {
            $http.post('/api/causes/create', { cause: cause })
                .success(function(data) {
                    console.log(data.cause);
                    $location.url('view-cause/' + data.cause._id);
                });
        };
    } else {
        // TODO: display a message to user
    }
}

function ViewCauseController($scope, $http, $routeParams, $window) {
    $scope.loggedIn = window.localStorage.getItem("user") !== undefined && window.localStorage.getItem("user") !== null

    $http.get('/api/causes/find/' + $routeParams.id)
        .success(function(cause) {
            $scope.cause = cause;
            initChart(cause.currentFundsTotal, cause.contractors);
        })
        .error(function(error) {
            console.log(error);
        });
        console.log(JSON.parse(window.localStorage.getItem("user")));
    $scope.normalUser = window.localStorage.getItem("user") != undefined &&
        JSON.parse(window.localStorage.getItem("user")).type == "normal";

    $scope.donate = function(donation) {
        console.log(donation);
        var amount = donation.amount;
        var contractor = donation["contractor1"] ? 0 : donation["contractor2"] ? 1 : -1;
        console.log('/api/pledge/' + amount + '/' + $scope.cause._id + '/' + contractor);
        $http.post('/api/pledge', { amount, cause_id: $scope.cause._id, contractor })
            .success(function(cause) {
                console.log(cause);
                $scope.cause = cause;
                $window.location.reload();
            })
            .error(function(error) {
                console.log(error);
            });
    };
}

function PopulateController($scope, $http) {
    $http.get('/populate', function(data) {
        console.log(data);
    });
}

function LoginController($scope, $http, $window) {
    $scope.login = function(user) {
        $http.post('/api/users/create', { user })
            .success(function(data) {
                $scope.loggedIn = true;
                window.localStorage.setItem("user", JSON.stringify(data.user));
                $window.location.href = '/';
            });
    };
}

function LogoutController($scope, $http, $window) {
    window.localStorage.removeItem("user");
    $window.location.href = '/';
}
