import React,{useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/Auth/AuthContext';
const PrivateRoute = ({component: Component, ...rest}) => {
    const {userInfo}=useContext(AuthContext)
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
           userInfo ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;