const mysql = require("mysql")

const fs = require("fs")

const credentials = require("./db-identifiants.json")
credentials.multipleStatements = true
const connection = mysql.createConnection(credentials)

const request = fs.readFileSync(__dirname + "/mysql/init_db.sql").toString()

let sql = process.argv[2]

const exec = sql =>
    connection.query(request, (err, result) => {
        if (err) throw err
        console.log(result)
        connexction.query(sql, (err, result) => {
            if (err) throw err
            console.log(result)
            connection.destroy()
        })
    })

module.exports = {
    exec
}
