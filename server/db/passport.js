
const LocalStrategy   = require('passport-local').Strategy;

const mysql = require('mysql');
const credentials = require('./db-identifiants.json')

const connection = mysql.createConnection(credentials);

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    passport.use(new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) { 
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); 
                }

                if (password != rows[0].password)
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 

                return done(null, rows[0]);
            });
        })
    );
};
