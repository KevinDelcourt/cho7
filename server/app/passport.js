const LocalStrategy = require("passport-local").Strategy

const mysql = require("mysql")
const credentials = require("../db/db-identifiants.json")

const connection = mysql.createConnection(credentials)

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ", [id], function(
            err,
            rows
        ) {
            delete rows[0].password
            done(err, rows[0])
        })
    })

    passport.use(
        new LocalStrategy(
            {
                usernameField: "username",
                passwordField: "password"
            },
            function(username, password, done) {
                connection.query(
                    "SELECT * FROM users WHERE username = ?",
                    [username],
                    (err, rows) => {
                        if (err) return done(err)
                        if (
                            !rows.length ||
                            !require("password-hash").verify(
                                password,
                                rows[0].password
                            )
                        )
                            return done(null, false)

                        return done(null, rows[0])
                    }
                )
            }
        )
    )
}
