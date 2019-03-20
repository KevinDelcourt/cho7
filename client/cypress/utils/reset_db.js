const reset_db = () => cy.exec('node "./../server/db/init_db.js"')

export default reset_db
