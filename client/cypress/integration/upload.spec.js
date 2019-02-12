describe('Un utilisateur connecté', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.get(':nth-child(2) > .sc-htpNat').type('Admin')
        cy.get(':nth-child(4) > .sc-htpNat').type('Admin')
        cy.get('button').click()
        cy.visit('/upload')
      })

    it('peut aller sur la page d\'accueil en cliquant sur la banniere', () => {
        cy.get('.sc-VigVT').click()
        cy.url().should('include', 'localhost:3000/')
    })
})


