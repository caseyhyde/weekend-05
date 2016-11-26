var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var PORT = 3000;

app.use(express.static(path.resolve('./server/public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.listen(PORT, function() {
  console.log("Now listening on port: ", PORT);
});
