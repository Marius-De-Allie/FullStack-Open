import React, { Fragment}  from 'react';
import { Link } from 'react-router-dom';

const User = ({ user }) => {

    return (
        <Fragment>
            <tr>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
            </tr>
        </Fragment>
    );
};

export default User;