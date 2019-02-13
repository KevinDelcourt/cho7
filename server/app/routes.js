const sign = require('cookie-signature').sign
const mysql = require('mysql');
const credentials = require('../db/db-identifiants.json')
const connection = mysql.createConnection(credentials)
const fs = require('fs')
const multer = require('multer')
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
		cb(null, "avatar.png")
	}
})
let uploadImage = multer({ storage: storageImage });

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

	app.post('/addcreation', uploadAudio.single('file'), (req, res) => {
		connection.query('INSERT INTO creation (nomfichier,titre,description) VALUES (?,?,?)', [req.file.originalname, req.body.titre, req.body.description], (err, rows) => {
			if (err)
				res.send("Erreur")

			res.send("ok ok")
		})
	})

	app.post('/renseignerprofil',
	uploadImage.single('avatar'), (req, res) => {
		connection.query('UPDATE users SET username = ?, password = ?, email = ?, presentation = ? WHERE role="ROLE_CREATEUR";',
			[req.body.username, req.body.password, req.body.email, req.body.presentation], (err, rows) => {
				if(err)
					res.send(err)
				res.send(rows)
			})
	})

	app.get('/creations', (req, res) => {
		connection.query('SELECT id, nomfichier, titre, description FROM creation ORDER BY id DESC', (err, rows) => {
			if (err)
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
