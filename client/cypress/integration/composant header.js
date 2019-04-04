import reset_db from "../utils/reset_db"
import { beginAndLoginAsCreateur } from "../utils/web/authentification"
import {
    goToRenseignerProfilPage,
    goToMesCreations,
    goToAccueil
} from "../utils/web/navigation"

before(() => reset_db())

describe("composant header", () => {
    it("navigation du point de vue du créateur", () => {
        beginAndLoginAsCreateur()

        goToRenseignerProfilPage()

        goToMesCreations()

        cy.log("cilck sur l'image")
        cy.get(".sc-fjdhpX > :nth-child(1) > center").click()
        cy.url().should("eq", "http://localhost:3000/")

        goToAccueil()

        cy.log("cilck sur la deconnexion")
        cy.contains("Déconnexion").click()
        cy.url().should("eq", "http://localhost:3000/")
    })
})
