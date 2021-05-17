describe('Book app', function () {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('serverUrl')}/api/testing/reset`)
  })

  describe('When there are some books in the database', function() {
    beforeEach(function() {
      cy.createBook({ title: 'Thinking Fast and Slow', author: 'Daniel Kahneman', description: 'Awesome book' })
      cy.createBook({ title: 'Homo Sapiens', author: 'Yuval Noah Harari', description: 'Great read' })
      cy.createBook({ title: 'Homo Deus', author: 'Yuval Noah Harari', description: 'Would read again' })
      cy.visit('/')
    })

    it('Books are fetched from the database to the list', function() {
      cy.getBySelLike('book-list-row')
        .should('contain', 'Thinking Fast and Slow')
        .should('have.length', 3)
    })

    it('User can add a new book', function() {
      cy.getBySel('book-form-title-field').type('New book')
      cy.getBySel('book-form-author-field').type('John Doe')
      cy.getBySel('book-form-description-field').type('New knowledge')
      cy.getBySel('book-form-add-button').click()

      cy.getBySelLike('book-list-row')
        .should('contain', 'New book')
        .should('contain', 'John Doe')
        .should('have.length', 4)
    })

    it('User can select a book, showing its information in the form', function() {

      cy.getBySelLike('book-list-row')
        .contains('Thinking Fast and Slow').click()

      cy.getBySel('book-form-title-field')
        .should('have.value', 'Thinking Fast and Slow')
      cy.getBySel('book-form-author-field')
        .should('have.value', 'Daniel Kahneman')
      cy.getBySel('book-form-description-field')
        .should('have.value', 'Awesome book')
    })

    it('User can edit book', function() {

      cy.getBySelLike('book-list-row')
        .contains('Thinking Fast and Slow').click()

      cy.getBySel('book-form-title-field').clear().type('Thinking slow')
      cy.getBySel('book-form-author-field').clear().type('New Author')
      cy.getBySel('book-form-description-field').clear().type('A new description')
      cy.getBySel('book-form-update-button').click()

      cy.getBySelLike('book-list-row')
        .should('contain', 'Thinking slow')
        .should('contain', 'New Author')
        .should('not.contain', 'Thinking Fast and Slow')
        .should('not.contain', 'Daniel Kahneman')
        .should('have.length', 3)
    })

    it('User can delete a book', function() {

      cy.getBySelLike('book-list-row')
        .contains('Thinking Fast and Slow').click()
      cy.getBySel('book-form-delete-button').click()
      cy.getBySelLike('book-list-row')
        .should('not.contain', 'Thinking Fast and Slow')
        .should('have.length', 2)

    })
  })
})