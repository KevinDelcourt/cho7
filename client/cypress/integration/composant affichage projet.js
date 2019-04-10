import reset_db from "../utils/reset_db"
import { beginAndLoginAsCreateur } from "../utils/web/authentification"
import { goToMesCreations } from "../utils/web/navigation"

describe("composant affichage projet", () => {
    before(() => reset_db())
    it("je teste le composant affichage projet", () => {
        beginAndLoginAsCreateur()
        goToMesCreations()

        cy.log("page de modification")
        cy.get("tbody > :nth-child(2) > :nth-child(2)").click()
        cy.url().should("eq", "http://localhost:3000/updateCreation/3")
    })
})
