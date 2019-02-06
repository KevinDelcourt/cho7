const session  = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express')
const passport = require('passport');

require('./db/passport')(passport); 

const app = express();

app.use(morgan('dev'));
app.use(require('cookie-parser'))
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(require('connect-flash')); 

require('./app/routes.js')(app, passport); 

console.log('Server online!');
console.log('localhost:8180');
app.listen(8180);