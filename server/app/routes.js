module.exports = function(app, passport) {

	app.get('/',function(req,res){
		res.setHeader('Content-Type', 'text/plain');
		res.send('server online')
	  })


	app.get('/login', function(req, res) {
		res.setHeader('Content-Type', 'text/plain');
		res.send( req.flash('loginMessage') );
	});

	app.post('/login', passport.authenticate('local',{
				successRedirect : '/profile',
				failureRedirect : '/login', 
				failureFlash : true 
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	app.get('/profile', isLoggedIn, function(req, res) {
		res.setHeader('Content-Type', 'text/plain');
		res.send('secured')
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req, res, next) {
	console.log('auth check')
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
