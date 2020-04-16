var path = require('path');
var fs = require('fs');

var basePath = path.join(__dirname, '../api/');

var getJson = function (basePath, filename) {
  var filename = path.join(basePath, filename);
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
};

exports.getEventsData = function(req, res) {
  var eventData = getJson(basePath, 'sampleEventsData.json');
  setTimeout(function() {
    return res.send(eventData);
  }, 100);
};
