const typeTitre = value => {
    cy.log("titre")
    cy.get(".sc-bxivhb")
        .first()
        .type(value)
}

const nouvelEtat = value => {
    cy.log("nouvel etat")
    cy.contains("Création en cours").click()
    cy.get(":nth-child(1) > :nth-child(1) > .sc-ifAKCX > .sc-bxivhb").type(
        value
    )
}

const typeDescription = value => {
    cy.log("ecrire description")
    cy.get(".sc-kkGfuU").type(value)
}

const validCreation = () => {
    cy.log("valider creation")
    typeTitre("la fureur du posti-it III")
    nouvelEtat("posti-it endoctriner")
    typeDescription(
        "c'est l'histoire d'un posti-it qui tombe amoureux d'une aluméte ... mais les choses vont tres vite se compliqué et notre posti-it devras s'en sortir face au démonique cisax"
    )
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
    creationSansEtats
}

export const validerCreationForm = () => {
    cy.log("validation")
    cy.contains("Publier").click()
}
