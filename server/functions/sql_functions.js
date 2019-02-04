exports.getProfilCreateur = ((connection,res) =>{
    connection.query('SELECT username,email,presentation FROM users WHERE role=\'ROLE_CREATEUR\'', (err,rows) => {
        if(err) throw err
        if(rows.length != 1) new error('Il n\'y a pas exactement un créateur dans la base')
        
        res.setHeader('Content-Type', 'text/plain');
        res.send(JSON.stringify(rows[0]))
    });
})

exports.setUsernameCreateur = ((connection,req,res) =>{
    connection.query("UPDATE users SET username =" +connection.escape(req.body.username)+" WHERE role='ROLE_CREATEUR'", (err,result) => {
        if(err) throw err
        res.setHeader('Content-Type', 'text/plain')
        res.send(JSON.stringify(result))
    });
})