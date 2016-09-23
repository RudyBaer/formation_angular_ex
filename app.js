var express = require('express');
var bodyParser = require("body-parser");
var app = express();


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/projetk');
var db = mongoose.connection;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies


var jokeSchema = mongoose.Schema({
    txt: String,
    date: Date
});

var Joke = mongoose.model('Joke', jokeSchema);


app.get('/api/joke', function (req, res) {

    Joke.find(function (err, joke) {
        if (err) return console.error(err);
        res.json(joke);
    })
});


app.post('/api/joke', function (req, res) {
    var joke = new Joke(req.body);
    joke.save(function (err, joke) {
        if (err) return console.error(err);
    });
});


app.put('/api/joke', function (req, res) {


});


app.use('/', express.static(__dirname + '/html/'));


var router = express.Router();

app.use('/api', router);

app.listen(3000);