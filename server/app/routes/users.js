const {
    responseFromValidatorError,
    getErrors,
    hasNoErrors,
    maxLenCheck,
    requiredCheck,
    maxLenValidator
} = require("../../modules/validation")
const { body, check, validationResult } = require("express-validator/check")

const newUserValidator = [
    requiredCheck("username", "Pseudo requis"),
    requiredCheck("password", "Mot de passe requis"),
    check("email")
        .isEmail()
        .withMessage("Mail valide requis")
]

module.exports = (app, connection) => {
    app.get("/users", (req, res) => {
        connection.query(
            "SELECT id,username,email,presentation,avatar,role FROM users",
            (err, rows) => {
                if (err) return res.send(err)

                return res.send(rows)
            }
        )
    })

    app.post(
        "/users",
        newUserValidator,
        maxLenValidator(),
        hasNoErrors,
        (req, res) => {
            connection.query(
                "INSERT INTO users (username,password,email,role) VALUES (?,?,?,'ROLE_USER')",
                [req.body.username, req.body.password, req.body.email],
                err => {
                    if (err) return res.send(err)
                    return res.send(true)
                }
            )
        }
    )

    app.get("/users/:id", (req, res) => {
        connection.query(
            "SELECT id,username,email,presentation,avatar,role FROM users WHERE id = ?",
            [req.params.id],
            (err, rows) => {
                if (err) return res.send(err)
                if (rows.length == 0) return res.send(false)
                return res.send(rows[0])
            }
        )
    })
}
