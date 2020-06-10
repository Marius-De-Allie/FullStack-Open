import React, { Fragment}  from 'react';

const User = ({ user }) => {

    return (
        <Fragment>
            <tr>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
            </tr>
        </Fragment>
    );
};

export default User;