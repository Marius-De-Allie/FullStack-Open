import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog /> component', () => {

    let component;
    let blog;
    let user;

    beforeEach(() => {
        blog = {
            title: 'My Blog',
            author: 'John Doe',
            likes: 5,
            url: 'url',
            id: 'abc123',
            user: {
                username: 'name person',
                name: 'name',
                id: 'np123'

            }
        }

        user = {
            username: 'name',
            token: 'token'
        }

        
        
    })

    test('at the start the title and author are displayed', () => {

        component = render(
                    <Blog
                        blog={blog}
                        user={user}
                    />
                )
        const title = component.container.querySelector('.title');
        const author = component.container.querySelector('.author');

        expect(title).toBeDefined()
        expect(author).toBeDefined()

        expect(title).toHaveTextContent('My Blog')
        expect(author).toHaveTextContent('John Doe')
    });

    test('at the start the details (url and likes) children elements are not displayed', () => {

        component = render(
                    <Blog
                        blog={blog}
                        user={user}
                    />
                )
        const details = component.container.querySelector('.details');

        expect(details).toHaveStyle('display: none')


    });

});