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

        it('A blog can be created', function() {
            cy.contains('new blog').click();
            cy.get('#title').type('Test Blog');
            cy.get('#author').type('Test Author');
            cy.get('#url').type('https://www.testblog.com/1');
            cy.get('#create').click();

            cy.get('html').contains('Test Blog Test Author');
        });

        describe('Like blog', function() {
            beforeEach(function() {
                // Add blog.
                cy.contains('new blog').click();
                cy.get('#title').type('Test Blog');
                cy.get('#author').type('Test Author');
                cy.get('#url').type('https://www.testblog.com/1');
                cy.get('#create').click();
            });

            it('user can like a blog', function() {
                cy.contains('View').click().get('.like-btn').click();
    
                cy.contains('likes: 1');
                
            })
        });
    })
});

/*** THIS TEST NEEDS TO BE RUN USING npm run dev backend script, not npm start:test like other cypress tests.
    ALSO NEED TO ENSURE THAT THERE ARE ATLEAST 2 NOTES IN THE DEV (NOT TEST) DATABASE THAT WERE BOTH CREATED BY USER LISA THOMAS, username: lt457479
    password: password1 ***/

describe('Delete blog', function() {

    beforeEach(function() {
        cy.visit('http://localhost:3000');
    })

    it('user who created blog can delete blog', function() {

        
        cy.get('#username').type('lt457479');
        cy.get('#password').type('password1');
        cy.get('#login-button').click();

        cy.contains('View').click();
        // delete blog
        cy.contains('remove').click();
    });
    
    it.only('user cannot delete blog if user did not create blog', function() {
        
        cy.get('#username').type('jc2000');
        cy.get('#password').type('password2');
        cy.get('#login-button').click();
    
        cy.contains('View').click();
        
        cy.get('html').should('not.contain', 'remove')
    }) 
});