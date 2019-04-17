export const goToRenseignerProfilPage = () => {
    cy.log("click sur la profil")
    cy.contains("Profil").click()
    cy.url().should("eq", "http://localhost:3000/RenseignerProfilPage")
}

export const goToMesCreations = () => {
    cy.log("cilck sur la creation")
    cy.get("[data-cypress=boutonMenuCreation]").click()
    cy.url().should("eq", "http://localhost:3000/creations")
}

export const goToAccueil = () => {
    cy.log("cilck sur l'accueil")
    cy.contains("Accueil").click()
    cy.url().should("eq", "http://localhost:3000/")
}

export const goToNouvelleCreation = () => {
    cy.url().should("eq", "http://localhost:3000/creations")
    cy.log("cilck sur la nouvelle creation")
    cy.contains("NOUVELLE CRÉATION").click()
    cy.url().should("eq", "http://localhost:3000/newCreation")
}

export const goToModification = () => {
    cy.log("page de modification")
    cy.get('[href="/updateCreation/3"]').click()
    cy.url().should("eq", "http://localhost:3000/updateCreation/3")
}
