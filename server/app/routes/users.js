const {
    hasNoErrors,
    requiredCheck,
    maxLenValidator,
    isLoggedIn,
    hasGoodId
} = require("../../modules/validation")
const { setBuilder, jsonToArray } = require("../../modules/queries")
const { body, check } = require("express-validator/check")
const multer = require("multer")
const storageImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/../../public/images/")
    },
    filename: (req, file, cb) => {
        cb(null, "avatar_createur." + file.originalname.split(".").pop())
    }
})
let uploadImage = multer({ storage: storageImage })

const newUserValidator = [
    requiredCheck("username", "Pseudo requis"),
    requiredCheck("password", "Mot de passe requis"),
    body("email")
        .isEmail()
        .withMessage("Mail valide requis")
]

const userUpdateValidator = [
    requiredCheck("username", "Pseudo requis"),
    body("email")
        .isEmail()
        .withMessage("Mail valide requis")
]
module.exports = (app, connection) => {
    app.get("/user", isLoggedIn, (req, res) => {
        res.send(req.user)
    })

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
        uploadImage.single("fichierAvatar"),
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
                    "avatar_createur." + req.file.filename.split(".").pop()

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
