import React,{useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/Auth/AuthContext';
const AdminRoute = ({component: Component, ...rest}) => {
    const {userInfo}=useContext(AuthContext)
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
           userInfo&&userInfo.isAdmin ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default AdminRoute;