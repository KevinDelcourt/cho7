const sign = require('cookie-signature').sign

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
