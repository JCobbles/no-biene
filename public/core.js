var scotchTodo = angular.module('scotchTodo', ['app', 'ng']);

function mainController($scope, $http) {
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