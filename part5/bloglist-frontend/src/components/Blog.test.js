import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

class Button extends React.Component {

    handleClick = () => {
        console.log('clicked');
    }

    render() {
        <div className="component">
            <button onClick={this.handleClick}>
            test
            </button>
        </div>
    }
};

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

    test('after clicking the view button, url and likes elements are displayed', () => {
        
        component = render(
                    <Blog
                        blog={blog}
                        user={user}
                    />
                )

        const button = component.container.querySelector('.view-btn');
        fireEvent.click(button)

        const details = component.container.querySelector('.details');

        expect(details).not.toHaveStyle('display: none')
    });

    test('clicking like button twice calls event handler twice', () => {

        const mockHandler = jest.fn();
        
        component = render(
                    <Blog
                        blog={blog}
                        user={user}
                        
                    >
                        <button onClick={mockHandler} className="view-btn">View</button>
                    </Blog>
                        
                        
                    
                        
                    
                )

                
        const button = component.getByText('View');
        fireEvent.click(button);
        fireEvent.click(button);

        component.debug()
        expect(mockHandler.mock.calls).toHaveLength(2);
    });

});