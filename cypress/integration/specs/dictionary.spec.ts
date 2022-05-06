import Dictionary from '../../page-objects/dictionary.page'

const dictionary = new Dictionary()

before(() => {
  dictionary.visit()
})

describe('when initializing the page', () => {
  it('should mount the aiware app bar', () => {
    cy.get('[data-test=appbar]').should('contain.text', 'Dictionary App')
  })

  it('should have navbar text', () => {
    dictionary.getNavbar().should('exist')
        .should('contain.text', "Let's find the meanings!")
  })


  it('should have background image', () => {
    dictionary.getBgImage().should('exist')
  })

  it('should have upload button', () => {
    dictionary.getUploadBtn().should('exist')
  })


})

