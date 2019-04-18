const { jsonToArray, setBuilder } = require("../../modules/queries")
const { queryCallback } = require("../../modules/queries")

module.exports = connection => {
    return {
        getLoggedInUser: (req, res) => {
            res.send(req.user)
        },

        getUsers: (req, res) => {
            connection.query(
                "SELECT id,username,email,presentation,avatar,role FROM users",
                (err, rows) => queryCallback(err, res, () => res.send(rows))
            )
        },

        createNewUser: (req, res) => {
            connection.query(
                "INSERT INTO users (username,password,email,role) VALUES (?,?,?,'ROLE_USER')",
                [
                    req.body.username,
                    require("password-hash").generate(req.body.password),
                    req.body.email
                ],
                (err, rows) => queryCallback(err, res, () => res.send(true))
            )
        },

        getUserFromId: (req, res) => {
            connection.query(
                "SELECT id,username,email,presentation,avatar,role FROM users WHERE id = ?",
                [req.params.id],
                (err, rows) =>
                    queryCallback(err, res, () => {
                        if (rows.length == 0) return res.send(false)
                        return res.send(rows[0])
                    })
            )
        },

        deleteUser: (req, res) => {
            connection.query(
                "DELETE FROM users WHERE id = ?",
                [req.params.id],
                err =>
                    queryCallback(err, res, () => {
                        res.cookie("connect.sid", "", { expires: new Date() })
                        req.logout()
                        return res.send(true)
                    })
            )
        },

        updateUser: (req, res) => {
            updateData = {
                username: req.body.username,
                email: req.body.email
            }

            if (req.body.password)
                updateData.password = require("password-hash").generate(
                    req.body.password
                )

            if (req.body.presentation || req.body.presentation === "")
                updateData.presentation = req.body.presentation

            if (req.body.twitter) updateData.twitter = req.body.twitter

            if (req.file)
                updateData.avatar =
                    "avatar_createur." + req.file.filename.split(".").pop()

            let paramArray = jsonToArray(updateData)
            paramArray.push(req.params.id)

            connection.query(
                "UPDATE users SET " + setBuilder(updateData) + " WHERE id = ?",
                paramArray,
                (err, rows) => queryCallback(err, res, () => res.send(true))
            )
        },

        getCreateur: (req, res) => {
            connection.query(
                "SELECT * FROM users WHERE role = 'ROLE_CREATEUR'",
                (err, rows) =>
                    queryCallback(err, res, () => {
                        delete rows[0].password
                        res.send(rows[0])
                    })
            )
        }
    }
}
