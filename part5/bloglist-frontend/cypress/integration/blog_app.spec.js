describe('Blog app', function() {
    beforeEach(function() {
        // empty db.
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.visit('http://localhost:3000')
    });

    it('Login form is shown', function() {
        cy.contains('Login to application');
        cy.contains('Username');
        cy.contains('Password');
        cy.get('#username')
        cy.get('#password')
    })
});