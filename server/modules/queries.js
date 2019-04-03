const setBuilder = json => {
    let query = ""
    for (let key in json) query += key + " = ?,"

    return query.slice(0, -1)
}

const jsonToArray = json => {
    let array = []
    for (let val in json) array.push(json[val])
    return array
}
module.exports = {
    updateCreateurQuery: (connexion, json, cb) => {
        connexion.query(
            "UPDATE users SET " +
                setBuilder(json) +
                'WHERE role = "ROLE_CREATEUR";',
            jsonToArray(json),
            (err, rows) => cb(err, rows)
        )
    },

    setBuilder: setBuilder,

    jsonToArray: jsonToArray
}
