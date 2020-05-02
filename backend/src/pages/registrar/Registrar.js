import React, {useState, useEffect} from 'react';
import './Registrar.css';
import api from '../service';
import { Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import {MdKeyboardBackspace} from 'react-icons/md';
import {history} from '../../shared/history/history';

function Registrar(props) {

    const [email, setEmail] = useState(''); 
    const [nome, setNome] = useState(''); 
    const [senha, setSenha] = useState('');
    const [senhaConfirm, setsenhaConfirm] = useState('');

    const [erro, setErro] = useState('');
    const [show, setShow] = useState(false);
    
    const [logar, setLogar] = useState(false);

    isLogged();

    useEffect(()=>{
        let mounted = true;

        if(mounted && logar){
            const a = async() => {
                try{
            
                    const response = await api.post('/createUser',{email, password: senha, name: nome })
                    
                    if(response.status === 200){
                        if(response.data.token)
                        {
                            localStorage.setItem('token',response.data.token);
                            history.push('/')
                            
                        }   
                    }
                        
                }catch (error){
                    if(localStorage.getItem('token'))
                        localStorage.removeItem('token')
                    setErro('Usuário ou senha inválidos');
                    setShow(true);
                    
                }
            }
            a();
        }
    
        return () => mounted = false;

    }, [logar, email, props , senha, nome])

    function isLogged(){
        if(localStorage.getItem('token')){
            return(
                <Redirect to={{ pathname: '/'}} />
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
            <div className="tam-max">
                <h3 id="id-login" className="card-title">
                    <Link to="/login" className="close float-left" ><MdKeyboardBackspace></MdKeyboardBackspace></Link>
                    Registrar
                </h3>
                <hr></hr>
                {AlertDismissibleExample()}
                <form  >
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
                    <button type="button" onClick={() => setLogar(true) } className="btn btn-primary bg-roxo btn-ancora">Registrar</button>      
                </form>
            </div>
        </div>
    );
}

export default Registrar;
