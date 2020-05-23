describe('Blog app', function() {
    beforeEach(function() {
        // empty db.
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const user = {
            name: 'Lisa Thomas',
            username: 'lt1234',
            password: 'password1'
        };
        cy.request('POST', 'http://localhost:3003/api/users', user);
        cy.visit('http://localhost:3000');
    });

    it('Login form is shown', function() {
        cy.contains('Login to application');
        cy.contains('Username');
        cy.contains('Password');
        cy.get('#username');
        cy.get('#password');
    });

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('lt1234');
            cy.get('#password').type('password1');
            cy.get('#login-button').click();

            cy.contains('Lisa Thomas logged in');
        });

        it('fails with wrong credentials', function() {
            cy.get('#username').type('lt1234');
            cy.get('#password').type('wrong');
            cy.get('#login-button').click();

            cy.contains('Incorrect username or password');
            cy.get('.error').should('have.css', 'color', 'rgb(255, 165, 0)')
        });

    });

    describe('When logged in', function() {
        beforeEach(function() {
            // Log in user.
            cy.get('#username').type('lt1234');
            cy.get('#password').type('password1');
            cy.get('#login-button').click();

        });

        it.only('A blog can be created', function() {
            cy.contains('new blog').click();
            cy.get('#title').type('Test Blog');
            cy.get('#author').type('Test Author');
            cy.get('#url').type('https://www.testblog.com/1');
            cy.get('#create').click();

            cy.get('html').contains('Test Blog Test Author');

        })



    })
});