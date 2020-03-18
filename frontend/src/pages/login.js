import React from 'react';
import './Login.css';

function Login() {
    return (
        <div className="center-position">
            <div className="tam-max">
                <h3 className="card-title">Login</h3>
                <hr></hr>
                <form>
                    <div className="form-group">
                        <input type="email" className="input-login" placeholder="E-mail" aria-describedby="emailHelp"/>
                        <small id="emailHelp" className="form-text text-muted">Digite seu email de login</small>
                    </div>
                    <div className="form-group">
                        <input type="password" className="input-login" placeholder="Senha"/>
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
