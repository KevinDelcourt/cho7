describe('Un utilisateur non connecté', () => {
    beforeEach(() => {
        cy.visit('/login')
      })

    it('peut afficher la page de connexion', () => {
        cy.url().should('include', 'localhost:3000/login')
    })

    it('affiche le lien pour se connecter',()=>{
        cy.get('#root > :nth-child(1)').should('contain','Connexion')
    })

    it('n\'affiche pas les liens réservées aux utilisateurs connectés',()=>{
        cy.get('#root > :nth-child(1)').should('not.contain','Upload')
        cy.get('#root > :nth-child(1)').should('not.contain','Déconnexion')
    })

    it('ne peut pas aller sur la page Upload',()=>{
        cy.visit('/upload')
        cy.contains('Nouvelle Création').should('not.exist')
    })

    it('peut se connecter avec les bons identifiants', () => {
        cy.get(':nth-child(2) > .sc-htpNat').type('Admin')
        cy.get(':nth-child(4) > .sc-htpNat').type('Admin')
        cy.get('.sc-EHOje').click()
        cy.url().should('include', 'localhost:3000/')

    })

})

describe('Un utilisateur connecté',()=>{
    beforeEach(()=>{
        cy.visit('/login')
        cy.get(':nth-child(2) > .sc-htpNat').type('Admin')
        cy.get(':nth-child(4) > .sc-htpNat').type('Admin')
        cy.get('.sc-EHOje').click()
    })

    afterEach(()=>{
        cy.contains('Déconnexion').click()
    })

    it('affiche les liens réservés aux utilisateurs connectés',()=>{
        cy.get('#root > :nth-child(1)').should('contain','Déconnexion')
        cy.get('#root > :nth-child(1)').should('contain','Upload')
    })

    it('n\'affiche pas le lien pour se connecter',()=>{
        cy.get('#root > :nth-child(1)').should('not.contain','Connexion')
    })

    it('ne peut pas aller sur la page de connexion',()=>{
        cy.visit('/login')
        cy.get('#root > :nth-child(1)').should('contain','Accueil')
    })

    it('peut aller sur la page d\'upload',()=>{
        cy.visit('/upload')
        cy.contains('Nouvelle Création').should('exist')
    })
})
