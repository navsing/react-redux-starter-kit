var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'build')));

var dataController = require('../src/controller/dataController');

app.get('/api/getEvents', dataController.getEventsData);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var port = 3002;


app.listen(process.env.PORT || port);