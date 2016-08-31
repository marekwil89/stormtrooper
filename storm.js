var express = require('express');
var bodyParser = require('body-parser');

var check = require('./routes/check/answers.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use('/check', check)

app.listen(6000);
console.log("server running on port 6000")