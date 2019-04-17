module.exports = (app, connection) => {
    app.get("/createur", (req, res) => {
        connection.query(
            "SELECT * FROM users WHERE role = 'ROLE_CREATEUR'",
            (err, rows) => {
                if (err) res.send(err)
                delete rows[0].password
                res.send(rows[0])
            }
        )
    })

    app.get("/creation/:id", (req, res) => {
        connection.query(
            "SELECT * FROM creation WHERE id = ?",
            [req.params.id],
            (err, rows) => {
                if (err) res.send(err)
                res.send(rows[0])
            }
        )
    })

    app.get("/creations/:tri/:order", (req, res) => {
        let tri = req.params.tri
        let order = req.params.order

        if (
            typeof tri == "string" &&
            tri.length <= 6 &&
            (order === "desc" || order === "asc")
        ) {
            switch (tri) {
                case "date":
                    tri = "miseajour"
                    break
                case "note":
                    tri = "sommenotes / nbnote"
                    break
                case "ecoute":
                    tri = "nbecoute"
                    break
            }

            connection.query(
                "SELECT * FROM creation WHERE nomfichier IS NOT NULL ORDER BY " +
                    tri +
                    " " +
                    order,
                (err, rows) => {
                    return err ? res.send(err) : res.send(rows)
                }
            )
        }
    })

    app.get("/creations/inprogress", (req, res) => {
        connection.query(
            "SELECT * FROM creation WHERE nomfichier IS NULL ORDER BY id DESC",
            (err, rows) => {
                if (err) return res.send(err)
                res.send(rows)
            }
        )
    })

    app.get("/avancement", (req, res) => {
        connection.query(
            "SELECT creation.id, creation.titre, creation.description, etat_avancement.libelle,etat_avancement.valeuravancement, creation.miseajour FROM creation,etat_avancement WHERE etat_avancement.idcreation=creation.id AND creation.nomfichier is null",
            (err, rows) => {
                if (err) return res.send(err)

                res.send(rows)
            }
        )
    })

    app.get("/etatsCreation/:idCreation", (req, res) => {
        connection.query(
            "SELECT * FROM etat_avancement WHERE idcreation = ?",
            [req.params.idCreation],
            (err, rows) => {
                if (err) res.send(err)
                res.send(rows)
            }
        )
    })

    /* RECUPERER QUESTIONS/REPONSES(FAQ) */

    app.get("/questionsreponses", (req, res) => {
        connection.query(
            "SELECT * FROM faq WHERE reponse IS NOT NULL",
            (err, rows) => {
                if (err) res.send(err)
                res.send(rows)
            }
        )
    })
}
