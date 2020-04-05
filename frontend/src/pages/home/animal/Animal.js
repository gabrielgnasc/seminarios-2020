import './Animal.css';
import React from 'react';
import api from '../../service'
import {history} from '../../../shared/history/history'

class Animal extends React.Component{

    constructor(props){
        super(props) 
        this.state = {
            nomeDono: '',
            telefone: null,
            endereco: '',
            email: '',
            nomeAnimal: '',
            cidade: '',
            idade: null,
            raca: '',
            genero: '',
            peso: null,
            vacinas: '',
            caracteristica: '',
            alimentacao: '',
            typeId: btoa(this.props.user.email) + (this.props.user.type.length).toString(),
            type: 'Animal'
        };
        
        
    }

    updateUser(e){
        e.preventDefault()
        let user = this.props.user;
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
            <>
                <div className="home-bg m-bt" >
                    <h2 style={{paddingLeft: 15, textAlign:"center"}} >Preencha com os dados do seu animal: </h2>
                    <form className="form-animal row" onSubmit={(e) => this.updateUser(e)} >
                        <div className="form-group col-md-7">
                            <input type="text" className="input-login" placeholder="Seu nome" onChange={ (e) => this.setState({nomeDono: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Seu nome completo</small>
                        </div>
                        <div className="form-group col-md-5">
                            <input type="text" className="input-login" placeholder="Telefone"  onChange={ (e) => this.setState({telefone: e.target.value})} required/>
                        </div>
                        <div className="form-group col-md-7">
                            <input type="text" className="input-login" placeholder="Endereço"  onChange={ (e) => this.setState({endereco: e.target.value})} />
                            <small id="emailHelp" className="form-text text-muted">Rua, Nº e Bairro </small>
                        </div>
                        <div className="form-group col-md-5">
                            <input type="text" className="input-login" placeholder="Cidade"  onChange={ (e) => this.setState({cidade: e.target.value})} />
                        </div>
                        <div className="form-group col-md-6">
                            <input type="email" className="input-login" placeholder="E-mail"  onChange={ (e) => this.setState({email: e.target.value})} />
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text" className="input-login" placeholder="Agora o nome do seu animalzinho" required onChange={ (e) => this.setState({nomeAnimal: e.target.value})} />
                        </div>
                        <div className="form-group col-md-4">
                            <input type="number" className="input-login" placeholder="Idade"  onChange={ (e) => this.setState({idade: e.target.value})} />
                            <small id="emailHelp" className="form-text text-muted">A idade dele também, se achar importante!</small>
                        </div>
                        <div className="form-group col-md-4">
                            <input type="text" className="input-login" placeholder="Raça"  onChange={ (e) => this.setState({raca: e.target.value})} />
                            <small id="emailHelp" className="form-text text-muted">Raça não importa, ele é lindo</small>
                        </div>
                        <div className="form-group col-md-4">
                            <input type="text" className="input-login" placeholder="Peso"  onChange={ (e) => this.setState({peso: e.target.value})} />
                            <small id="emailHelp" className="form-text text-muted">Sera que você sabe?</small>
                        </div>
                        <div className="form-group col-md-3">
                            <input type="text" className="input-login" placeholder="Gênero"  onChange={ (e) => this.setState({genero: e.target.value})} />
                        </div>
                        <div className="form-group col-md-4">
                            <input type="text" className="input-login" placeholder="Características" required onChange={ (e) => this.setState({caracteristica: e.target.value})} />
                            <small id="emailHelp" className="form-text text-muted">Bravo, amável ou carente?</small>
                        </div>
                        <div className="form-group col-md-5">
                            <input type="text" className="input-login" placeholder="Alimentação"  onChange={ (e) => this.setState({alimentacao: e.target.value})} />
                            <small id="emailHelp" className="form-text text-muted">Aposto que come até pedra</small>
                        </div>
                        <div className="form-group col-md-12">
                            <textarea type="text" rows="2" className="input-login" placeholder="Vacinas"  onChange={ (e) => this.setState({vacinas: e.target.value})} />
                            <small id="emailHelp" className="form-text text-muted">Coloque todas as que lembrar :)</small>
                        </div>

                       <div className="col-12 justify-items-end">
                            <button type="submit" className="btn btn-primary bg-roxo btn-salvar offset-md-10">Salvar</button>
                       </div>
                    </form> 
                </div>
                
            </>
        );
    }
}

export default Animal;