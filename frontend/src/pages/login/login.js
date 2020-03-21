import React, {useState} from 'react';
import './Login.css';
import api from './../service';
import { Button, Alert } from 'react-bootstrap';

function Login() {

    const [email, setEmail] = useState(''); 
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [show, setShow] = useState(false);

    async function logar(e){
        e.preventDefault();
        try{
            const response = await api.post('/login',{email: email, password: senha });
            if(response.data.userLogin){
                alert('autenticado');
            }else if(response.data.error){
                setErro(response.data.error);
                setShow(true);
            }
        }catch(e) {
            console.log(e);
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
            <div className="tam-max">
                <h3 className="card-title">Login</h3>
                <hr></hr>
                {AlertDismissibleExample()}
                <form onSubmit={logar} >
                    <div className="form-group">
                        <input type="email" value={email} onChange={ e => setEmail(e.target.value)} className="input-login" placeholder="E-mail" aria-describedby="emailHelp"/>
                        <small id="emailHelp" className="form-text text-muted">Digite seu email de login</small>
                    </div>
                    <div className="form-group">
                        <input type="password" value={senha} onChange={ e => setSenha(e.target.value)} className="input-login" placeholder="Senha"/>
                    </div>
                    <button type="submit" className="btn btn-primary bg-roxo btn-ancora">Entrar</button>
                    <div className="row">
                        <a className="btn-ancora">Registrar uma conta</a>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default Login;
