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

        // Add new blog entries.
        cy.contains('new blog').click();
        cy.get('#title').type('Test Blog');
        cy.get('#author').type('Test Author');
        cy.get('#url').type('https://www.testblog.com/1');
        cy.get('#create').click();

        cy.contains('new blog').click();
        cy.get('#title').type('Another Blog');
        cy.get('#author').type('Another Author ');
        cy.get('#url').type('https://www.anotherblog.com/1');
        cy.get('#create').click();

        cy.contains('View').click();
        // delete blog
        cy.contains('remove');
        cy.contains('remove').click();
    });
    
    it('user cannot delete blog if user did not create blog', function() {
        
        cy.get('#username').type('jc2000');
        cy.get('#password').type('password2');
        cy.get('#login-button').click();

        cy.contains('View').click();
        cy.get('.blog').eq(0).should('not.contain', 'remove');
    }) 
});

describe('Blogs sort order', function() {
    let user;
    beforeEach(function() {
        // empty db.
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        user = {
            name: 'Lisa Thomas',
            username: 'lt1234',
            password: 'password1'
        };
    });

    it('blogs sorted descending order by likes property', function() {

        cy.request('POST', 'http://localhost:3003/api/users', user);
        cy.visit('http://localhost:3000');

        cy.get('#username').type('lt1234');
        cy.get('#password').type('password1');
        cy.get('#login-button').click();

        // Create two new blog entries.
        cy.contains('new blog').click();
            cy.get('#title').type('Test Blog');
            cy.get('#author').type('Test Author');
            cy.get('#url').type('https://www.testblog.com/1');
            cy.get('#create').click();

        cy.contains('new blog').click();
            cy.get('#title').type('Another Blog');
            cy.get('#author').type('Another Author ');
            cy.get('#url').type('https://www.anotherblog.com/1');
            cy.get('#create').click();

        // Like first blog entry.
        cy.get('.blog-list')
        .contains('Test Blog')
        .get('.view-btn').click()
        .get('.like-btn').eq(0).click();

        // Like 2nd blog entry twice.
        cy.get('.blog-list')
        .contains('Another Blog')
        .get('.view-btn').click()
        .get('.like-btn').eq(1).click()
        .get('.like-btn').eq(1).click();

        // Request blogs array from backend.
        cy.request('GET', 'http://localhost:3003/api/blogs')
        .then(response => {
            // sort array by likes.
            const sortedArray = response.body.sort((a, b) => b.likes - a.likes)
            
            // Verify that 1st blog list item on page is the same as first blog item in sorted blog array.
            cy.get('.blog').eq(0)
            .should('contain', sortedArray[0].title);

            // Verify that 2nd blog list item on page is the same as second blog item in sorted blog array.
            cy.get('.blog').eq(1)
            .should('contain', sortedArray[1].title);
        })
    })
});