export default class Dictionary {

  visit() {
    cy.visit('/')
  }

  getNavbar() {
    return cy.get(`.navbar`)
  }

  getBgImage() {
    return cy.get(`.backgroundImage`)
  }

  getUploadBtn() {
    return cy.get(`[data-test-id="upload-btn"]`)
  }

  getTransBtn() {
    return cy.get(`[data-test="data-center-importer-local-upload-button"]`)
  }

}

