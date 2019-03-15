
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
		cb(null, "avatar_createur."+file.originalname.split('.').pop())
	}
})
let uploadImage = multer({ storage: storageImage });

module.exports = (app, passport) => {
		
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
			if(req.body.libelle)
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
			else{
				res.redirect("http://localhost:3000/Creation")
			}
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

	app.post('/suprCreation',(req,res)=>{
		let pathFinFichier;
		//avant recupere les titre a suprimer dans la bdd
		console.log(req.body)
		// connection.query('SELECT nomfichier FROM creation WHERE id=?', [req.body.idCreation],(err,rows)=>{

		// 	if(err)
		// 		res.redirect("http://localhost:3000?err=1")
				
			connection.query('DELETE FROM creation WHERE id=?',[req.body.id],(err,rows)=>{
				if(err)
					res.send(err)
				/* pathFinFichier= rows[0].nomfichier;
				console(rows[0].nomfichier);
				let pathComplet=  __dirname + '/../public/audio/'+pathFinFichier; */
				// console.log(pathComplet);
				// fs.unlinkSync(pathComplet)
				res.send(true);
				
				})
				
				});	
			// });


	app.post('/renseignerprofil',uploadImage.single('fichierAvatar'), (req, res) => {
		
		let filename = ""
		if(req.file){
			filename = "avatar_createur." + req.file.filename.split('.').pop()
			connection.query('UPDATE users SET username = ?, password = ?, email = ?, presentation = ?, avatar = ? WHERE role="ROLE_CREATEUR";',
				[req.body.username, req.body.password, req.body.email, req.body.presentation,filename], (err, rows) => {
					if(err)
						res.send(err)
					res.send('ok')
				})
		}
		else {
			connection.query('UPDATE users SET username = ?, password = ?, email = ?, presentation = ? WHERE role="ROLE_CREATEUR";',
				[req.body.username, req.body.password, req.body.email, req.body.presentation], (err, rows) => {
					if(err)
						res.send(err)
					res.send('ok')
				})
		}
	})

	app.get('/has_role/:role', isLoggedIn, (req, res) => {
		res.send( req.user.role === 'ROLE_' + req.params.role.toUpperCase() )
	})

	app.get('/user', isLoggedIn , (req, res) => {
		res.send(req.user)
	})

	require('./routes/auth')(app, passport)
	require('./routes/public_get')(app, connection)
}

const isLoggedIn = (req, res, next) => {
	console.log('Auth check...')
	if (req.isAuthenticated()) {
		console.log('ok!')
		return next();
	}
	console.log('denied! Redirecting...')
	res.redirect('/denied');
}