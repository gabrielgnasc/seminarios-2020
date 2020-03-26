import React, {useState} from 'react';
import './Registrar.css';
import api from '../service';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {MdKeyboardBackspace} from 'react-icons/md';

function Registrar() {

    const [email, setEmail] = useState(''); 
    const [nome, setNome] = useState(''); 
    const [senha, setSenha] = useState('');
    const [senhaConfirm, setsenhaConfirm] = useState('');

    const [erro, setErro] = useState('');
    const [show, setShow] = useState(false);

    async function registrar(e){
        e.preventDefault();

        if(senha !== senhaConfirm){
            alert('As senhas não são iguais')
            return null;
        }


        try{
            const response = await (await api.post('/createUser',{email, password: senha, name: nome }))
            console.log(response);
            if(response.data.userLogin){
                
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
                <h3 id="id-login" className="card-title">
                    <Link to="/login" className="close float-left" ><MdKeyboardBackspace></MdKeyboardBackspace></Link>
                    Registrar
                </h3>
                <hr></hr>
                {AlertDismissibleExample()}
                <form onSubmit={registrar} >
                <div className="form-group">
                        <input type="text" value={nome} onChange={ e => setNome(e.target.value)} className="input-login" placeholder="Nome" required />
                        <small id="emailHelp" className="form-text text-muted">Digite seu nome e sobrenome </small>
                    </div>
                    <div className="form-group">
                        <input type="email" value={email} onChange={ e => setEmail(e.target.value)} className="input-login" placeholder="E-mail" required/>
                        <small id="emailHelp" className="form-text text-muted">Digite seu email de login</small>
                    </div>
                    <div className="form-group">
                        <input type="password" value={senha} onChange={ e => setSenha(e.target.value)} className="input-login" placeholder="Senha" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" value={senhaConfirm} onChange={ e => setsenhaConfirm(e.target.value)} className="input-login" placeholder="Confirme a senha" required/>
                        <small id="emailHelp" className="form-text text-muted">Confirme sua senha </small>
                    </div>
                    <button type="submit" className="btn btn-primary bg-roxo btn-ancora">Entrar</button>            
                </form>
            </div>
        </div>
    );
}

export default Registrar;
