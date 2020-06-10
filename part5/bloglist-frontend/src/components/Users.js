import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleInitUsers } from '../actions/users';
import User from './User';

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    useEffect(() => {
        dispatch(handleInitUsers())
    }, []);

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Blogs created</th>
                    </tr>
                    {users.map(user => <User key={user.id} user={user} />)}
                </tbody>
            </table>
        </div>
    )
};

export default Users;