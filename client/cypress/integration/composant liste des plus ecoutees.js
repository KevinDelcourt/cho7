import { reset_and_query } from "../utils/reset_db"

describe("liste des plus écoutés", () => {
    // A TESTER AVEC LE SELECT ET POUR TOUT
    /* it("la liste est bien triée", () => {
        reset_and_query(
            "INSERT INTO creation (nomfichier,titre,nbecoute) VALUES ('oui.mp3','1',10),('oui.mp3','2',11)"
        )
        cy.visit("http://localhost:3000/")
        cy.contains("Dernières créations")
            .next()
            .children()
            .first()
            .should("contain", "2")
    })

    it("la liste est bien triée", () => {
        reset_and_query(
            "INSERT INTO creation (nomfichier,titre,nbecoute) VALUES ('oui.mp3','1',12),('oui.mp3','2',11)"
        )
        cy.visit("http://localhost:3000/")
        cy.contains("Dernières créations")
            .next()
            .children()
            .first()
            .should("contain", "1")
    }) */
})
