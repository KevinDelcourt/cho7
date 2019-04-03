const { updateCreateurQuery } = require("../modules/queries")
const {
    responseFromValidatorError,
    getErrors,
    hasNoErrors,
    requiredCheck,
    maxLenValidator
} = require("../modules/validation")
const mysql = require("mysql")
const credentials = require("../db/db-identifiants.json")
const connection = mysql.createConnection(credentials)
const fs = require("fs")
const multer = require("multer")

const { body, check, validationResult } = require("express-validator/check")
const storageAudio = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/../public/audio/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
let uploadAudio = multer({ storage: storageAudio })

const creationValidator = [
    requiredCheck("titre", "Titre requis")
    /*body("libelle")
        .isLength({ min: 1 })
        .withMessage("Au moins 1 etat requis"),
    body("valeur")
        .isLength({ min: 1 })
        .withMessage("Au moins 1 valeur requise")
    body("creation")
        .custom((value, { req }) => {
            if (req.file.mimetype.split("/")[0] != "audio") {
                throw new Error("Seuls les fichiers audios sont acceptés")
            } else {
                return true
            }
        })
        .custom((value, { req }) => {
            if (req.file.originalname.length > 50) {
                throw new Error(
                    "Nom de fichier trop long, maximum 50 caractères"
                )
            } else {
                return true
            }
        }),*/
]

module.exports = (app, passport) => {
    app.get("/", (req, res) => {
        res.send(true)
    })

    app.post(
        "/addcreation",
        isLoggedIn,
        uploadAudio.single("creation"),
        creationValidator,
        maxLenValidator(),
        hasNoErrors,
        (req, res) => {
            if (req.file)
                connection.query(
                    "INSERT INTO creation (nomfichier,titre,description) VALUES (?,?,?)",
                    [
                        req.file.originalname,
                        req.body.titre,
                        req.body.description
                    ],
                    err => {
                        if (err) return res.send(err)
                        res.send(true)
                    }
                )
            else if (
                req.body.libelle &&
                req.body.valeur &&
                req.body.libelle.length > 0 &&
                req.body.valeur.length > 0
            )
                connection.query(
                    "INSERT INTO creation (titre,description) VALUES (?,?)",
                    [req.body.titre, req.body.description],
                    (err, rows) => {
                        if (err) return res.send(err)

                        req.body.libelle.map((l, index) => {
                            connection.query(
                                "INSERT INTO etat_avancement (libelle,valeuravancement,idcreation) VALUES (?,?,?)",
                                [l, req.body.valeur[index], rows.insertId],
                                (err, rows) => {
                                    if (err) return res.send(err)
                                }
                            )
                        })

                        res.send(true)
                    }
                )
            else {
                res.send({
                    libelle: "Au moins 1 etat requis",
                    valeur: "Au moins 1 valeur requise",
                    creation: "Un fichier ou un état requis"
                })
            }
        }
    )

    app.post(
        "/updateCreation/",
        isLoggedIn,
        uploadAudio.single("creation"),
        creationValidator,
        maxLenValidator(),
        hasNoErrors,
        (req, res) => {
            const idCreation = req.body.id
            if (req.file) {
                connection.query(
                    "DELETE FROM etat_avancement WHERE idcreation = ?",
                    idCreation,
                    err => {
                        if (err) return res.send(err)
                    }
                )
                connection.query(
                    "UPDATE creation SET nomfichier = ?, titre = ?, description = ? WHERE id = ?",
                    [
                        req.file.originalname,
                        req.body.titre,
                        req.body.description,
                        idCreation
                    ],
                    (err, rows) => {
                        if (err) return res.send(err)

                        res.send(true)
                    }
                )
            } else {
                connection.query(
                    "UPDATE creation SET titre = ?, description = ? WHERE id = ?",
                    [req.body.titre, req.body.description, idCreation],
                    (err, rows) => {
                        if (err) return res.send(err)

                        if (
                            req.body.libelle &&
                            req.body.valeur &&
                            req.body.libelle.length > 0 &&
                            req.body.valeur.length > 0
                        )
                            req.body.valeur.map((val, index) => {
                                connection.query(
                                    "UPDATE etat_avancement SET valeuravancement = ?, libelle = ? WHERE id = ?",
                                    [
                                        val,
                                        req.body.libelle[index],
                                        req.body.idEtat[index]
                                    ],
                                    (err, rows) => {
                                        if (err) return res.send(err)
                                    }
                                )
                            })

                        res.send(true)
                    }
                )
            }
        }
    )

    app.post("/suprCreation", isLoggedIn, (req, res) => {
        let pathFinFichier
        //avant recupere les titre a suprimer dans la bdd
        console.log(req.body)
        // connection.query('SELECT nomfichier FROM creation WHERE id=?', [req.body.idCreation],(err,rows)=>{

        // 	if(err)
        // 		res.redirect("http://localhost:3000?err=1")

        connection.query(
            "DELETE FROM creation WHERE id=?",
            [req.body.id],
            (err, rows) => {
                if (err) res.send(err)
                /* pathFinFichier= rows[0].nomfichier;
				console(rows[0].nomfichier);
				let pathComplet=  __dirname + '/../public/audio/'+pathFinFichier; */
                // console.log(pathComplet);
                // fs.unlinkSync(pathComplet)
                res.send(true)
            }
        )
    })

    require("./routes/auth")(app, passport)
    require("./routes/users")(app, connection)
    require("./routes/public_get")(app, connection)
}

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.send(false)
}
