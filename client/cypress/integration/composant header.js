import reset_db from "../utils/reset_db"
before(() => reset_db())



describe('composant creation de projet', () => {

    it('je teste le creation de projet normal', () => {
        cy.visit('http://localhost:3000/')
        cy.get(':nth-child(2) > a > .sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/login')


        cy.log('cilck et ajout de l\'username')

        cy.get(':nth-child(2) > .sc-htpNat').type('Admin')


        cy.log('cilck et ajout du mdp')
        cy.get(':nth-child(4) > .sc-htpNat').type('Admin')


        cy.log('cilck pour la connexion')
        cy.get('.sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/')


        cy.log('cilck sur la profil')
        cy.get('[href="/RenseignerProfilPage"] > .sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/RenseignerProfilPage')


        cy.log('cilck sur l\'image')
        cy.get('.sc-gqjmRU').click()
        cy.url().should('eq', 'http://localhost:3000/')


        cy.log('cilck sur la creation')
        cy.get('[href="/creations"] > .sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/creations')


        cy.log('cilck sur l\'accueil')
        cy.get(':nth-child(1) > [href="/"] > .sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/')


        cy.log('cilck sur la deconnexion')
        cy.get(':nth-child(2) > [href="/"] > .sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/')
    })



    
})
    //cy.get('.sc-gqjmRU')
