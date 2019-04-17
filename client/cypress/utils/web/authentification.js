export const loginAsCreateur = () => {
    cy.url().should("eq", "http://localhost:3000/login")

    cy.get('[data-cypress="field1"]').type("Admin")
    cy.get('[data-cypress="field2"]').type("Admin")
    cy.get("[data-cypress=submit]").click()

    cy.url().should("eq", "http://localhost:3000/")
}

export const beginAndLoginAsCreateur = () => {
    cy.visit("http://localhost:3000/")
    cy.contains("Connexion").click()

    loginAsCreateur()
}
