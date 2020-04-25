import React, {useState, useEffect} from 'react';
import './Login.css';
import api from '../service';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {history} from '../../shared/history/history';

function Login(props) {
    
    const [email, setEmail] = useState(''); 
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [show, setShow] = useState(false);
    const [logar, setLogar] = useState(false);

    console.log(logar)
    useEffect(()=>{
        let mounted = true;

        if(mounted && logar){
            const a = async() => {
                try{
            
                    const response = await (await api.post('/login',{email: email, password: senha }))
                    if(response.status === 200){
                        if(response.data.token && mounted)
                        {
                            localStorage.setItem('token',response.data.token);
                            setLogar(false)
                            history.push('/')
                        }   
                    }else{
                        if(response.data.token && mounted){
                            setLogar(false)
                        }
                            
                    }
                        
                }catch (error){
                    if(localStorage.getItem('token'))
                        localStorage.removeItem('token')
                    if( mounted ){
                        console.log(error)
                        setErro('Usuário ou senha inválidos');
                        setShow(true)
                        setLogar(false)
                    }  
                }
            }
            a();
        }
    
        return () => mounted = false;

    }, [logar, email, props , senha])


    

    // function isLogged(){
    //     if(localStorage.getItem('token')){
    //         return(
    //             <Redirect to={{ pathname: '/'}} />
    //         )
    //     }{isLogged()}
    // }

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
                <h3 >Login</h3>
                <hr></hr>
                {AlertDismissibleExample()}
                <form >
                    <div className="form-group">
                        <input type="email" value={email} onChange={ e => setEmail(e.target.value)} className="input-login" placeholder="E-mail" aria-describedby="emailHelp" required/>
                        <small id="emailHelp" className="form-text text-muted">Digite seu email de login</small>
                    </div>
                    <div className="form-group">
                        <input type="password" value={senha} onChange={ e => setSenha(e.target.value)} className="input-login" placeholder="Senha" required />
                    </div>
                    <button type="button" onClick={() => setLogar(true) } className="btn btn-primary bg-roxo btn-ancora">Entrar</button>
                    <div className="row">
                        <Link to="/registrar" className="btn-ancora"  >Registrar uma conta</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
