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
    latitude: Number,
    longitude: Number,
    date: Date,
    contractors: [{ name: String, price: Number, details: String, votes: { type: Number, default: 0 }, specificFundsPledged: { type: Number, default: 0 } }],
    currentFundsTotal: { type: Number, default: 0 },
    photoURI: { type: String, default: 'http://www.chris-cancercommunity.com/wp-content/uploads/Things-to-Consider-before-Deciding-Where-to-Donate.jpg' }
});

var User = mongoose.model('User', {
	username: String,
	password: String,
	type: String
});

// routes

app.get('/populate', function(req, res) {
    Cause.remove({}, function() {});
    Cause.create({
        title: "Rebuild road linking two villages",
        description: "Aenean ullamcorper vestibulum tortor. Duis ornare vitae justo sed semper. Ut est sapien, interdum ornare urna nec, posuere elementum nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus quis urna sed interdum. Nullam tincidunt ante lacus, ac aliquet eros facilisis eget. Nulla nisl neque, sagittis in nibh nec, mollis sagittis justo. Morbi eleifend ex ut nisi viverra eleifend. Etiam placerat imperdiet erat. Nulla vulputate aliquet imperdiet. Ut dignissim odio quis mauris sollicitudin pellentesque.",
        date: new Date(),
        latitude: 39.916732, longitude: 32.814906,
    }, function(err, cause) {console.log(err);console.log(cause);});
    Cause.create({
        title: "Secure clean water supply",
        description: "Mauris sed maximus est. Curabitur placerat pulvinar nibh, vel consequat risus ultricies a. Praesent pharetra semper tincidunt. Donec in mattis quam. Nam aliquet tellus a tortor sodales, ut accumsan metus posuere. Quisque vestibulum lacus in neque pretium rutrum.",
        details : "Aliquam blandit, felis quis tempus commodo, diam nulla fringilla turpis, quis lobortis arcu mauris non quam. Morbi id ligula non lacus sagittis luctus. In luctus nisl massa, non sollicitudin sapien fringilla in. Duis sodales aliquet nibh a accumsan. Proin convallis nec ante facilisis dignissim. Integer commodo orci sit amet felis sagittis, vitae commodo purus pulvinar. Cras congue porta fringilla. Aliquam et elit felis.",
        date : new Date(),
        latitude: 39.986732, longitude: 34.814906,
        contractors: [ 
            { name: "Local Infrastructure Company", price: 230000, details: "We will infrastructure your infrastructure." },
            { name: "Vintage Water Pipes", price: 190000, details: "We will reuse existing infrastructure to build a wobbly structure." } 
        ]
    }, function(err, cause) {console.log(err);});
    Cause.create({
        title: "Fund the repair of local hospital",
        description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi eu dapibus enim. Phasellus tincidunt purus metus, eget ornare dui sagittis vulputate.",
        details : "Morbi aliquam lorem ante, a mattis tortor ornare vitae. Maecenas mollis elit leo, vel accumsan enim mollis venenatis. Donec pulvinar, tellus id tempor fermentum, erat metus tincidunt nisi, eu aliquet dui est sit amet odio. Aliquam in cursus ante, vitae vehicula metus. Nunc vel mattis nulla. Mauris quis vehicula magna. Nam tincidunt, dolor ac egestas bibendum, nulla mauris accumsan nisl, a imperdiet purus tellus ut enim.",
        date : new Date(),
        latitude: 39.716732, longitude: 33.914906
    }, function(err, cause) {console.log(err);});
    Cause.create({
        title: "Malaria medication needed",
        description: "Aenean ullamcorper vestibulum tortor. Duis ornare vitae justo sed semper. Ut est sapien, interdum ornare urna nec, posuere elementum nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
        details : "Cras iaculis mi eget pharetra mollis. Vivamus vestibulum purus libero, ut sodales justo feugiat at. Vestibulum sed maximus est, ac pellentesque augue. Mauris iaculis dignissim consectetur. Mauris gravida eget neque ac condimentum. Maecenas sodales ipsum tortor, vitae lobortis diam gravida ut. Sed ipsum justo, vehicula vitae ullamcorper id, tempor ut dolor. Integer ac risus ligula. In dictum urna nibh, cursus cursus ante tristique id. Sed lobortis mauris id ante venenatis lacinia. Proin suscipit purus ut quam mollis, eu tincidunt velit consequat.",
        date : new Date(),
        latitude: 39.816732, longitude: 31.814906
    }, function(err, cause) {console.log(err);});
    Cause.create({
        title: "Food packages needed urgently",
        description: "Aenean ullamcorper vestibulum tortor. Duis ornare vitae justo sed semper. Ut est sapien, interdum ornare urna nec, posuere elementum nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
        details : "Cras iaculis mi eget pharetra mollis. Vivamus vestibulum purus libero, ut sodales justo feugiat at. Vestibulum sed maximus est, ac pellentesque augue. Mauris iaculis dignissim consectetur. Mauris gravida eget neque ac condimentum. Maecenas sodales ipsum tortor, vitae lobortis diam gravida ut. Sed ipsum justo, vehicula vitae ullamcorper id, tempor ut dolor. Integer ac risus ligula. In dictum urna nibh, cursus cursus ante tristique id. Sed lobortis mauris id ante venenatis lacinia. Proin suscipit purus ut quam mollis, eu tincidunt velit consequat.",
        date : new Date(),
        latitude: 36.197272, longitude: 37.134849
    }, function(err, cause) {console.log(err);});
    Cause.create({
        title: "Fund my daughter's education",
        description: "Aenean ullamcorper vestibulum tortor. Duis ornare vitae justo sed semper. Ut est sapien, interdum ornare urna nec, posuere elementum nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
        details : "Cras iaculis mi eget pharetra mollis. Vivamus vestibulum purus libero, ut sodales justo feugiat at. Vestibulum sed maximus est, ac pellentesque augue. Mauris iaculis dignissim consectetur. Mauris gravida eget neque ac condimentum. Maecenas sodales ipsum tortor, vitae lobortis diam gravida ut. Sed ipsum justo, vehicula vitae ullamcorper id, tempor ut dolor. Integer ac risus ligula. In dictum urna nibh, cursus cursus ante tristique id. Sed lobortis mauris id ante venenatis lacinia. Proin suscipit purus ut quam mollis, eu tincidunt velit consequat.",
        date : new Date(),
        latitude: 32.676947, longitude: 44.948068,
    }, function(err, cause) {console.log(err);});
    Cause.create({
        title: "Support needed for 10 child refugees",
        photoURI: "https://www.syriacharity.org/images/photos/home_1463462726.jpg",
        description: "Aenean ullamcorper vestibulum tortor. Duis ornare vitae justo sed semper. Ut est sapien, interdum ornare urna nec, posuere elementum nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
        details : "Cras iaculis mi eget pharetra mollis. Vivamus vestibulum purus libero, ut sodales justo feugiat at. Vestibulum sed maximus est, ac pellentesque augue. Mauris iaculis dignissim consectetur. Mauris gravida eget neque ac condimentum. Maecenas sodales ipsum tortor, vitae lobortis diam gravida ut. Sed ipsum justo, vehicula vitae ullamcorper id, tempor ut dolor. Integer ac risus ligula. In dictum urna nibh, cursus cursus ante tristique id. Sed lobortis mauris id ante venenatis lacinia. Proin suscipit purus ut quam mollis, eu tincidunt velit consequat.",
        date : new Date(),
        latitude: 48.359093, longitude: 10.904820,
    }, function(err, cause) {console.log(err);});
    // 34.374669, longitude: 42.867019
    // {lat: 35.069766, lng: 52.893061}, // near tehran
    res.json({success: true});
});
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
    Cause.findById(req.params.cause_id, function(err, cause) {
        if (err) {
            res.send(err);
        } else {
            res.json(cause);
        }
    });
});

