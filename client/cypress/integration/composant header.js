import reset_db from "../utils/reset_db"
before(() => reset_db())

describe("composant header", () => {
    it("je teste le composant header", () => {
        cy.visit("http://localhost:3000/")
        cy.contains("Connexion").click()
        cy.url().should("eq", "http://localhost:3000/login")

        cy.log("cilck et ajout de l'username")

        cy.get(":nth-child(1) > .sc-EHOje > .sc-bxivhb").type("Admin")

        cy.log("cilck et ajout du mdp")
        cy.get(":nth-child(2) > .sc-EHOje > .sc-bxivhb").type("Admin")

        cy.log("cilck pour la connexion")
        cy.contains("Se connecter").click()
        cy.url().should("eq", "http://localhost:3000/")

        cy.log("cilck sur la profil")
        cy.contains("Profil").click()
        cy.url().should("eq", "http://localhost:3000/RenseignerProfilPage")

        cy.log("cilck sur la creation")
        cy.contains("Mes créations").click()
        cy.url().should("eq", "http://localhost:3000/creations")

        cy.log("cilck sur l'image")
        cy.get(".sc-gqjmRU").click()
        cy.url().should("eq", "http://localhost:3000/")

        cy.log("cilck sur l'accueil")
        cy.contains("Accueil").click()
        cy.url().should("eq", "http://localhost:3000/")

        cy.log("cilck sur la deconnexion")
        cy.contains("Déconnexion").click()
        cy.url().should("eq", "http://localhost:3000/")
    })
})
//cy.get('.sc-gqjmRU')
