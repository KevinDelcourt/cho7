
const LocalStrategy   = require('passport-local').Strategy;

const mysql = require('mysql');
const credentials = require('./db-identifiants.json')

const connection = mysql.createConnection(credentials);

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        console.log('serializing')
        done(null, user.id);
    })

    passport.deserializeUser(function(id, done) {
        console.log('deserializing')
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    })

    passport.use(new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
        },
        function(username, password, done) { 
            console.log('login in')
            connection.query("SELECT * FROM users WHERE username = ?",[username], (err, rows)=>{
                if (err)
                    return done(err);
                if (!rows.length || password != rows[0].password) 
                    return done(null, false); 

                return done(null, rows[0]);
            })
        })
    )
}
