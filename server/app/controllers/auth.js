const sign = require("cookie-signature").sign

const authController = () => {
    return {
        logoutAction: (req, res) => {
            res.cookie("connect.sid", "", { expires: new Date() })
            res.send({ loggedOut: true })
            req.logout()
        },

        loginAction: (req, res) => {
            if (req.body.remember) req.session.cookie.maxAge = 1000 * 60 * 3
            else req.session.cookie.expires = false
            res.send("s:" + sign(req.sessionID, "a"))
        },

        userHasRole: (req, res) => {
            res.send(req.user.role === "ROLE_" + req.params.role.toUpperCase())
        }
    }
}

module.exports = authController
