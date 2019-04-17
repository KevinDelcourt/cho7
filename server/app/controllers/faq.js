const { queryCallback } = require("../../modules/queries")

const faqController = connection => {
    return {
        getQuestionReponse: (req, res) => {
            connection.query(
                "SELECT * FROM faq WHERE reponse IS NOT NULL",
                (err, rows) => queryCallback(err, res, () => res.send(rows))
            )
        },

        deleteFaq: (req, res) => {
            if (/^(0|[1-9]\d*)$/.test(req.params.id))
                connection.query(
                    "DELETE FROM faq WHERE id = ?",
                    [req.params.id],
                    (err, rows) => queryCallback(err, res, () => res.send(true))
                )
        },

        getQuestions: (req, res) => {
            connection.query(
                "SELECT * FROM faq WHERE reponse IS NULL",
                (err, rows) => queryCallback(err, res, () => res.send(rows))
            )
        },

        addReponse: (req, res) => {
            connection.query(
                "UPDATE faq SET reponse = ? WHERE id = ?",
                [req.body.reponse, req.params.id],
                (err, rows) => queryCallback(err, res, () => res.send(true))
            )
        },

        addQuestion: (req, res) => {
            connection.query(
                "INSERT INTO faq (question) VALUES (?)",
                [req.body.question],
                (err, rows) => queryCallback(err, res, () => res.send(true))
            )
        }
    }
}

module.exports = faqController
