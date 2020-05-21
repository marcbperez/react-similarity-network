describe('Similarity Network', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('BASEURL'))
  })

  it('Shows a similarity graph from a Foursquare place', () => {
    const CLIENTID = Cypress.env('CLIENTID')
    const CLIENTSECRET = Cypress.env('CLIENTSECRET')
    const QUERY = Cypress.env('QUERY')
    const RESULT = Cypress.env('RESULT')

    cy.get('h1').should('exist')
    // Fills in the search form.
    cy.get('input[name=clientId]').type(CLIENTID)
    cy.get('input[name=clientSecret]').type(CLIENTSECRET)
    cy.get('input[name=query]').type(QUERY)

    // Submits the form and clicks on a result.
    cy.get('button').click()
    cy.contains(RESULT).click()

    // The display is cleared.
    cy.contains('h1').should('not.exist')
    // The graph appears and shows the result with its links.
    cy.get('svg g').should('have.length', 2)
    cy.get('svg g circle title').contains(RESULT)
    cy.get('svg g line').should('exist')

    // After pressing space, the app resets.
    cy.get('svg').type(' ')
    cy.get('h1').should('exist')
  })
})
