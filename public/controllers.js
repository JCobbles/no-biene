angular.module('myApp')
    .controller('HomepageController', HomepageController)
    .controller('CauseCreationController', CauseCreationController)
    .controller('ViewCauseController', ViewCauseController)
    .controller('PopulateController', PopulateController);

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
}

function PopulateController($scope, $http) {
    $http.get('/populate', function(data) {
        console.log(data);
    });
}