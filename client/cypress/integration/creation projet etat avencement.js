import reset_db from "../utils/reset_db"
import { beginAndLoginAsCreateur } from "../utils/web/authentification"
import { goToMesCreations, goToNouvelleCreation } from "../utils/web/navigation"
import {
    populateCreationForm,
    validerCreationForm
} from "../utils/web/creation"
before(() => reset_db())

describe("composant creation de projet sans fichier", () => {
    beforeEach(() => {
        beginAndLoginAsCreateur()
        goToMesCreations()
        goToNouvelleCreation()
    })

    it("je test la creation de projet normal", () => {
        cy.log("je test la creation de projet normal")
        populateCreationForm.validCreation()
        validerCreationForm()
        cy.url().should("eq", "http://localhost:3000/")
    })

    it("je test la creation de projet sans etat d'avancement", () => {
        populateCreationForm.creationSansEtats()
        validerCreationForm()
        cy.url().should("eq", "http://localhost:3000/newCreation")
    })

    it("je test la creation de projet vide", () => {
        validerCreationForm()
        cy.contains("Ce champs est obligatoire")
    })
})
