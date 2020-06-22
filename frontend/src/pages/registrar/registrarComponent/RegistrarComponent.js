import React, { Component } from 'react';
import '../Registrar.css';
import api from '../../service';
import { Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import {MdKeyboardBackspace} from 'react-icons/md';
import {history} from '../../../shared/history/history';

class RegistrarComponent extends Component {

    _isMounted
    constructor(props){
        super(props);

        this.state = {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            error: '',
            show: false,
            logIn: false
        }
    }

    componentDidMount(){
        this.isLogged();
        this._isMounted = true;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    componentDidUpdate(){

        if(this._isMounted && this.state.logIn){
            if (this.state.password.length < 6){
                this.setState({
                    error: 'A senha deve conter no mínimo 6 caracteres!',
                    show: true,
                    logIn: false
                });
                return
            }

            if (this.state.password !== this.state.confirmPassword){
                this.setState({
                    error: 'As senhas não são iguais',
                    show: true,
                    logIn: false
                });
                return
            }
            this.createUser();
        }
    
    }

    async createUser(){
        try{
            const {email, password, name} = this.state;
            const response = await api.post('/createUser',{email, password, name });
            
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
            this.setState({
                error:'Usuário ou senha inválidos',
                show: true
            });
            
        }
    }

    isLogged(){
        if(localStorage.getItem('token')){
            return(
                <Redirect to={{ pathname: '/'}} />
            )
        }
    }

    AlertDismissibleExample() {
        if (this.state.show) {
            return (
                <Alert variant="danger" className="text-center" onClose={() => this.setState({show: false})} dismissible>
                    <p>{this.state.error}</p>
                </Alert>
            );
        }
    }
    render(){
        return (
            <div className="center-position">
                <div className="tam-max">
                    <h3 id="id-login" className="card-title">
                        <Link to="/login" className="close float-left" ><MdKeyboardBackspace></MdKeyboardBackspace></Link>
                        Registrar
                    </h3>
                    <hr></hr>
                    {this.AlertDismissibleExample()}
                    <form  >
                        <div className="form-group">
                            <input type="text"  onChange={ (e) => this.setState({name: e.target.value})} className="input-login" placeholder="Nome" required />
                            <small id="emailHelp" className="form-text text-muted">Digite seu nome e sobrenome </small>
                        </div>
                        <div className="form-group">
                            <input type="email"  onChange={ (e) => this.setState({email: e.target.value})} className="input-login" placeholder="E-mail" required/>
                            <small id="emailHelp" className="form-text text-muted">Digite seu email de login</small>
                        </div>
                        <div className="form-group">
                            <input type="password" minLength={6} onChange={ (e) => this.setState({password: e.target.value})} className="input-login" placeholder="Senha" required/>
                        </div>
                        <div className="form-group">
                            <input type="password" onChange={ (e) => this.setState({confirmPassword: e.target.value})} className="input-login" placeholder="Confirme a senha" required/>
                            <small id="emailHelp" className="form-text text-muted">Confirme sua senha </small>
                        </div>
                        <div class="terms">
                            <div class="form-check">
                                <input className="form-check-input" type="checkbox" id="invalidCheck2" required/>
                                <label className="form-check-label" htmlFor="invalidCheck2">
                                    Eu aceito os <Link to="/terms"  target="_blank">termos de utilização</Link>
                                </label>
                            </div>
                        </div>
                        <button type="submit" onClick={() => this.setState({logIn: true}) } className="btn btn-primary bg-roxo btn-ancora">Registrar</button>      
                    </form>
                </div>
            </div>
        );
    }
}

export default RegistrarComponent;
