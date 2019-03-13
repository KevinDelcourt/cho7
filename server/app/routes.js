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
		cb(null, Date.now()+"-"+file.originalname)
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
		
	app.post('/addcreation',uploadAudio.single('creation'),(req,res)=>{
		console.log(req.file)
		console.log(req.body)
		if(req.file)
			connection.query('INSERT INTO creation (nomfichier,titre,description) VALUES (?,?,?)',[req.file.originalname,req.body.titre,req.body.description],(err,rows)=>{
				if(err)
					res.redirect("http://localhost:3000?err=1")

				res.redirect("http://localhost:3000/")
			})
		else{
			connection.query('INSERT INTO creation (titre,description) VALUES (?,?)',[req.body.titre,req.body.description],(err,rows)=>{
				if(err)
					res.redirect("http://localhost:3000?err=1")
				
				req.body.libelle.map((l,index)=>{
					connection.query('INSERT INTO etat_avancement (libelle,valeuravancement,idcreation) VALUES (?,?,?)',[l,req.body.valeur[index],rows.insertId],(err,rows)=>{
						if(err)
							res.redirect("http://localhost:3000?err=1")
					})
				})	

				res.redirect("http://localhost:3000/")
			})
		}
	})

	app.post('/updateCreation/:id',uploadAudio.single('creation'),(req,res)=>{
		const idCreation = req.params.id;

		if (req.file)
			connection.query('UPDATE creation SET nomfichier = ?, titre = ?, description = ? WHERE id = ?',[req.file.originalname, req.body.titre, req.body.description, idCreation],(err,rows)=>{
				req.body.valeur.map((val, index)=>{
					connection.query('UPDATE etat_avancement SET valeuravancement = ? WHERE id = ?',[val, req.body.idEtat[index]],(err,rows)=>{
						if(err)
							res.redirect("http://localhost:3000?err=1")
					})
				})
				
				if(err)
					res.redirect(req.get('referer'));

				//res.redirect("http://localhost:3000/updateCreation/" + idCreation);
				res.redirect(req.get('referer'));
			})
		else
			connection.query('UPDATE creation SET titre = ?, description = ? WHERE id = ?',[req.body.titre, req.body.description, idCreation],(err,rows)=>{
				req.body.valeur.map((val, index)=>{
					connection.query('UPDATE etat_avancement SET valeuravancement = ? WHERE id = ?',[val, req.body.idEtat[index]],(err,rows)=>{
						if(err)
							res.redirect("http://localhost:3000?err=1")
					})
				})	
				
				if(err)
					res.redirect(req.get('referer'));

				res.redirect(req.get('referer'));
			})
	})

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
			
	app.post('/renseignerprofil',
	uploadImage.single('avatar'), (req, res) => {
		console.log(req.file)
		connection.query('UPDATE users SET username = ?, password = ?, email = ?, presentation = ?, avatar = ? WHERE role="ROLE_CREATEUR";',
			[req.body.username, req.body.password, req.body.email, req.body.presentation,req.file.filename], (err, rows) => {
				if(err)
					res.send(err)
				res.redirect("http://localhost:3000/RenseignerProfilPage/");
			})
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

	app.get('/avencement',(req, res)=>{
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
