import React, { Fragment }from 'react';
import { Link } from 'react-router-dom';

const NotfoundPage = () => (
    <Fragment>
        <h2>404 page not found!</h2>
        <Link to="/">Return to homepage</Link>
    </Fragment>
);

export default NotfoundPage;