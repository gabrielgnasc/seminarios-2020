import {Route, Redirect} from 'react-router-dom';
import React from 'react';

const isAuth = () => {
    if(localStorage.getItem('token') !== null){
        return true;
    }
    return false;
}

const PrivateRoute = ({component: Component, ...rest}) => {
    return(
        isAuth() ? (
            
            <Route exact path={rest.path} component={rest.component} render={(props) => <Component {...rest} />} />
        ):(
            <Redirect 
                to={{
                    pathname: '/login', 
                    state : { 
                        from: rest.location, 
                        message: "Usuário não autorizado"
                    }
                }} 
            />
        )
    )         
}

export default PrivateRoute