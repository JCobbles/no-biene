// set up 
var express  = require('express');
var app      = express();                          // create our app w/ express
var mongoose = require('mongoose');                // mongoose for mongodb
var morgan = require('morgan');                    // log requests to the console (express4)
var bodyParser = require('body-parser');           // pull information from HTML POST (express4)
var methodOverride = require('method-override');   // simulate DELETE and PUT (express4)

// configuration 

var productionServer = 'mongodb://tester:password@nobuene-886.mongo.dbs.appsdeck.eu:31179/nobuene-886'
var localServer = 'mongodb://localhost:27017/myproject';
mongoose.connect(localServer);     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// define models

var Cause = mongoose.model('Cause', {
    description: String,
    date: Date,
})

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

    Cause.create({
        description : req.body.description,
        date : new Date(),
    }, function(err, cause) {
        if (err) {
            res.send(err);
        } else {
            res.json({ success: true });
        }
    });
});

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(process.env.PORT || 8080);
console.log("App listening on port " + (process.env.PORT || 8080));