app.get('/api/users/find/:user_id', function(req, res) {
	User.findByID(req.params.cause_id, function(err, user) {
		if (err) {
			res.send(err);
		} else {
			res.json(user);
		}
	});
});

app.post('/api/pledge', function(req, res) {
    console.log(req.body);
    Cause.findById(req.body.cause_id, function(err, cause) {
        if (err) {
            res.json(err);
        } else {
            var amount = parseInt(req.body.amount);
            //update the cause with the new monies req.params.amount
            cause.currentFundsTotal += amount;
            if (req.body.contractor != -1) {
                cause.contractors[req.body.contractor].specificFundsPledged += amount;
            }
            console.log(cause);
            cause.save();
            res.json(cause);
        }
	});
});

app.post('/api/causes/create', function(req, res) { // create cause
    console.log(req.body.cause);
    var { cause } = req.body;
    Cause.create({
        title: cause.title,
        description: cause.description,
        details: cause.detailedDescription,
        date: new Date(),
        latitude: 32.676947, longitude: 44.948068
    }, function(err, cause) {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            console.log(cause);
            res.json({ success: true, cause });
        }
    });
});

app.post('/api/users/create', function(req, res) {
	User.find({ username: req.body.user.username }, function(err, users) {
		if (!users.length) { // does not exist, so create
            console.log("does not exist");
			User.create({
				username: req.body.user.username,
				password: req.body.user.password,
				type:     req.body.user.contractor ? "contractor" : "normal",
			}, function(err2, user) {
                console.log(user);

                res.json({success: (err2 == undefined), user: user });
			});
		} else {
			console.log(users[0]);

			res.json({ success: true, user: users[0] });
		}
	});
});

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(process.env.PORT || 8080);
console.log("App listening on port " + (process.env.PORT || 8080));
