const sign = require('cookie-signature').sign
const mysql = require('mysql');
const credentials = require('../db/db-identifiants.json')
const connection = mysql.createConnection(credentials)
const fs = require('fs')
const multer = require('multer')
const { body, validationResult } = require('express-validator/check');
const storageAudio = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/../public/audio/')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})
let uploadAudio = multer({ storage: storageAudio });
const storageImage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/../public/images/')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now()+"-"+file.originalname)
	}
})
let uploadImage = multer({ storage: storageImage });

const creationValidator = [
	body('titre').isLength({min: 1}).withMessage('Le titre est obligatoire').isLength({max: 50}).withMessage('Le titre doit faire un maximum de 50 caractères'),
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
	}),
	body('description').isLength({max: 2048}).withMessage('Description trop longue, maximum 2048 caractères')
];

const etatAvancementValidator = [
	body('libelle.*').isString().isLength({min: 1}).withMessage('Le label de l\'état est obligatoire').isLength({max: 50}).withMessage('Le titre doit faire un maximum de 50 caractères'),
	body('idEtat.*').isInt({ min: 0, max: 99999999999 }),
	body('valeur.*', 'Valeur invalide').isInt({ min: 0, max: 100 })
];


module.exports = (app, passport) => {

	app.get('/', (req, res) => {
		res.setHeader('Content-Type', 'text/plain')
		res.send('Server online')
	})

	app.get('/denied', (req, res) => {
		res.setHeader('Content-Type', 'text/plain')
		res.send('false')
	})

	app.post('/login', passport.authenticate('local', { failureRedirect: "/denied" }),
		(req, res) => {
			console.log("logged in")
			console.log(req.user)
			if (req.body.remember) {
				req.session.cookie.maxAge = 1000 * 60 * 3
			} else {
				req.session.cookie.expires = false
			}
			res.send('s:' + sign(req.sessionID, 'a'));
		})


	/* NOUVELLE CREATION */
		
	app.post('/addcreation', uploadAudio.single('creation'), creationValidator, etatAvancementValidator, (req, res) => {
		const titre = req.body.titre;
		const desc = req.body.description;
		const errors = validationResult(req);
		
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		} else {
			// Si fichier renseigné
			if (req.file) {
				connection.query('INSERT INTO creation (nomfichier, titre, description) VALUES (?, ?, ?)', [req.file.originalname, titre, desc], (err, rows) => {
					if(err)
						res.redirect("http://localhost:3000/newCreation?err=1")

					// Si au moins 1 état d'avancement renseigné
					if(req.body.libelle) {
						req.body.libelle.map((l, index) => {
							connection.query('INSERT INTO etat_avancement (libelle, valeuravancement, idcreation) VALUES (?, ?, ?)',[l, req.body.valeur[index], rows.insertId], (err, rows) => {
								if(err)
									res.redirect("http://localhost:3000/newCreation?err=1")
							})
						})
					} else {
						res.redirect("http://localhost:3000/creations")
					}
				})
			} else {
				connection.query('INSERT INTO creation (titre, description) VALUES (?,?)', [titre, desc], (err, rows) => {
					if(err)
						res.redirect("http://localhost:3000/newCreation?err=1")

					// Si au moins 1 état d'avancement renseigné
					if(req.body.libelle) {
						req.body.libelle.map((l, index) => {
							connection.query('INSERT INTO etat_avancement (libelle, valeuravancement, idcreation) VALUES (?, ?, ?)',[l, req.body.valeur[index], rows.insertId], (err, rows) => {
								if(err)
									res.redirect("http://localhost:3000/newCreation?err=1")
							})
						})
					} else {
						res.redirect("http://localhost:3000/creations")
					}
				})
			}
			
			res.redirect("http://localhost:3000/creations")
		}
	})


	/* MODIFIER CREATION */

	app.post('/updateCreation/:id', uploadAudio.single('creation'), creationValidator, (req, res) => {
		const idCreation = req.params.id;

		if (req.file) {
			connection.query('UPDATE creation SET nomfichier = ?, titre = ?, description = ? WHERE id = ?',[req.file.originalname, req.body.titre, req.body.description, idCreation],(err,rows)=>{
				if(err)
					res.redirect("http://localhost:3000/updateCreation/" + idCreation + "?err=1");
			})
		} else {
			connection.query('UPDATE creation SET titre = ?, description = ? WHERE id = ?',[req.body.titre, req.body.description, idCreation],(err,rows)=>{
				if(err)
					res.redirect("http://localhost:3000/updateCreation/" + idCreation + "?err=2");
			})
		}

		req.body.valeur.map((val, index) => {
			connection.query('UPDATE etat_avancement SET valeuravancement = ? WHERE id = ?',[val, req.body.idEtat[index]], (err, rows) => {
				if(err)
					res.redirect("http://localhost:3000/updateCreation/" + idCreation + "?err=3");
			})
		})

		res.redirect(req.get('referer'));
	})


	/* SUPPRIMER CREATION */

	app.post('/suprCreation',uploadAudio.none(),(req,res)=>{
		let pathFinFichier;
		//avant recupere les titre a suprimer dans la bdd
		console.log(req.body)
		console.log("okokookokokokokokokokokokookokookokokokokoko");
		// connection.query('SELECT nomfichier FROM creation WHERE id=?', [req.body.idCreation],(err,rows)=>{

		// 	if(err)
		// 		res.redirect("http://localhost:3000?err=1")
				
			connection.query('DELETE FROM creation WHERE id=?',[req.body.idCreation],(err,rows)=>{
				/* pathFinFichier= rows[0].nomfichier;
				console(rows[0].nomfichier);
				let pathComplet=  __dirname + '/../public/audio/'+pathFinFichier; */
				// console.log(pathComplet);
				// fs.unlinkSync(pathComplet)
				res.redirect("http://localhost:3000/");
				
				})
				
				});	
			// });


	app.post('/renseignerprofil',uploadImage.single('avatar'), (req, res) => {
		let filename = ""
		if(req.file){
			filename = req.file.filename
	
			connection.query('UPDATE users SET username = ?, password = ?, email = ?, presentation = ?, avatar = ? WHERE role="ROLE_CREATEUR";',
				[req.body.username, req.body.password, req.body.email, req.body.presentation,filename], (err, rows) => {
					if(err)
						res.send(err)
					res.redirect("http://localhost:3000/RenseignerProfilPage/");
				})
		}

		else {
			connection.query('UPDATE users SET username = ?, password = ?, email = ?, presentation = ? WHERE role="ROLE_CREATEUR";',
				[req.body.username, req.body.password, req.body.email, req.body.presentation], (err, rows) => {
					if(err)
						res.send(err)
					res.redirect("http://localhost:3000/RenseignerProfilPage/");
				})
		}
	})

	app.get('/etatsCreation/:idCreation', (req, res) => {
		connection.query('SELECT * FROM etat_avancement WHERE idcreation =' + req.params.idCreation, (err, rows) => {
			if (err)
				res.send(400)
			res.setHeader('Content-Type', 'application/json')
			res.send(rows)
		})
	})

	app.get('/creation/:id', (req, res) => {
		connection.query('SELECT * FROM creation WHERE id =' + req.params.id, (err, rows) => {
			if (err)
				res.send(400)
			res.setHeader('Content-Type', 'application/json')
			res.send(rows)
		})
	})

	app.get('/creations', (req, res) => {
		connection.query('SELECT id, nomfichier, titre, description FROM creation WHERE nomfichier IS NOT NULL ORDER BY id DESC', (err, rows) => {
			if (err)
				res.send(400)
			res.setHeader('Content-Type', 'application/json')
			res.send(rows)
		})
	})

	app.get('/creationsInProgress', (req, res) => {
		connection.query('SELECT id, titre FROM creation WHERE nomfichier IS NULL ORDER BY id DESC', (err, rows) => {
			if (err)
				res.send(400)
			res.setHeader('Content-Type', 'application/json')
			res.send(rows)
		})
	})

	app.get('/creator',(req, res)=>{
		connection.query('SELECT username, presentation FROM users WHERE role = "ROLE_CREATEUR"', (err,rows)=>{
			if(err)
				res.send(400)
			res.setHeader('Content-Type', 'application/json')
			res.send(rows)
		})
	})

	app.get('/avancement',(req, res)=>{
		connection.query('SELECT creation.titre, creation.description, etat_avancement.libelle,etat_avancement.valeuravancement, creation.miseajour FROM creation,etat_avancement WHERE etat_avancement.idcreation=creation.id AND creation.nomfichier is null', (err,rows)=>{
			if(err)
				res.send(400)

			res.setHeader('Content-Type', 'application/json')
			res.send(rows)
		})
	})

	app.get('/has_role/:role', isLoggedIn, (req, res) => {
		res.setHeader('Content-Type', 'text/plain')
		if (req.user.role === 'ROLE_' + req.params.role.toUpperCase())
			res.send('true')
		else
			res.send('false')
	})

	app.get('/user',isLoggedIn , (req, res) => {
		res.setHeader('Content-Type', 'application/json')
		res.send(req.user)
	})

	app.get('/createur', (req, res) => {
		connection.query("SELECT * FROM users WHERE role = 'ROLE_CREATEUR'", (err, rows)=>{
			res.setHeader('Content-Type', 'application/json')
			res.send(rows[0])	
		})
	})

	

	app.get('/logout', (req, res) => {
		console.log('login out...')
		res.cookie("connect.sid", "", { expires: new Date() })
		res.send('logged out')
		req.logout()
	})
}

const isLoggedIn = (req, res, next) => {
	console.log('Auth check...')
	console.log(req.cookies)
	if (req.isAuthenticated()) {
		console.log('ok!')
		return next();
	}
	console.log('denied! Redirecting...')
	res.redirect('/denied');
}
