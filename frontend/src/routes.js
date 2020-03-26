import React from 'react';
import PrivateRoute from './auth';
import IndexLogin from './pages/login/IndexLogin';
import NotFound from './pages/notFound/NotFound';
import IndexRegistrar from './pages/registrar/IndexRegistrar';
import Home from './pages/home';

import {history} from './shared/history/history'
import {Router, Route, Switch, Redirect} from 'react-router';



const Routes = () =>(
    <Router history={history} >
        <Switch>
            <Route exact path="/login" component={IndexLogin} ></Route>
            <Route exact path="/registrar" component={IndexRegistrar} ></Route>
            <Route exact path="/"><Redirect to={{pathname: '/home'}} /></Route>
            <PrivateRoute exact path="/home" component={Home} > </PrivateRoute>
            <PrivateRoute component={NotFound} />
        </Switch>
    </Router>
)

export default Routes;