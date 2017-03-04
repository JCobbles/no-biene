angular.module('myApp')
    .controller('HomepageController', HomepageController)
    .controller('CauseCreationController', CauseCreationController);

HomepageController.$inject = ['$scope', '$http'];

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

function CauseCreationController($scope) {
    $scope.create = function(cause) {

    };
}