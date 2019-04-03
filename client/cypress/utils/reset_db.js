const reset_db = () => cy.exec('node "./../server/db/init_db.js"')

export const reset_and_query = sql =>
    cy.exec('node "./../server/db/init_db.js" "' + sql + '"')

export default reset_db
