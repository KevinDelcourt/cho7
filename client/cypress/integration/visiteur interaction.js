import reset_db from "../utils/reset_db"
import { beginAndLoginAsCreateur } from "../utils/web/authentification"
import { goToMesCreations, goToNouvelleCreation } from "../utils/web/navigation"
import {
    populateCreationForm,
    validerCreationForm,
    tweeter
} from "../utils/web/creation"
before(() => reset_db())

describe("notation création", () => {
    beforeEach(() => {})

    it("je suis sur la page d'accueil", () => {
        cy.log("je vais sur la page d'accueil")
        cy.visit("http://localhost:3000/")
    })

    it("j'écoute la création", () => {
        cy.get('[data-cypress="titreCreation"]')
            .first()
            .parent()
            .find('[data-cypress="star4"]')
            .click()
    })

    it("je met 4 étoiles", () => {
        cy.get('[data-cypress="titreCreation"]')
            .first()
            .parent()
            .find('[data-cypress="star4"]')
            .click()
    })
})
