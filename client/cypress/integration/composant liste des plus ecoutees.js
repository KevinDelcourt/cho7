import { reset_and_query } from "../utils/reset_db"

//ok donc le plan ici c'est de tester
//  creation de projet normal
//  creation de projet sans eta d'avencement
//  creation de projet vide
//  et non on ne testeras pas de projet avec un vrai fichier son

describe("liste des plus écoutés", () => {
    it("cas 1", () => {
        reset_and_query(
            "INSERT INTO creation (nomfichier,titre,nbecoute) VALUES ('oui.mp3','1',10),('oui.mp3','2',11)"
        )
        cy.visit("http://localhost:3000/")
        cy.contains("Créations les plus écoutées")
            .next()
            .children()
            .first()
            .should("contain", "2")
    })

    it("cas 2", () => {
        reset_and_query(
            "INSERT INTO creation (nomfichier,titre,nbecoute) VALUES ('oui.mp3','1',12),('oui.mp3','2',11)"
        )
        cy.visit("http://localhost:3000/")
        cy.contains("Créations les plus écoutées")
            .next()
            .children()
            .first()
            .should("contain", "1")
    })
})
