import {Route, Redirect} from 'react-router-dom';
import React from 'react';

const isAuth = () => {
    if(localStorage.getItem('token') !== null){
        return true;
    }
    return false;
}

const PrivateRoute = ( props) => {
    return(
        isAuth() ? (
            <Route exact path={props.path} component={props.component} />
        ):(
            <Redirect 
                to={{
                    pathname: '/login', 
                    state : { 
                        from: props.location, 
                        message: "Usuário não autorizado"
                    }
                }} 
            />
        )
    )
           
}

export default PrivateRoute