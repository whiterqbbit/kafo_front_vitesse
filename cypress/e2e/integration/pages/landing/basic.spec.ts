const sizes = ['iphone-6', 'ipad-2', [1024, 768]]

sizes.forEach((size) => {
  context(`Basic_${size}`, () => {
    beforeEach(() => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size as Cypress.ViewportPreset)
      }
      cy.visit('/')
    })

    it('displays landing', () => {
      cy.url()
        .should('eq', 'http://localhost:3333/')

      cy.contains('Coworke dans des').should('be.visible')
      cy.contains('Coworkez Maintenant').should('be.visible')
      cy.get('header').contains('A Propos').should('be.visible')
      cy.contains('Contact').should('be.visible')
      cy.contains('Mentions légales').should('be.visible')
      cy.contains('Confidentialité').should('be.visible')
      cy.contains('Nos valeurs').should('be.visible')
      cy.contains('Devenir partenaire').should('be.visible')
      cy.contains('Instagram').should('be.visible')
      cy.contains('Linkedin').should('be.visible')
      cy.get('footer').contains('A Propos').should('be.visible')
    })

    it('navigate to map', () => {
      cy.get('header').contains('Coworkez Maintenant').should('be.visible')
        .click()
      cy.wait(1000)
      cy.url().should('eq', 'http://localhost:3333/map')
    })

    it('send a message to the team', () => {
      const xano_suggestion_url = `${Cypress.env('VITE_XANO_API_URL')}/api:5e9BgwVw/suggestion`

      cy.intercept('POST', xano_suggestion_url, (req) => {
        // Assert that the request body includes necessary information
        expect(req.body.from_email).to.be.a('string').and.not.be.empty
        expect(req.body.category).to.be.a('string').and.not.be.empty
        expect(req.body.body).to.be.a('string').and.not.be.empty

        // Respond with a 200 status code without actually sending the email
        req.reply({
          statusCode: 200,
        })
      })
      cy.get('input[placeholder=\"Email\"]').should('be.visible')
        .type('bob@bob.bob')
      cy.get('form').contains('Sujet').should('be.visible')
        .click()
      cy.contains('Question').should('be.visible')
        .click()
      cy.get('textarea[placeholder=\"Ecrivez ici votre petit mot\"]').should('be.visible')
        .type('Hello Hello')
      cy.get('button').contains('Contactez-nous').should('be.visible')
        .click()
      // cy.contains('Message envoyé')
    })
  })
})
