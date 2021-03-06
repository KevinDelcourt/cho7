const typeTitre = value => {
    cy.log("titre")
    cy.get('[data-cypress="titre"]').type(value)
    //    dataCypress = "titre"
}

const nouvelEtat = value => {
    cy.log("nouvel etat")
    cy.contains("Création en cours").click()
    cy.get('[data-cypress="9gag"]').type(value)
}

const typeDescription = value => {
    cy.log("ecrire description")
    cy.get('[data-cypress="description"]').type(value)
}

const validCreation = () => {
    cy.log("valider creation")
    typeTitre("la fureur du posti-it III")
    nouvelEtat("posti-it endoctriner")
    typeDescription(
        "c'est l'histoire d'un posti-it qui tombe amoureux d'une aluméte ... mais les choses vont tres vite se compliqué et notre posti-it devras s'en sortir face au démonique cisax"
    )
}

const tweeter = () => {
    cy.log("on tweet")
    cy.get('[data-cypress="inputtweet"]').click()
}

const creationSansEtats = () => {
    cy.log("creationSansEtats")
    typeTitre("la fureur du posti-it III")
    typeDescription(
        "c'est l'histoire d'un posti-it qui tombe amoureux d'une aluméte ... mais les choses vont tres vite se compliqué et notre posti-it devras s'en sortir face au démonique cisax"
    )
}

export const populateCreationForm = {
    validCreation,
    creationSansEtats,
    tweeter
}

export const validerCreationForm = () => {
    cy.log("validation")
    tweeter()
    cy.contains("Publier").click()
}

export const modifierCreation = () => {
    cy.log("ModifierCreation")
    //click sur le titre
    cy.get('[data-cypress="titre"]').clear()
    cy.get('[data-cypress="titre"]').type(
        "la fureur du posti-it IV - a new warior"
    )

    cy.get('[data-cypress="submit"]').click()

    cy.url().should("eq", "http://localhost:3000/")
}

export const verifierModification = () => {
    cy.log("Verifier que la création a bien été modifiée")
    cy.get('[data-cypress="la fureur du posti-it IV - a new warior"]')
}
