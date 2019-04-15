import reset_db from "../utils/reset_db"
import { beginAndLoginAsCreateur } from "../utils/web/authentification"
import { goToMesCreations } from "../utils/web/navigation"

describe("composant affichage projet", () => {
    before(() => reset_db())
    it("je teste le composant affichage projet", () => {
        beginAndLoginAsCreateur()
        goToMesCreations()

        //page de modification
        cy.log("page de modification")
        cy.get('[href="/updateCreation/3"]').click()
        cy.url().should("eq", "http://localhost:3000/updateCreation/3")

        //modification
    })
})
