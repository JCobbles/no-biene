// set up
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');                // mongoose for mongodb
var morgan   = require('morgan');                  // log requests to the console (express4)
var bodyParser = require('body-parser');           // pull information from HTML POST (express4)
var methodOverride = require('method-override');   // simulate DELETE and PUT (express4)

// configuration

var productionServer = 'mongodb://tester:password@nobuene-886.mongo.dbs.appsdeck.eu:31179/nobuene-886'
var localServer = 'mongodb://localhost:27017/myproject';
mongoose.connect(localServer);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// define models

var Cause = mongoose.model('Cause', {
    title: String,
    description: String,
    details: String,
    date: Date,
});

// routes

app.get('/api/causes/list', function(req, res) {

    Cause.find(function(err, causes) {

        if (err) {
            res.send(err)
        } else {
            res.json(causes);
        }
    });
});

app.get('/api/causes/find/:cause_id', function(req, res) {

    Cause.findOne({ 'id': req.params.cause_id }, function(err, causes) {

        if (err) {
            res.send(err)
        } else {
            res.json(causes);
        }
    });
});

app.post('/api/causes/create', function(req, res) { // create cause
    console.log(req.body.cause);
    Cause.create({
        description : req.body.cause.description,
        date : new Date(),
    }, function(err, cause) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(req.body.cause);
            res.json({ success: true, data: req.body });
        }
    });
});

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

for (var i = 0; i<4; i++) {
    Cause.create({
            title: "Fund the repair of local hospital",
            description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi eu dapibus enim. Phasellus tincidunt purus metus, eget ornare dui sagittis vulputate.",
            details : "Morbi aliquam lorem ante, a mattis tortor ornare vitae. Maecenas mollis elit leo, vel accumsan enim mollis venenatis. Donec pulvinar, tellus id tempor fermentum, erat metus tincidunt nisi, eu aliquet dui est sit amet odio. Aliquam in cursus ante, vitae vehicula metus. Nunc vel mattis nulla. Mauris quis vehicula magna. Nam tincidunt, dolor ac egestas bibendum, nulla mauris accumsan nisl, a imperdiet purus tellus ut enim.",
            date : new Date(),
            latitude: 39.986732, longitude: 34.814906
        }, function(err, cause) {});

}
app.listen(process.env.PORT || 8080);
console.log("App listening on port " + (process.env.PORT || 8080));
