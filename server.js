// set up 
var express  = require('express');
var app      = express();                          // create our app w/ express
var mongoose = require('mongoose');                // mongoose for mongodb
var morgan = require('morgan');                    // log requests to the console (express4)
var bodyParser = require('body-parser');           // pull information from HTML POST (express4)
var methodOverride = require('method-override');   // simulate DELETE and PUT (express4)

// configuration 

mongoose.connect('mongodb://tester:password@nobuene-886.mongo.dbs.appsdeck.eu:31179/nobuene-886');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// define models

var User = mongoose.model('User', {
    username : String,
    password : String,
    causes: [{ id: String }],
});
var Cause = mongoose.model('Cause', {
    description: String,
    date: Date,
})

// routes

app.get('/api/users/find/:user_id', function(req, res) {

    User.findOne({ 'username': req.params.username }, 'username causes', function(err, users) {

        if (err) {
            res.send(err)
        } else {
            res.json(todos);
        }
    });
});

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

// create user
app.post('/api/users/create', function(req, res) {

    User.create({
        username : req.body.username,
        password : req.body.password
    }, function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json({ success: true });
        }
    });
});

app.listen(8080);
console.log("App listening on port 8080");
