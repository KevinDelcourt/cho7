const signature = require('cookie-signature')

module.exports = function(app, passport) {

	app.get('/',function(req,res){
		res.setHeader('Content-Type', 'text/plain');
		res.send('server online')
	  })

	app.get('/login', function(req, res) {
		res.setHeader('Content-Type', 'text/plain');
		res.send('login: ' + req.flash('loginMessage') )
	});

	app.get('/denied', function(req, res) {
		res.setHeader('Content-Type', 'text/plain');
		res.send('Mauvais login ou mot de passe') 
	});

	app.post('/login', passport.authenticate('local',{failureRedirect:"/denied"}),
        function(req, res) {
            console.log("logged in")
						console.log(req.user)
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3
            } else {
              req.session.cookie.expires = false
            }
        res.send('s:'+signature.sign(req.sessionID,'a'));
    })

	app.get('/profile', isLoggedIn, function(req, res) {
		res.setHeader('Content-Type', 'text/plain');
		res.send('secured')
	});

	app.get('/logout', function(req, res) {
		console.log('login out...')
		res.cookie("connect.sid", "", { expires: new Date() });
		res.send('logged out');
		req.logout()
	});
};

function isLoggedIn(req, res, next) {
	console.log('Auth check...')
	console.log(req.cookies)
	if (req.isAuthenticated()){
		console.log('ok!')
		return next();
	}
	console.log('denied! Redirecting...')
	res.redirect('/');
}
