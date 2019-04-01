const mysql = require("mysql")

const fs = require("fs")

const credentials = require("./db-identifiants.json")
credentials.multipleStatements = true
const connection = mysql.createConnection(credentials)

const request = fs.readFileSync(__dirname + "/mysql/init_db.sql").toString()

connection.query(request, (err, result) => {
    if (err) throw err
    console.log(result)
    connection.destroy()
})
