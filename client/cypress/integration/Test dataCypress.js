import reset_db from "../utils/reset_db"
import { beginAndLoginAsCreateur } from "../utils/web/authentification"
import {
    goToRenseignerProfilPage,
    goToMesCreations,
    goToAccueil
} from "../utils/web/navigation"

describe("test DataCypress", () => {

    it("test DataCypress I", () => {
        cy.visit("http://localhost:3000/")
        cy.contains("Connexion").click()
        cy.url().should("eq", "http://localhost:3000/login")
        cy.get(":nth-child(1) > .sc-ifAKCX > .sc-bxivhb").type("Admin")
        cy.get(":nth-child(2) > .sc-ifAKCX > .sc-bxivhb").type("Admin")

        cy.get("[data-cypress=submit]").click()
    })
})




