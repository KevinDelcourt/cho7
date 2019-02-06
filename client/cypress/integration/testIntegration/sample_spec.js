describe('test qui passe', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(true)
  })
})

describe('test qui ne passe pas', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(true)
  })
})

describe('troisiemme test de je sais pas ce quil vas faire', function() {
  it('Visits the Kitchen Sink', function() {
    cy.visit('https://example.cypress.io')
  })
})

describe('test de je recup un truck', function() {
  it('finds the content "type"', function() {
    cy.visit('https://example.cypress.io')
 
    cy.contains('type')
  })
})

describe('test de on vas sur une page et on check si on est bien sur la bonne', function() {
  it('clicking "type" navigates to a new url', function() {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/commands/actions')
  })
})

describe('teste de je vais sur une autre page , je rentre le mail et verifie que cest bien ca', function() {
  it('Gets, types and asserts', function() {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it and verify that the value has been updated
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })
})

describe('test de la pause yay', function() {
  it('clicking "type" shows the right headings', function() {
    cy.visit('https://example.cypress.io')

    //cy.pause()

    cy.contains('type').click()

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it and verify that the value has been updated
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })
})


describe('test de la merde que les devs ont fait', function() {
  it('finds the content "type"', function() {
    cy.visit('http://localhost:3000/')
  })
})






























