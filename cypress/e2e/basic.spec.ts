context('Basic', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays landing', () => {
    cy.url()
      .should('eq', 'http://localhost:3333/')

    cy.contains('Coworke dans des')
    cy.contains('Coworkez Maintenant')
    cy.get('header').contains('A Propos')
    cy.contains('Contact')
    cy.contains('Mentions légales')
    cy.contains('Confidentialité')
    cy.contains('Nos valeurs')
    cy.contains('Devenir partenaire')
    cy.contains('Instagram')
    cy.contains('Linkedin')
    cy.get('footer').contains('A Propos')

    // cy.get('#input')
    //   .type('Vitesse{Enter}')
    //   .url()
    //   .should('eq', 'http://localhost:3333/hi/Vitesse')

    // cy.contains('[Default Layout]')
    //   .should('exist')
  })

  it('navigate to map', () => {
    cy.get('header').contains('Coworkez Maintenant')
      .click()
    cy.wait(1000)
    cy.url().should('eq', 'http://localhost:3333/map')
  })

  it('send a message to the team', () => {
    const xano_suggestion_url = `${import.meta.env.VITE_XANO_API_URL}/api:5e9BgwVw/suggestion`

    cy.intercept('POST', xano_suggestion_url, (req) => {
    // Assert that the request body includes necessary information
      expect(req.body).to.include('from_email')
      expect(req.body).to.include('category')
      expect(req.body).to.include('body')

      // Respond with a 200 status code without actually sending the email
      req.reply({
        statusCode: 200,
      })
    })
    cy.get('input[placeholder=\"Email\"]')
      .type('bob@bob.bob')
    cy.get('form').contains('Sujet').click()
    cy.contains('Question').click()
    cy.get('textarea[placeholder=\"Ecrivez ici votre petit mot\"]').type('Hello Hello')
    cy.get('button').contains('Contactez-nous').click()
    cy.contains('Message envoyé')
  })
})
