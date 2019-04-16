const mysql = require("mysql")

const fs = require("fs")

const credentials = require("./db-identifiants.json")
credentials.multipleStatements = true
const connection = mysql.createConnection(credentials)

const request = fs.readFileSync(__dirname + "/mysql/init_db2.sql").toString()

let sql = null
if (process.argv.length > 2) sql = process.argv[2]

connection.query(request, (err, result) => {
    if (err) throw err
    console.log(result)
    if (sql !== null)
        connection.query(sql, (err, result) => {
            if (err) throw err
            console.log(result)
            connection.destroy()
        })
    else connection.destroy()
})
