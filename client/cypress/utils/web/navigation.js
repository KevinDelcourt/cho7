export const goToRenseignerProfilPage = () => {
    cy.log("click sur le profil")
    cy.contains("Profil").click()
    cy.url().should("eq", "http://localhost:3000/RenseignerProfilPage")
}

export const goToMesCreations = () => {
    cy.log("cilck sur la creation")
    cy.get("[data-cypress=boutonMenuCreation]").click()
    cy.url().should("eq", "http://localhost:3000/creations")
}

export const goToAccueilBouton = () => {
    cy.log("cilck sur l'accueil")
    cy.contains("Accueil").click()
    cy.url().should("eq", "http://localhost:3000/")
}

export const goToAccueilImage = () => {
    cy.log("cilck sur l'image")
    cy.get("[data-cypress=banierre]").click()
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

export const goToDeconnexion = () => {
    cy.log("click sur la deconnexion")
    cy.contains("Déconnexion").click()
    cy.url().should("eq", "http://localhost:3000/")
}
