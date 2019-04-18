const { queryCallback } = require("../../modules/queries")

const themeController = connection => {
    return {
        getTheme: (req, res) => {
            connection.query("SELECT * FROM theme", (err, rows) =>
                queryCallback(err, res, () => {
                    let theme = {}
                    rows.map(r => {
                        theme[r.style] = r.value
                    })
                    return res.send(theme)
                })
            )
        },

        updateTheme: (req, res) => {
            let query = {
                mysql: "INSERT INTO theme (style,value) VALUES ",
                data: []
            }

            const addValues = (key, value) => {
                query.mysql += "(?,?),"
                query.data.push(key)
                query.data.push(value)
            }

            for (let key in req.body)
                if (req.body[key] != "undefined") addValues(key, req.body[key])

            for (let key in req.files)
                addValues(key.slice(0, -4), req.files[key][0].originalname)

            query.mysql = query.mysql.slice(0, -1)
            connection.query("DELETE FROM theme", (err, rows) => {
                queryCallback(err, res, () => {
                    connection.query(query.mysql, query.data, (err, rows) => {
                        queryCallback(err, res, () => res.send(true))
                    })
                })
            })
        }
    }
}

module.exports = themeController
