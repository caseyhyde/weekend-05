var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = ('postgres://localhost:5432/weekend-05');

router.get('/', function(req, res) {
  console.log("Request made to salaries GET route");
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Error connecting to database on GET salaries request");
      res.sendStatus(500);
    }

    client.query('SELECT SUM(annual_salary/12) AS budget FROM employees ' +
    'WHERE active=TRUE',
      function(err, result) {
        done();
        if(err) {
          console.log("Query error getting budget from employees database");
          res.sendStatus(500);
        }
        res.send(result.rows);
    });//end query
  })//end connect
});//end route

module.exports = router;
