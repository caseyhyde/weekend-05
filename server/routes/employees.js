var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = ('postgres://localhost:5432/weekend-05');

router.get('/', function(req, res) {
  console.log("Request made to employees GET route");
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Error connecting to database on GET employees request: ", err);
      res.sendStatus(500);
    }

    client.query('SELECT * FROM employees', function(err, result) {
      done();
      if(err) {
        console.log("Query error getting employees from database");
        res.sendStatus(500);
      }
      res.send(result.rows);
    });//end query
  });//end connect
});//end route


router.post('/', function(req, res) {
  var newEmployee = req.body;

  console.log("Request made to employees POST route");

  console.log("Req.body: ", req.body);

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Error connecting to database on POST new employee request: ", err);
    }

    client.query('INSERT INTO employees (first_name, last_name, employee_id, job_title, annual_salary) VALUES ($1, $2, $3, $4, $5)',
    [newEmployee.first_name, newEmployee.last_name, newEmployee.employee_id,
    newEmployee.jobTitle, newEmployee.annual_salary],
    function(err, result) {
      done();

      if(err) {
        console.log("Query error adding new employee: ", err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });//end query
  });//end connect
});//end route


router.put('/:id', function(req, res) {
  console.log("PUT request to update employee active status");
  var id = req.params.id;

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Error connecting to database to update employee active status: ", err);
    }

    client.query('UPDATE employees SET active =  NOT active WHERE id=$1', [id],
    function(err, result) {
      if(err) {
        console.log("Query error toggling active status");
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });//end query
  });//end connect
});//end route

module.exports = router;
