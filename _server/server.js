var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var path = require('path');

var _ = require('lodash');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lab5');

var index = require('./routes/index');
//var User = require('./routes/users');

var port = process.env.IP || 8080;

var app = express();

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//body parser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('X-HTTP-Method-Override'));

//CORS support allows this to be a public API 
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


//set up static folder
app.use(express.static(path.join(__dirname,'client')));

app.use('/', index);
//app.use('/', users);

//load the models
app.models = require('./models/index');

//load the routes
var routes = require('./routes');
_.each(routes, function(controller, route){
    app.use(route, controller(app, route));
});

app.listen(port, function(){
    console.log('Server started on port ' + port);
});