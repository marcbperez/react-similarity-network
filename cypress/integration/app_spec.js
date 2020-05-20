describe('Similarity Graph', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('BASEURL'))
  })

  it('Shows a similarity graph from a Foursquare place', () => {
    cy.get('h1').should('exist')
  })
})
