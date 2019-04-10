const typeTitre = value => {
    cy.get(".sc-bxivhb")
        .first()
        .type(value)
}

const nouvelEtat = value => {
    cy.contains("Création en cours").click()
    cy.get(":nth-child(1) > :nth-child(1) > .sc-ifAKCX > .sc-bxivhb").type(
        value
    )
}

const typeDescription = value => {
    cy.get(".sc-jWBwVP").type(value)
}

const validCreation = () => {
    typeTitre("la fureur du posti-it III")
    nouvelEtat("posti-it endoctriner")
    typeDescription(
        "c'est l'histoire d'un posti-it qui tombe amoureux d'une aluméte ... mais les choses vont tres vite se compliqué et notre posti-it devras s'en sortir face au démonique cisax"
    )
}

const creationSansEtats = () => {
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
