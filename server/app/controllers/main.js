const { queryCallback } = require("../../modules/queries")

mainController = connection => {
    return {
        accueil: (req, res) => res.send(true),
        denied: (req, res) => res.send(false),

        addEcoute: (req, res) =>
            connection.query(
                "SELECT nbecoute FROM creation WHERE id=?",
                [req.body.id],
                (err, rows) =>
                    queryCallback(err, res, () =>
                        connection.query(
                            "UPDATE creation SET nbecoute=? WHERE id=?",
                            [rows[0].nbecoute + 1, req.body.id],
                            (err, rows) => {
                                queryCallback(err, res, () => res.send(true))
                            }
                        )
                    )
            ),

        addNote: (req, res) =>
            connection.query(
                "SELECT sommenotes, nbnote FROM creation WHERE id=?",
                [req.params.id],
                (err, rows) =>
                    queryCallback(err, res, () =>
                        connection.query(
                            "UPDATE creation SET sommenotes = ?, nbnote = ? WHERE id=?",
                            [
                                rows[0].sommenotes + req.body.star,
                                rows[0].nbnote + 1,
                                req.params.id
                            ],
                            (err, rows) =>
                                queryCallback(err, res, () => res.send(true))
                        )
                    )
            )
    }
}

module.exports = mainController
