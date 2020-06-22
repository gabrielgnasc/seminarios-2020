import React, {useState, useEffect, Component} from 'react';
import '../Login.css';
import api from '../../service';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {history} from '../../../shared/history/history';

class Login extends Component{
    _mounted
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            erro: '',
            show: false,
            logIn:false
        }
        
    }

    componentDidMount(){
        this._mounted = true;
    }

    componentWillUnmount(){
        this._mounted = false;
    }
    componentDidUpdate(){

        if(this._mounted && this.state.logIn){
            const a = async() => {
                try{
            
                    const response = await (await api.post('/login',{email: this.state.email, password: this.state.password }))
                    if(response.status === 200){
                        if(response.data.token && this._mounted)
                        {
                            localStorage.setItem('token',response.data.token);
                            this.setState({logIn: false});
                            history.push('/')
                        }   
                    }else{
                        if(response.data.token && this._mounted){
                            this.setState({logIn: false});
                        }        
                    }
                        
                }catch (error){
                    if(localStorage.getItem('token'))
                        localStorage.removeItem('token')
                    if( this._mounted ){
                        console.log(error)
                        this.setState({show: true, logIn: false, erro: 'Usuário ou senha inválidos'})
                    }  
                }
            }
            a();
        }
    
    }



    AlertDismissibleExample() {
        if (this.state.show) {
            return (
                <Alert variant="danger" className="text-center" onClose={() => this.setState({show: false})} dismissible>
                <p>{this.state.erro}</p>
                </Alert>
            );
        }
    }

    render(){
        return (
            <div className="center-position">
            
                <div className="tam-max">
                    <h3 >Login</h3>
                    <hr></hr>
                    {this.AlertDismissibleExample()}
                    <form >
                        <div className="form-group">
                            <input type="email" onChange={ e => this.setState({email: e.target.value})} className="input-login" placeholder="E-mail" aria-describedby="emailHelp" required/>
                            <small id="emailHelp" className="form-text text-muted">Digite seu email de login</small>
                        </div>
                        <div className="form-group">
                            <input type="password" onChange={ e => this.setState({password:e.target.value})} className="input-login" placeholder="Senha" required />
                        </div>
                        <button type="button" onClick={() => this.setState({logIn: true}) } className="btn btn-primary bg-roxo btn-ancora">Entrar</button>
                        <div className="row">
                            <Link to="/registrar" className="btn-ancora"  >Registrar uma conta</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
