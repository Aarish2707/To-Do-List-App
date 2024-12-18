var app = angular.module('todoApp', []);
app.controller('todoCtrl', function ($scope) {
  $scope.tasks = [];
  $scope.newTask = '';

  $scope.addTask = function () {
    if ($scope.newTask.trim() !== '') {
      $scope.tasks.push({ name: $scope.newTask, completed: false });
      $scope.newTask = '';
    }
  };

  $scope.deleteTask = function (index) {
    $scope.tasks.splice(index, 1);
  };

  $scope.toggleComplete = function (task) {
    task.completed = !task.completed;
  };
});
