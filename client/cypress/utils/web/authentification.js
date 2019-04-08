export const loginAsCreateur = () => {
    cy.url().should("eq", "http://localhost:3000/login")

    cy.get(":nth-child(1) > .sc-ifAKCX > .sc-bxivhb").type("Admin")

    cy.get(":nth-child(2) > .sc-ifAKCX > .sc-bxivhb").type("Admin")

    cy.contains("Se connecter").click()

    cy.url().should("eq", "http://localhost:3000/")
}

export const beginAndLoginAsCreateur = () => {
    cy.visit("http://localhost:3000/")
    cy.contains("Connexion").click()

    loginAsCreateur()
}
