import React from 'react';
import { useSelector } from 'react-redux';
import BlogList from './BlogList';
import LoginForm from './LoginForm';

const Home = () => {
    const user = useSelector(state => state.user);

    return user === null ? <LoginForm /> : <BlogList />
}

export default Home;