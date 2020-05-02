import './CriancasPCD.css';
import React from 'react';
import api from '../service'
import {history} from '../../shared/history/history';
import {TextField} from '@material-ui/core';
import uuid from './../../shared/gerarId';
import Info from '../../components/InfoCriarQr/Info';

class CriancasPCD extends React.Component{

    constructor(props){
        super(props) 
        this.state = {
            nome: '',
            idade: '',
            nomeDoResponsavel: '',
            endereco: '',
            telefone: '',
            email: '',
            caracteristicas: '',
            alergias: '',
            remedios: '',
            peso: '',
            altura: '',
            adicionais: '',
            cidade:'',
            genero:'',
            typeId:'',
            type: 'crianças e especiais'
        };
        this.user = null;
        this.getUser();

        const {computedMatch} = this.props;
        if(computedMatch !== undefined){
            this.id = computedMatch.params.id;
        }
    }

    getUser(){
        const token = localStorage.getItem('token');
        const headers = {'Authorization': 'Bearer ' + token}
        api.get('/token/' + token ,  { headers }).then((res) =>{
            this.user =res.data;
            if(this.id){
                this.user.type.map((types) =>{
                    if(types.typeId === this.id){
                        this.setState(state =>{
                            return types;               
                        });
                    }
                    return null;
                });
            }
            if(res.data.error){
                history.push('/login');
            }

        })
    }

    async updateUser(e){
        e.preventDefault()
        
        let user = this.user;
       
        var index ;

        var ids = [];
        user.type.map((t) => {
            ids.push(t.typeId);
        })
        
        if(ids.includes(this.id)){
            user.type.map((types) => {
                if(types.typeId === this.id){
                    index = user.type.indexOf(types);
                }
                return null;
            });

            user.type[index] = this.state;

        }else{
            await this.setState({typeId: btoa(this.user.email) + uuid()});
            user.type.push(this.state)
        }

        const token = localStorage.getItem('token');
        const headers = {'Authorization': 'Bearer ' + token}
        api.post('/updateUser',{user: user} ,{ headers }).then((res) =>{
            history.push('/');
        },(error) => {
            alert(error)
        })
    }



    render(){
        return(
            <div className="container" style={{ marginTop: 45}}>  
                <div className="home-bg m-bt left-to-right" >
                    {Info('Crianças e Especiais')}
                    <form className="form-animal row" onSubmit={(e) => this.updateUser(e)}  >
                        <div className="form-group col-md-8">

                            <TextField id="outlined-basic" label="Nome" className="inputForm" value={this.state?.nome} variant="outlined" 
                            onChange={ (e) => this.setState({nome: e.target.value})} required />

                            <small id="emailHelp" className="form-text text-muted">Nome completo de quem deseja proteger.</small>

                        </div>


                        <div className="form-group col-md-4">

                            <TextField type="text" className="inputForm" value={this.state?.genero} variant="outlined" label="Gênero"
                              onChange={ (e) => this.setState({genero: e.target.value})} required />

                            <small id="emailHelp" className="form-text text-muted">Masculino, Feminino, LGBTQ+</small>

                        </div>

                        <div className="form-group col-md-4">

                            <TextField type="number" className="inputForm" value={this.state?.idade} variant="outlined" label="Idade" 
                            inputProps={{min: 0 }} onChange={ (e) => this.setState({idade: e.target.value})} required/>

                        </div>

                        <div className="form-group col-md-4">

                            <TextField type="number" className="inputForm" value={this.state?.peso} variant="outlined" label="Peso" 
                            inputProps={{min: 0 }} onChange={ (e) => this.setState({peso: e.target.value})} />

                        </div>

                        <div className="form-group col-md-4">

                            <TextField type="number" className="inputForm" value={this.state?.altura} variant="outlined" label="Altura"  
                            inputProps={{min: 0 }} onChange={ (e) => this.setState({altura: e.target.value})} />

                            <small id="emailHelp" className="form-text text-muted">Em centímetros por favor!</small>

                        </div>

                        <div className="form-group col-md-12">

                            <TextField multiline type="text" rows="2" className="inputForm" value={this.state?.caracteristicas} variant="outlined"
                             label="Características" onChange={ (e) => this.setState({caracteristicas: e.target.value})} />

                            <small id="emailHelp" className="form-text text-muted">Fale um pouquinho sobre o seu amado! s2</small>

                        </div>

                        <div className="form-group col-md-6">

                            <TextField type="text" className="inputForm" value={this.state?.nomeDoResponsavel} variant="outlined" label="Nome do Responsável" 
                             onChange={ (e) => this.setState({nomeDoResponsavel: e.target.value})} required/>

                            <small id="emailHelp" className="form-text text-muted">Nome do responsável</small>

                        </div>

                        <div className="form-group col-md-6">

                            <TextField type="email" className="inputForm" value={this.state?.email} variant="outlined" label="E-mail" 
                            onChange={ (e) => this.setState({email: e.target.value})} required/>

                            <small id="emailHelp" className="form-text text-muted">E-mail do responsável</small>

                        </div>

                        <div className="form-group col-md-6">

                            <TextField type="number" className="inputForm" value={this.state?.telefone} variant="outlined" label="Telefone" 
                               inputProps={{minLength: 8 }} onChange={ (e) => this.setState({telefone: e.target.value})} required/>

                            <small id="emailHelp" className="form-text text-muted">Seu telefone</small>

                        </div>

                        <div className="form-group col-md-6">

                            <TextField type="text" className="inputForm" value={this.state?.endereco} variant="outlined" label="Endereço" 
                             onChange={ (e) => this.setState({endereco: e.target.value})} />

                            <small id="emailHelp" className="form-text text-muted">Rua, Nº e bairro</small>

                        </div>

                        <div className="form-group col-md-6">

                            <TextField type="text" className="inputForm" value={this.state?.cidade} variant="outlined" label="Cidade"  
                            onChange={ (e) => this.setState({cidade: e.target.value})} /> 

                        </div>

                        <div className="form-group col-md-6">

                            <TextField type="text" className="inputForm" value={this.state?.alergia} variant="outlined" label="Alergias"  
                            onChange={ (e) => this.setState({alergia: e.target.value})} required />

                            <small id="emailHelp" className="form-text text-muted">Descreva todas!</small>

                        </div>

                        <div className="form-group col-md-12">

                            <TextField multiline type="text" rows="2"  className="inputForm" value={this.state?.remedios} variant="outlined"  
                            label="Remédios"  onChange={ (e) => this.setState({remedios: e.target.value})} required/>

                            <small id="emailHelp" className="form-text text-muted">Algum remédio controlado? </small>

                        </div>

                        <div className="form-group col-md-12">

                            <TextField multiline type="text" rows="3"  className="inputForm" value={this.state?.adicionais} variant="outlined" 
                            label="Adicionais"  onChange={ (e) => this.setState({adicionais: e.target.value})} />

                            <small id="emailHelp" className="form-text text-muted">Se tiver algo a mais que não foi citado no formulário! </small>

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

export default CriancasPCD;