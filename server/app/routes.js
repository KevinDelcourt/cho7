const sign = require('cookie-signature').sign
const mysql = require('mysql');
const credentials = require('../db/db-identifiants.json')
const connection = mysql.createConnection(credentials)
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../public/audio/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
let upload = multer({ storage: storage });

module.exports = (app, passport) => {

	app.get('/',(req,res) => {
		res.setHeader('Content-Type', 'text/plain')
		res.send('Server online')
	  })

	app.get('/denied', (req, res) => {
		res.setHeader('Content-Type', 'text/plain')
		res.send('false') 
	})

	app.post('/login', passport.authenticate('local',{failureRedirect:"/denied"}),
        (req, res) => {
            console.log("logged in")
						console.log(req.user)
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3
            } else {
              req.session.cookie.expires = false
            }
        res.send('s:'+sign(req.sessionID,'a'));
		})
		
	app.post('/addcreation',upload.single('creation'),(req,res)=>{
		console.log(req.file)
		console.log(req.body)
		connection.query('INSERT INTO creation (nomfichier,titre,description) VALUES (?,?,?)',[req.file.originalname,req.body.titre,req.body.description],(err,rows)=>{
			if(err)
				res.redirect("http://localhost:3000?err=1")

			res.redirect("http://localhost:3000/");
		})
	})

	app.get('/creations',(req,res)=>{
		connection.query('SELECT id, nomfichier, titre, description FROM creation ORDER BY id DESC',(err,rows)=>{
			if(err)
				res.send(400)
			res.setHeader('Content-Type', 'application/json')
			res.send(rows)
		})
	})

	app.get('/has_role/:role', isLoggedIn, (req, res) => {
		res.setHeader('Content-Type', 'text/plain')
		if(req.user.role === 'ROLE_'+req.params.role.toUpperCase())
			res.send('true')
		else
			res.send('false')
	})

	app.get('/logout', (req, res) => {
		console.log('login out...')
		res.cookie("connect.sid", "", { expires: new Date()})
		res.send('logged out')
		req.logout()
	})
}

const isLoggedIn = (req, res, next) =>{
	console.log('Auth check...')
	console.log(req.cookies)
	if (req.isAuthenticated()){
		console.log('ok!')
		return next();
	}
	console.log('denied! Redirecting...')
	res.redirect('/denied');
}
