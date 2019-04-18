const { queryCallback } = require("../../modules/queries")

let Twitter = require("twitter")

let twitterClient = new Twitter({
    consumer_key: "kQpM9aLLltlKefBfF7C2jpjgj",
    consumer_secret: "QBy76UuHc7Zp6rWC7RRAntlKfwQlGilq4xd2Ew8m4BbZn1qVsw",
    access_token_key: "711901917358788608-03x2C8x0ii1uIxQL1AIL8EFSUvt9JIL",
    access_token_secret: "sGCgbhzfTBLzaWdGD37Q4RkIa7vHMDBVZxW4j7rFCBgp8"
})

const validateLibelleValeur = body =>
    body.libelle &&
    body.valeur &&
    body.libelle.length > 0 &&
    body.valeur.length > 0

const creationController = connection => {
    return {
        getCreation: (req, res) =>
            connection.query(
                "SELECT * FROM creation WHERE id = ?",
                [req.params.id],
                (err, rows) => queryCallback(err, res, () => res.send(rows[0]))
            ),

        getCreationsPlusEcoutees: (req, res) =>
            connection.query(
                "SELECT * FROM creation WHERE nomfichier IS NOT NULL ORDER BY nbecoute DESC",
                (err, rows) => queryCallback(err, res, () => res.send(rows))
            ),

        getCreationDuPlusAuMoinsRecent: (req, res) => {
            let tri = req.params.tri
            let order = req.params.order

            if (
                typeof tri == "string" &&
                tri.length <= 6 &&
                (order === "desc" || order === "asc")
            ) {
                switch (tri) {
                    case "date":
                        tri = "id"
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
        },

        getCreationEnCours: (req, res) => {
            connection.query(
                "SELECT * FROM creation WHERE nomfichier IS NULL ORDER BY id DESC",
                (err, rows) => queryCallback(err, res, () => res.send(rows))
            )
        },

        getAvancement: (req, res) => {
            connection.query(
                "SELECT creation.id, creation.titre, creation.description, etat_avancement.libelle,etat_avancement.valeuravancement, creation.miseajour FROM creation,etat_avancement WHERE etat_avancement.idcreation=creation.id AND creation.nomfichier is null",
                (err, rows) => queryCallback(err, res, () => res.send(rows))
            )
        },

        getEtatFromCreationId: (req, res) => {
            connection.query(
                "SELECT * FROM etat_avancement WHERE idcreation = ?",
                [req.params.idCreation],
                (err, rows) => queryCallback(err, res, () => res.send(rows))
            )
        },

        addCreation: (req, res) => {
            if (req.body.twitter && req.body.twitter === "true")
                twitterClient.post(
                    "statuses/update",
                    {
                        status:
                            "Nouvelle création: " +
                            req.body.titre +
                            "! test.com"
                    },
                    error => {
                        if (error) return res.send(error)
                    }
                )

            if (req.file)
                connection.query(
                    "INSERT INTO creation (nomfichier, titre, description) VALUES (?, ?, ?)",
                    [
                        req.file.originalname,
                        req.body.titre,
                        req.body.description
                    ],
                    (err, rows) => queryCallback(err, res, () => res.send(true))
                )
            else if (validateLibelleValeur(req.body))
                connection.query(
                    "INSERT INTO creation (titre,description) VALUES (?,?)",
                    [req.body.titre, req.body.description],
                    (err, rows) =>
                        queryCallback(err, res, () => {
                            req.body.libelle.map((l, index) => {
                                if (req.body.valeur[index] == "undefined")
                                    req.body.valeur[index] = 0

                                connection.query(
                                    "INSERT INTO etat_avancement (libelle, valeuravancement, idcreation) VALUES (?, ?, ?)",
                                    [l, req.body.valeur[index], rows.insertId]
                                )
                            })
                            return res.send(true)
                        })
                )
            else {
                return res.send({
                    libelle: "Au moins 1 etat requis",
                    valeur: "Au moins une valeur requise",
                    creation: "Un fichier ou un état requis"
                })
            }
        },

        updateCreation: (req, res) => {
            if (req.body.twitter && req.body.twitter === "true")
                twitterClient.post(
                    "statuses/update",
                    {
                        status:
                            "Nouvelle update: " + req.body.titre + "! test.com"
                    },
                    error => {
                        if (error) return res.send(error)
                    }
                )
            if (req.file)
                connection.query(
                    "DELETE FROM etat_avancement WHERE idcreation = ?",
                    req.body.id,
                    (err, rows) =>
                        queryCallback(err, res, () =>
                            connection.query(
                                "UPDATE creation SET nomfichier = ?, titre = ?, description = ? WHERE id = ?",
                                [
                                    req.file.originalname,
                                    req.body.titre,
                                    req.body.description,
                                    req.body.id
                                ],
                                (err, rows) =>
                                    queryCallback(err, res, () =>
                                        res.send(true)
                                    )
                            )
                        )
                )
            else {
                connection.query(
                    "UPDATE creation SET titre = ?, description = ? WHERE id = ?",
                    [req.body.titre, req.body.description, req.body.id],
                    (err, rows) => {
                        queryCallback(err, res, () => {
                            if (validateLibelleValeur(req.body))
                                req.body.valeur.map((val, index) =>
                                    connection.query(
                                        "UPDATE etat_avancement SET valeuravancement = ?, libelle = ? WHERE id = ?",
                                        [
                                            val,
                                            req.body.libelle[index],
                                            req.body.idEtat[index]
                                        ]
                                    )
                                )
                            return res.send(true)
                        })
                    }
                )
            }
        },

        deleteCreation: (req, res) => {
            if (/^(0|[1-9]\d*)$/.test(req.params.id))
                connection.query(
                    "DELETE FROM creation WHERE id = ?",
                    [req.params.id],
                    (err, rows) => queryCallback(err, res, () => res.send(true))
                )
            return res.send(false)
        }
    }
}

module.exports = creationController
