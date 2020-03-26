import React, {useState} from 'react';
import './Login.css';
import api from '../service';
import { Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import {history} from '../../shared/history/history'

function Login() {

    
    const [email, setEmail] = useState(''); 
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [show, setShow] = useState(false);
    async function logar(e){
        e.preventDefault();

        try{
            const response = await (await api.post('/login',{email: email, password: senha }))
            if(response.status === 200){
                if(response.data.token)
                {
                    localStorage.setItem('token',response.data.token);
                    history.push('/');
                    return;
                }   
            }
                
                
        }catch (error){
            if(localStorage.getItem('token'))
                localStorage.removeItem('token')
            setErro('Usuário ou senha inválidos');
            setShow(true);
        }
    }

    function isLogged(){
        if(localStorage.getItem('token')){
            return(
                <Redirect to={{ pathname: '/login'}} />
            )
        }
    }

    function AlertDismissibleExample() {
        if (show) {
          return (
            <Alert variant="danger" className="text-center" onClose={() => setShow(false)} dismissible>
              <p>{erro}</p>
            </Alert>
          );
        }
    }

    return (
        <div className="center-position">
            {isLogged()}
            <div className="tam-max">
                <h3 >Login</h3>
                <hr></hr>
                {AlertDismissibleExample()}
                <form onSubmit={logar} >
                    <div className="form-group">
                        <input type="email" value={email} onChange={ e => setEmail(e.target.value)} className="input-login" placeholder="E-mail" aria-describedby="emailHelp" required/>
                        <small id="emailHelp" className="form-text text-muted">Digite seu email de login</small>
                    </div>
                    <div className="form-group">
                        <input type="password" value={senha} onChange={ e => setSenha(e.target.value)} className="input-login" placeholder="Senha" required />
                    </div>
                    <button type="submit" className="btn btn-primary bg-roxo btn-ancora">Entrar</button>
                    <div className="row">
                        <Link to="/registrar" className="btn-ancora"  >Registrar uma conta</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
