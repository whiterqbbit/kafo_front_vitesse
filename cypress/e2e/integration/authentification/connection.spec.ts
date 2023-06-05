context('connection', () => {
  beforeEach(() => {
    cy.visit('/map')
    cy.contains('Se connecter').should('be.visible')
      .click()
    if (cy.contains('Kafo fait peau neuve').should('be.visible')) {
      cy.contains('Continuer').should('be.visible')
        .click()
    }
  })

  it('displays connection\'s credentials', () => {
    cy.get('input[placeholder=\"Email\"]').should('be.visible')
    cy.get('input[placeholder=\"Mot de passe\"]').should('be.visible')
    cy.get('button').contains('Se connecter par mail').should('be.visible')
    cy.get('button').contains('Se connecter avec Linked').should('be.visible')
    cy.get('a').contains('Mot de passe oublié').should('be.visible')
    cy.contains('Vous n\'avez pas de compte ?').should('be.visible')
    cy.get('a').contains('Créez un compte').should('be.visible')
  })

  it('displays error message when email is not valid', () => {
    cy.get('input[placeholder=\"Email\"]').should('be.visible')
      .type('bob')
      .then(($input) => {
        const inputElement = $input[0] as HTMLInputElement
        expect(inputElement.validationMessage).to.eq('Please include an \'@\' in the email address. \'bob\' is missing an \'@\'.')
      })
  })

  it('displays error message when password is not valid', () => {
    cy.get('input[placeholder=\"Mot de passe\"]').should('be.visible')
      .type('bob')
    cy.contains('Se connecter par mail').should('be.visible')
      .click()
    cy.contains('Veuillez remplir tous les champs').should('be.visible')
  })

  it('displays error message when email and password doesn\'t match', () => {
    cy.get('input[placeholder=\"Email\"]').should('be.visible')
      .type(`${Cypress.env('CYPRESS_USER_EMAIL')}`)
    cy.get('input[placeholder=\"Mot de passe\"]').should('be.visible')
      .type('pipopipopipo')
    cy.contains('Se connecter par mail').should('be.visible')
      .click()
    cy.contains('Identifiants incorrects.').should('be.visible')
  })

  it('connects with valid credentials', () => {
    cy.get('input[placeholder=\"Email\"]').should('be.visible')
      .type(`${Cypress.env('CYPRESS_USER_EMAIL')}`)
    cy.get('input[placeholder=\"Mot de passe\"]').should('be.visible')
      .type(`${Cypress.env('CYPRESS_USER_PASSWORD')}`)
    cy.contains('Se connecter par mail').should('be.visible')
      .click()
    cy.contains('Vous êtes connecté en tant que').should('be.visible')
  })
})
