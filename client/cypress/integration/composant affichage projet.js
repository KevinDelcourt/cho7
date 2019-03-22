import reset_db from "../utils/reset_db"
before(() => reset_db())

describe('composant affichage projet', () => {

    it('je teste le composant affichage projet', () => {
        cy.visit('http://localhost:3000/')
        cy.get(':nth-child(2) > a > .sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/login')


    cy.log('cilck et ajout de l\'username')

        //si lui ne passe pas , essayer de changer le get (aller dans cypress puis cliquer 
        //sur le champ de texte et copier le lien du get généré)

        cy.get(':nth-child(2) > .sc-htpNat').type('Admin')


    cy.log('cilck et ajout du mdp')
        cy.get(':nth-child(4) > .sc-htpNat').type('Admin')


    cy.log('cilck pour la connexion')
        cy.get('.sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/')


    cy.log('cilck sur la creation')
    cy.get('[href="/creations"] > .sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/creations')


    cy.log('page de modification')
    cy.get('table > :nth-child(2) > :nth-child(2) > a').click()
    cy.url().should('eq', 'http://localhost:3000/updateCreation/2')

    })
    
})