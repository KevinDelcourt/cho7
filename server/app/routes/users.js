const {
    responseFromValidatorError,
    getErrors,
    hasNoErrors,
    maxLenCheck,
    requiredCheck,
    maxLenValidator,
    isLoggedIn,
    hasGoodId
} = require("../../modules/validation")
const { setBuilder, jsonToArray } = require("../../modules/queries")
const { body, check, validationResult } = require("express-validator/check")

const newUserValidator = [
    requiredCheck("username", "Pseudo requis"),
    requiredCheck("password", "Mot de passe requis"),
    check("email")
        .isEmail()
        .withMessage("Mail valide requis")
]

const userUpdateValidator = [
    requiredCheck("username", "Pseudo requis"),
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

    app.delete("/users/:id", isLoggedIn, hasGoodId, (req, res) => {
        connection.query(
            "DELETE FROM users WHERE id = ?",
            [req.params.id],
            err => {
                if (err) return res.send(err)
                res.cookie("connect.sid", "", { expires: new Date() })
                req.logout()
                return res.send(true)
            }
        )
    })

    app.post(
        "/users/:id",
        isLoggedIn,
        hasGoodId,
        userUpdateValidator,
        maxLenValidator(),
        hasNoErrors,
        (req, res) => {
            updateData = {
                username: req.body.username,
                email: req.body.email
            }

            if (req.body.password) updateData.password = req.body.password

            if (req.body.presentation || req.body.presentation === "")
                updateData.presentation = req.body.presentation

            if (req.file)
                updateData.avatar =
                    "avatar_" +
                    req.params.id +
                    "." +
                    req.file.filename.split(".").pop()

            let paramArray = jsonToArray(updateData)
            paramArray.push(req.params.id)

            connection.query(
                "UPDATE users SET " + setBuilder(updateData) + " WHERE id = ?",
                paramArray,
                err => {
                    if (err) return res.send(err)
                    return res.send(true)
                }
            )
        }
    )
}
