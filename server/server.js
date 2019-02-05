const mysql = require('mysql')
const express = require('express')
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require('./db');

const credentials = require('./db/db-identifiants.json')



const connection = mysql.createConnection(credentials);

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');
});

passport.use(new Strategy(
  (username,password,cb)=>db.findByUsername(username,
    (err,user)=>{
      if(err) cb(err)
      if(!user) cb(null,false)
      if(user.password != password) cb(null,false)
      cb(null,user)
    }))
)

passport.serializeUser((user,cb)=>cb(null,user.id))

passport.deserializeUser((id,cb)=>db.findById(id,(err,user)=>{
  if(err) cb(err)
  cb(null,user)
}))

const app = express();
app.use(require('morgan')('combined'));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(require('body-parser').json())
app.use(require('cookie-parser')())

app.use(passport.initialize())

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/',function(req,res){
  res.setHeader('Content-Type', 'text/plain');
  connection.ping(function (err) {
    if (err) throw err;
    res.send('online')
  })
})


console.log('Server online!');
console.log(credentials.host+':8180');
app.listen(8180);