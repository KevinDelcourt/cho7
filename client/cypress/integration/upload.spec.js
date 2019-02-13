describe('Un utilisateur connecté sur la page d\'Upload', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.get(':nth-child(2) > .sc-htpNat').type('Admin')
        cy.get(':nth-child(4) > .sc-htpNat').type('Admin')
        cy.get('.sc-EHOje').click()
        cy.visit('/upload')
      })

    it('peut aller sur la page d\'accueil en cliquant sur la banniere', () => {
        cy.get('.sc-VigVT').click()
        cy.url().should('include', 'localhost:3000/')
    })

    it('peut aller sur la page d\'accueil en cliquant sur le nom du site en footer', () => {
        cy.get('.sc-fjdhpX a:first-child').click()
        cy.url().should('include', 'localhost:3000/')
    })

    it('peut aller sur la page à propos en cliquant sur "à propos" dans le footer', () => {
        cy.get('.sc-fjdhpX a:last-child').click()
        cy.url().should('include', 'localhost:3000/about')
    })
})


