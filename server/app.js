var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var employees = require('./routes/employees');
var PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.resolve('./server/public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.use('/employees', employees);//end employees route

app.listen(PORT, function() {
  console.log("Now listening on port: ", PORT);
});
