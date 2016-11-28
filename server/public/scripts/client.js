var myApp = angular.module('myApp', []);

myApp.controller('employeesController', ["$http", function($http) {
  var self = this;
  self.employees = [];
  self.newEmployee = {};
  self.salaries = [];
  getEmployees();

  function getEmployees() {
    $http.get('/employees')
      .then(function(response) {
        self.employees = response.data
        console.log("employees: ", self.employees);
        getSalaries();
      });//end then
  }

  self.addEmployee = function() {
    $http.post('/employees', self.newEmployee)
      .then(function(response) {
        console.log("New Employee: ", self.newEmployee);
        getEmployees();
        self.newEmployee = {};//clear input fields
      })//end then
  }

  self.activeToggle = function(employee) {
    console.log("TOGGLE");
    $http.put('/employees/' + employee.id)
      .then(function(response) {
        getEmployees();
      })//end then
  }

  self.updateEmployee = function(employee) {
    console.log("Update employee clicked");
    console.log("Sending data: ", employee);
    console.log("Employees: ", self.employees);
    $http.put('/employees/update/' + employee.id, employee)
      .then(function(response) {
        getEmployees();
      })//end then
  }

  function getSalaries() {
    $http.get('/salaries')
      .then(function(response) {
        console.log("Received salary budget from server: ", response.data);
        self.salaries = response.data[0].budget;
        console.log(self.salaries);
      });//end then
  }
}]);
