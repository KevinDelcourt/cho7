const mysql = require('mysql')
const credentials = require('./db-identifiants.json')

exports.findById = (id, cb) => {
    const connection = mysql.createConnection(credentials);

    connection.connect((err) => {
    if (err) throw err;
    });

    connection.query('SELECT * FROM users WHERE id='+connexion.escape(id), (err,rows) => {
        if(err) cb(err)
    
        cb(null,rows)
    });

}
  
exports.findByUsername = (username, cb) => {

    const connection = mysql.createConnection(credentials);

    connection.connect((err) => {
    if (err) throw err;
    });
    
    connection.query('SELECT * FROM users WHERE username=\''+username+'\'', (err,rows) => {
        if(err) cb(err)
    
        cb(null,rows)
    });
}