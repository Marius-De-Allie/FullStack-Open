import React, { useImperativeHandle } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../actions/user';
import { setNotificationMessage } from '../actions/notifMessage';
import { setVisibility } from '../actions/addBlogVisible';
import '../App.css';

const Nav = () => {
      const dispatch = useDispatch();
      const user = useSelector(state => state.user);

      const handleLogout = () => {
            window.localStorage.removeItem('loggedBlogappUser');
            dispatch(loginUser(null));
            // setUser(null);
            dispatch(setNotificationMessage('Successfully logged out'));
            // setNotifMessage('Successfully logged out');
            setTimeout(() => {
              dispatch(setNotificationMessage(null))
              // setNotifMessage(null)
            }, 5000)
            dispatch(setVisibility(false));
            // setaddBlogVisible(false);
          };

      return (
            <div>
                  <NavLink to="/" exact activeClassName="active">Blogs</NavLink>
                  <NavLink to="/users" exact activeClassName="active">Users</NavLink>
                  {user && <h3 style={{display: 'inline'}}>{`  ${user.name} logged in`}<button onClick={handleLogout}>logout</button></h3>}
            </div>
      )
    
};

export default Nav;


      
