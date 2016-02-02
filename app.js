var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/imagesearch/:search', function (req, res) {
  res.send(req.params.search);
});

app.listen(8080, function () {
  console.log('App listening on port 8080');
});
