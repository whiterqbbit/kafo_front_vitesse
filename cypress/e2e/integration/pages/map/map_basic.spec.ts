import { sizes } from '../../../fixtures/sizes'

sizes.forEach((size) => {
  context(`Basic_${size}`, () => {
    beforeEach(() => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size as Cypress.ViewportPreset)
      }
      cy.visit('/map')
    })
    it('displays map page correctly', () => {
      cy.url()
        .should('eq', 'http://localhost:3333/map')

      cy.contains('Coworke dans des').should('be.visible')
    })
  })
})
