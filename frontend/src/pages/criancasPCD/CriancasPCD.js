import './CriancasPCD.css';
import React from 'react';
import api from '../service'
import {history} from '../../shared/history/history'

class CriancasPCD extends React.Component{

    constructor(props){
        super(props) 
        this.state = {
            nome: '',
            idade: null,
            nomeResp: '',
            endereco: '',
            telefone: '',
            email: '',
            caracteristicas: '',
            alergias: '',
            remedios: '',
            peso: null,
            altura: null,
            adicionais: '',
            cidade:'',
            genero:'',
            typeId:'',
            type: 'Crianças e PCD'
        };
        this.user = null;
        this.getUser();
    }

    getUser(){
        const token = localStorage.getItem('token');
        const headers = {'Authorization': 'Bearer ' + token}
        api.get('/token/' + token ,  { headers }).then((res) =>{
            this.user =res.data;
            this.setState({typeId: btoa(this.user.email) + (this.user.type.length).toString()})
            if(res.data.error){
                history.push('/login');
            }

        })
    }

    updateUser(e){
        e.preventDefault()
    
        let user = this.user;
        user.type.push(this.state)

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
            <div className="container">
                <div className="home-bg m-bt left-to-right" >
                    <h2 style={{paddingLeft: 15, textAlign:"center"}} >Preencha os dados abaixo : </h2>
                    <form className="form-animal row" onSubmit={(e) => this.updateUser(e)}  >
                        <div className="form-group col-md-8">
                            <input type="text" className="input-login" placeholder="Nome" onChange={ (e) => this.setState({nome: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Nome completo de quem deseja proteger.</small>
                        </div>
                        <div className="form-group col-md-4">
                            <input type="text" className="input-login" placeholder="Gênero"  onChange={ (e) => this.setState({genero: e.target.value})}/>
                            <small id="emailHelp" className="form-text text-muted">Masculino, Feminino, LGBTQ+</small>
                        </div>
                        <div className="form-group col-md-4">
                            <input type="number" className="input-login" placeholder="Idade"  onChange={ (e) => this.setState({idade: e.target.value})} required/>
                        </div>
                        <div className="form-group col-md-4">
                            <input type="number" className="input-login" placeholder="Peso"  onChange={ (e) => this.setState({peso: e.target.value})} />
                        </div>
                        <div className="form-group col-md-4">
                            <input type="number" className="input-login" placeholder="Altura"  onChange={ (e) => this.setState({altura: e.target.value})} />
                            <small id="emailHelp" className="form-text text-muted">Em centímetros por favor!</small>
                        </div>
                        <div className="form-group col-md-12">
                            <textarea type="text" rows="2" className="input-login" placeholder="Características" onChange={ (e) => this.setState({caracteristicas: e.target.value})} />
                            <small id="emailHelp" className="form-text text-muted">Fale um pouquinho obre o seu amado! s2</small>
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text" className="input-login" placeholder="Nome do Responsável"  onChange={ (e) => this.setState({nomeResp: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Nome do responsável</small>
                        </div>
                        <div className="form-group col-md-6">
                            <input type="email" className="input-login" placeholder="E-mail" onChange={ (e) => this.setState({email: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">E-mail do responsável</small>
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text" className="input-login" placeholder="Telefone"  onChange={ (e) => this.setState({telefone: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Seu telefone</small>
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text" className="input-login" placeholder="Endereço"  onChange={ (e) => this.setState({endereco: e.target.value})} />
                            <small id="emailHelp" className="form-text text-muted">Rua, Nº e bairro</small>
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text" className="input-login" placeholder="Cidade"  onChange={ (e) => this.setState({cidade: e.target.value})} /> 
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text" className="input-login" placeholder="Alergias"  onChange={ (e) => this.setState({alergia: e.target.value})} />
                            <small id="emailHelp" className="form-text text-muted">Descreva todas!</small>
                        </div>
                        <div className="form-group col-md-12">
                            <textarea type="text" rows="2"  className="input-login" placeholder="Remédios"  onChange={ (e) => this.setState({remedios: e.target.value})} />
                            <small id="emailHelp" className="form-text text-muted">Algum remédio controlado? </small>
                        </div>
                        <div className="form-group col-md-12">
                            <textarea type="text" rows="3"  className="input-login" placeholder="Adicionais"  onChange={ (e) => this.setState({adicionais: e.target.value})} />
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