const mysql = require('mysql')
const express = require('express')
const bodyParser = require('body-parser')

const sql = require('./functions/sql_functions')
const credentials = require('./db/db-identifiants.json')

const app = express();
app.use(bodyParser.json())


const connection = mysql.createConnection(credentials);

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');
});

app.post('/profil/createur', function(req, res,next) {
  sql.setUsernameCreateur(connection,req,res)
});

app.get('/profil/createur', function(req, res) {
  sql.getProfilCreateur(connection,res)
});

app.get('/status',function(req,res){
  res.setHeader('Content-Type', 'text/plain');
  connection.ping(function (err) {
    if (err) throw err;
    res.send('online')
  })
})

console.log('Server online!');
console.log(credentials.host+':8180');
app.listen(8180);