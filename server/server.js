const session  = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express')
const passport = require('passport');
const flash    = require('connect-flash');
const ip = require('ip')
const app = express();


app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(session({
	secret: 'a',
	resave: true,
	saveUninitialized: false
 } )); 
 app.use(function (req, res, next) {
	let referrer = '*'
	if(req.get('referrer'))
		 referrer = "http://"+req.get('referrer').split('/')[2]
		 
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Origin', referrer);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 
app.use('/public',express.static(__dirname + '/public'));


require('./db/passport')(passport); 

require('./app/routes.js')(app, passport); 


console.log('Server online!');
console.log(ip.address() + ':8180');

app.listen(8180);