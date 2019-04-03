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
	body('titre').isLength({min: 1}).withMessage('Le titre est obligatoire'),
	body('creation').custom((value, {req}) => {
		if (!req.file) {
			return true
		} else if (req.file.mimetype.split('/')[0] != 'audio') {
			throw new Error('Seuls les fichiers audios sont acceptés')
		} else {
			return true
		}
	}).custom((value, {req}) => {
		if (!req.file) {
			return true
		} else if (req.file.originalname.length > 50) {
			throw new Error('Nom de fichier trop long, maximum 50 caractères')
		} else {
			return true
		}
	})
];

const etatAvancementValidator = [
	body('libelle.*').isString().isLength({min: 1}).withMessage('Le label de l\'état est obligatoire').isLength({max: 50}).withMessage('Le titre doit faire un maximum de 50 caractères'),
	body('idEtat.*').isInt({ min: 0, max: 99999999999 }),
	body('valeur.*', 'Valeur invalide').isInt({ min: 0, max: 100 })
];

module.exports = (app, passport) => {
    app.get("/", (req, res) => {
        res.send(true)
	})
	
	/* NOUVELLE CREATION */

    app.post(
        "/addcreation",
        isLoggedIn,
        uploadAudio.single("creation"),
		creationValidator,
		etatAvancementValidator,
        maxLenValidator(),
        hasNoErrors,
        (req, res) => {
            if (req.file)
                connection.query(
                    "INSERT INTO creation (nomfichier, titre, description) VALUES (?, ?, ?)",
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
                                "INSERT INTO etat_avancement (libelle, valeuravancement, idcreation) VALUES (?, ?, ?)",
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
                    valeur: "Au moins une valeur requise",
                    creation: "Un fichier ou un état requis"
                })
            }
        }
	)
	
	/* MODIFIER CREATION */

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

	/* SUPPRIMER CREATION */

	app.get('/deleteCreation/:id', isLoggedIn, (req, res) => {
		const idCreation = req.params.id;
		//let pathFinFichier;
		// Avant recupere les titre a suprimer dans la bdd
		// connection.query('SELECT nomfichier FROM creation WHERE id=?', [req.body.idCreation],(err,rows)=>{});
		
		if (/^(0|[1-9]\d*)$/.test(idCreation)) {
			connection.query('DELETE FROM creation WHERE id = ?', [idCreation], (err, rows) => {
				/* pathFinFichier= rows[0].nomfichier;
				console(rows[0].nomfichier);
				let pathComplet=  __dirname + '/../public/audio/'+pathFinFichier; */
				// console.log(pathComplet);
				// fs.unlinkSync(pathComplet)
				return res.send(true)
			})
		}

		return res.send(false)
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
