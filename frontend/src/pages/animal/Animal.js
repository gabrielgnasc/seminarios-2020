import './Animal.css';
import React, {Component} from 'react';
import api from '../service';
import {history} from '../../shared/history/history';
import {TextField} from '@material-ui/core';
import uuid from './../../shared/gerarId';
import Info from '../../components/InfoCriarQr/Info';
import { connect } from 'react-redux';
import {toggleStateUser} from '../../store/actions';
import serviceGetUser from '../serviceGetUser';
import serviceUpdateUser from '../serviceUpdateUser';

class Animal extends Component{

    constructor(props){
        super(props) 
        this.state = {
            nomeDoDono: '',
            telefone: '',
            endereco: '',
            email: '',
            nome: '',
            cidade: '',
            idade: '',
            raca: '',
            genero: '',
            peso: '',
            vacinas: '',
            caracteristica: '',
            alimentacao: '',
            typeId: '',
            type: 'animais'
        };


        const {computedMatch} = this.props;
        if(computedMatch !== undefined){
            this.id = computedMatch.params.id;
        }
        this.user = null;
        this.getUser();
        props.dispatch(toggleStateUser(null,true));
    }

    getUser(){
        serviceGetUser(this.id, this.setState)
            .then(res => {
                this.user = res.user;
                this.setState(state => {return res.typesUser })
            }); 
    }

    async updateUser(e){
        serviceUpdateUser(e, this.user, this.id, this.state);
    }

    
    render(){
        return(
            <div className="container" style={{ marginTop: 45}}>  
                <div className="home-bg m-bt left-to-right" >
                    <Info name="Animais"/>
                    <form className="form-animal row" onSubmit={(e) => this.updateUser(e)} >
                        <div className="form-group col-md-7">

                            <TextField type="text" className="inputForm" value={this.state?.nomeDoDono} label="Seu nome" variant="outlined" 
                            onChange={ (e) => this.setState({nomeDoDono: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Seu nome completo</small>
                        
                        </div>
                        
                        <div className="form-group col-md-5">
                            
                            <TextField type="number" inputProps={{minLength: 8 }} className="inputForm" value={this.state?.telefone} label="Telefone"  variant="outlined" 
                            onChange={ (e) => this.setState({telefone: e.target.value})} required/>

                        </div>
                       
                        <div className="form-group col-md-7">
                          
                            <TextField type="text" className="inputForm" value={this.state?.endereco} label="Endereço"  variant="outlined" 
                            onChange={ (e) => this.setState({endereco: e.target.value})}/>
                            <small id="emailHelp" className="form-text text-muted">Rua, Nº e Bairro </small>
                        
                        </div>
                       
                        <div className="form-group col-md-5">
                           
                            <TextField type="text" className="inputForm" value={this.state?.cidade} label="Cidade"  variant="outlined" 
                            onChange={ (e) => this.setState({cidade: e.target.value})} />
                       
                        </div>
                        
                        <div className="form-group col-md-6">
                            
                            <TextField type="email" className="inputForm" value={this.state?.email} label="E-mail"  variant="outlined" 
                            onChange={ (e) => this.setState({email: e.target.value})} required/>
                        
                        </div>
                       
                        <div className="form-group col-md-6">
                            
                            <TextField type="text" className="inputForm" value={this.state?.nome} label="Agora o nome do seu animalzinho"  variant="outlined"
                             onChange={ (e) => this.setState({nome: e.target.value})} required/>
                        
                        </div>

                        <div className="form-group col-md-4">
                           
                            <TextField type="number" className="inputForm" value={this.state?.idade} label="Idade" variant="outlined" 
                            inputProps={{min: 0 }} onChange={ (e) => this.setState({idade: e.target.value})} />
                           
                            <small id="emailHelp" className="form-text text-muted">A idade dele também, se achar importante!</small>
                        
                        </div>
                        
                        <div className="form-group col-md-4">
                           
                            <TextField type="text" className="inputForm" value={this.state?.raca} label="Raça"  variant="outlined" 
                            inputProps={{min: 0 }} onChange={ (e) => this.setState({raca: e.target.value})} />
                            
                            <small id="emailHelp" className="form-text text-muted">Raça não importa, ele é lindo</small>
                        
                        </div>
                        
                        <div className="form-group col-md-4">
                        
                            <TextField type="text" className="inputForm" value={this.state?.peso} label="Peso"  variant="outlined" 
                            inputProps={{min: 0 }} onChange={ (e) => this.setState({peso: e.target.value})} />
                        
                            <small id="emailHelp" className="form-text text-muted">Sera que você sabe?</small>
                       
                        </div>
                       
                        <div className="form-group col-md-3">
                       
                            <TextField type="text" className="inputForm" value={this.state?.genero} label="Gênero"  variant="outlined" 
                            onChange={ (e) => this.setState({genero: e.target.value})} />
                       
                        </div>
                       
                        <div className="form-group col-md-4">
                       
                            <TextField type="text" className="inputForm" value={this.state?.caracteristica} label="Características"
                            variant="outlined" onChange={ (e) => this.setState({caracteristica: e.target.value})} required/>
                       
                            <small id="emailHelp" className="form-text text-muted">Bravo, amável ou carente?</small>
                       
                        </div>
                       
                        <div className="form-group col-md-5">
                       
                            <TextField type="text" className="inputForm" value={this.state?.alimentacao} label="Alimentação" 
                            variant="outlined" onChange={ (e) => this.setState({alimentacao: e.target.value})} />
                       
                            <small id="emailHelp" className="form-text text-muted">Aposto que come até pedra</small>
                       
                        </div>
                       
                        <div className="form-group col-md-12">
                       
                            <TextField multiline type="text" rows="2" className="inputForm" value={this.state?.vacinas} label="Vacinas"  variant="outlined" 
                            onChange={ (e) => this.setState({vacinas: e.target.value})} />
                       
                            <small id="emailHelp" className="form-text text-muted">Coloque todas as que lembrar :)</small>
                       
                        </div>

                       <div className="col-12 justify-items-end">
                       
                            <button type="submit" className="btn btn-primary bg-roxo btn-salvar offset-md-10">Salvar</button>
                       
                       </div>
                    </form> 
                </div>
                
            </div>
        );
    }
}

export default connect()(Animal);