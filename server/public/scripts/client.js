var myApp = angular.module('myApp', []);

myApp.controller('employeesController', ["$http", function($http) {

  var self = this;

  self.employees = [];

  self.newEmployee = {};

  self.salary = 0;

  getEmployees();



  function getEmployees() {
    $http.get('/employees')
      .then(function(response) {
        self.employees = response.data
        console.log("employees: ", self.employees);
        calcSalary();
      });//end then
  }

  self.addEmployee = function() {
    $http.post('/employees', self.newEmployee)
      .then(function(response) {
        console.log("New Employee: ", self.newEmployee);
        getEmployees();
      })//end then
  }

  self.activeToggle = function(employee) {
    console.log("TOGGLE");
    $http.put('/employees/' + employee.id)
      .then(function(response) {
        getEmployees();
      })//end then
  }

  function calcSalary() {
    for (var i = 0; i < self.employees.length; i++) {
      self.salary += self.employees[i].annual_salary;
    }
    self.salary /= 12;
  }


}]);
