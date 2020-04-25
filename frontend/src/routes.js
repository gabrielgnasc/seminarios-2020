import React, {useState, useEffect} from 'react';
import PrivateRoute from './auth';
import IndexLogin from './pages/login/IndexLogin';
import NotFound from './pages/notFound/NotFound';
import IndexRegistrar from './pages/registrar/IndexRegistrar';
import Configuracoes from './pages/configuracoes';
import Home from './pages/home';
import Hospitalar from './pages/hospitalar';
import Animal from './pages/animal';
import CriancasPCD from './pages/criancasPCD';
import View from './pages/viewPage';

import {history} from './shared/history/history';
import {Router, Route, Switch, Redirect} from 'react-router';



function Routes(props){

    var contemToken ;
    localStorage.getItem('token') ? contemToken = true  : contemToken = false;

    const [logado, setLogado] = useState(contemToken);

    useEffect(()=>{

        let mounted = true;

        if(mounted === true){  
            window.onstorage = () => { 
                if (localStorage.getItem('token') !== null){
                    if(mounted === true){
                        setLogado(true)
                    }
                        
                }
            }
        }
        

        return () => { mounted = false };
    }, [logado])

   

    return(
    <Router history={history} >
        <Switch>
            <Route exact path="/login" render={(p) => <IndexLogin />}  />
            <Route exact path="/registrar" render={(p) => <IndexRegistrar  />}  />
            <Route exact path="/view/:id" component={View} ></Route>
            <Route exact path="/"><Redirect to={{pathname: '/home'}} /></Route>
            <PrivateRoute exact path="/home" component={Home} > </PrivateRoute>
            <PrivateRoute exact path="/configuracoes" component={Configuracoes} > </PrivateRoute>
            <PrivateRoute exact path="/home/hospitalar/:id" component={Hospitalar} > </PrivateRoute>
            <PrivateRoute exact path="/home/animais/:id" component={Animal} > </PrivateRoute>
            <PrivateRoute exact path="/home/criancas-e-especiais/:id" component={CriancasPCD} > </PrivateRoute>
            <PrivateRoute component={NotFound} />
        </Switch>
    </Router>
    )
}

export default Routes;

// render={(prop) => <IndexLogin {...props} />}