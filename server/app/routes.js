const mysql = require("mysql")
const credentials = require("../db/db-identifiants.json")
const connection = mysql.createConnection(credentials)
const fs = require("fs")
const multer = require("multer")
const { body, validationResult } = require("express-validator/check")
const storageAudio = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/../public/audio/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
let uploadAudio = multer({ storage: storageAudio })
const storageImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/../public/images/")
    },
    filename: (req, file, cb) => {
        cb(null, "avatar_createur." + file.originalname.split(".").pop())
    }
})
let uploadImage = multer({ storage: storageImage })

const creationValidator = [
    body("titre")
        .isLength({ min: 1 })
        .withMessage("Le titre est obligatoire")
        .isLength({ max: 50 })
        .withMessage("Le titre doit faire un maximum de 50 caractères"),
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
        }),
    body("description")
        .isLength({ max: 2048 })
        .withMessage("Description trop longue, maximum 2048 caractères")
]

module.exports = (app, passport) => {
    app.get("/", (req, res) => {
        res.send(true)
    })

    app.post(
        "/addcreation",
        uploadAudio.single("creation"),
        creationValidator,
        (req, res) => {
            if (req.file)
                connection.query(
                    "INSERT INTO creation (nomfichier,titre,description) VALUES (?,?,?)",
                    [
                        req.file.originalname,
                        req.body.titre,
                        req.body.description
                    ],
                    (err, rows) => {
                        if (err) res.send(err)

                        res.send(true)
                    }
                )
            else {
                if (req.body.libelle && req.body.titre)
                    connection.query(
                        "INSERT INTO creation (titre,description) VALUES (?,?)",
                        [req.body.titre, req.body.description],
                        (err, rows) => {
                            if (err) res.send(err)

                            req.body.libelle.map((l, index) => {
                                connection.query(
                                    "INSERT INTO etat_avancement (libelle,valeuravancement,idcreation) VALUES (?,?,?)",
                                    [l, req.body.valeur[index], rows.insertId],
                                    (err, rows) => {
                                        if (err) res.send(err)
                                    }
                                )
                            })

                            res.send(true)
                        }
                    )
                else {
                    res.send(false)
                }
            }
        }
    )

    app.post(
        "/updateCreation/",
        uploadAudio.single("creation"),
        creationValidator,
        (req, res) => {
            const idCreation = req.body.id

            if (req.file)
                connection.query(
                    "UPDATE creation SET nomfichier = ?, titre = ?, description = ? WHERE id = ?",
                    [
                        req.file.originalname,
                        req.body.titre,
                        req.body.description,
                        idCreation
                    ],
                    (err, rows) => {
                        if (err) res.send(err)

                        res.send(true)
                    }
                )
            else
                connection.query(
                    "UPDATE creation SET titre = ?, description = ? WHERE id = ?",
                    [req.body.titre, req.body.description, idCreation],
                    (err, rows) => {
                        if (req.body.valeur)
                            req.body.valeur.map((val, index) => {
                                connection.query(
                                    "UPDATE etat_avancement SET valeuravancement = ?, libelle = ? WHERE id = ?",
                                    [
                                        val,
                                        req.body.libelle[index],
                                        req.body.idEtat[index]
                                    ],
                                    (err, rows) => {
                                        if (err) res.send(err)
                                    }
                                )
                            })

                        if (err) res.send(err)

                        res.send(true)
                    }
                )
        }
    )

    app.post("/suprCreation", (req, res) => {
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
    // });

    app.post(
        "/renseignerprofil",
        uploadImage.single("fichierAvatar"),
        (req, res) => {
            let filename = ""
            if (req.file) {
                filename =
                    "avatar_createur." + req.file.filename.split(".").pop()
                connection.query(
                    'UPDATE users SET username = ?, password = ?, email = ?, presentation = ?, avatar = ? WHERE role="ROLE_CREATEUR";',
                    [
                        req.body.username,
                        req.body.password,
                        req.body.email,
                        req.body.presentation,
                        filename
                    ],
                    (err, rows) => {
                        if (err) res.send(err)
                        res.send(true)
                    }
                )
            } else {
                connection.query(
                    'UPDATE users SET username = ?, password = ?, email = ?, presentation = ? WHERE role="ROLE_CREATEUR";',
                    [
                        req.body.username,
                        req.body.password,
                        req.body.email,
                        req.body.presentation
                    ],
                    (err, rows) => {
                        if (err) res.send(err)
                        res.send(true)
                    }
                )
            }
        }
    )

    app.get("/has_role/:role", isLoggedIn, (req, res) => {
        res.send(req.user.role === "ROLE_" + req.params.role.toUpperCase())
    })

    app.get("/user", isLoggedIn, (req, res) => {
        res.send(req.user)
    })

    require("./routes/auth")(app, passport)
    require("./routes/public_get")(app, connection)
}

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.send(false)
}
