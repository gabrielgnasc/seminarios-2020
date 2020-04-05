import './Hospitalar.css';
import React from 'react';
import api from '../service'
import {history} from '../../shared/history/history'

class Hospitalar extends React.Component{

    constructor(props){
        super(props) 
        this.state = {
            nome: '',
            genero:'',
            idade: null,
            peso:'',
            altura:'',
            cpf: '',
            alergias: '',
            tipoSanguineo: '',
            areaHospitalar: '',
            remedios: '',
            examesRealizados: '',
            cirurgiasRealizadas: '',
            examesRealizar: '',
            cirurgiasRealizar: '',
            nomeAcompanhante: '',
            telefone: '',
            necessidadeAtendimento: '',
            typeId: '',
            type: 'Hospitalar'
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
            <div className="container" >
                <div className="home-bg m-bt left-to-right" >
                    <h2 style={{paddingLeft: 15, textAlign:"center"}} >Preencha os dados abaixo : </h2>
                    <form className="form-animal row" onSubmit={(e) => this.updateUser(e)}  >
                        <div className="form-group col-md-8">
                            <input type="text" className="input-login" placeholder="Nome" onChange={ (e) => this.setState({nome: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Nome completo do paciente</small>
                        </div>
                        <div className="form-group col-md-4">
                            <input type="text" className="input-login" placeholder="Gênero"  onChange={ (e) => this.setState({genero: e.target.value})}/>
                            <small id="emailHelp" className="form-text text-muted">Masculino, Feminino, LGBTQ+</small>
                        </div>
                        <div className="form-group col-md-4">
                            <input type="number" className="input-login" placeholder="Idade"  onChange={ (e) => this.setState({idade: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Idade</small>
                        </div>
                        <div className="form-group col-md-4">
                            <input type="number" className="input-login" placeholder="Peso"  onChange={ (e) => this.setState({peso: e.target.value})} />
                            <small id="emailHelp" className="form-text text-muted">Peso</small>
                        </div>
                        <div className="form-group col-md-4">
                            <input type="number" className="input-login" placeholder="Altura"  onChange={ (e) => this.setState({altura: e.target.value})} />
                            <small id="emailHelp" className="form-text text-muted">Altura</small>
                        </div>
                        <div className="form-group col-md-8">
                            <input type="text" rows="2" className="input-login" placeholder="CPF" onChange={ (e) => this.setState({cpf: e.target.value})} />
                            <small id="emailHelp" className="form-text text-muted">CPF</small>
                        </div>
                        <div className="form-group col-md-4">
                            <input type="text" className="input-login" placeholder="Tipo sanguíneo"  onChange={ (e) => this.setState({tipoSanguineo: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Tipo sanguíneo</small>
                        </div>
                        <div className="form-group col-md-12">
                            <textarea type="email" className="input-login" placeholder="Alergias" onChange={ (e) => this.setState({alergias: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Alergias</small>
                        </div>
                        <div className="form-group col-md-12">
                            <textarea type="text" className="input-login" placeholder="Remédios"  onChange={ (e) => this.setState({remedios: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Remédios</small>
                        </div>
                        <div className="form-group col-md-12">
                            <textarea type="text" className="input-login" placeholder="Exames Realizados"  onChange={ (e) => this.setState({examesRealizados: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Exames Realizados</small>
                        </div>
                        <div className="form-group col-md-12">
                            <textarea type="text" className="input-login" placeholder="Cirurgias Realizadas"  onChange={ (e) => this.setState({cirurgiasRealizadas: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Cirurgias Realizadas</small>
                        </div>
                        <div className="form-group col-md-12">
                            <textarea type="text" className="input-login" placeholder="Exames a Realizar"  onChange={ (e) => this.setState({examesRealizar: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Exames a Realizar</small>
                        </div>
                        <div className="form-group col-md-12">
                            <textarea type="text" className="input-login" placeholder="Cirurgias Realizar"  onChange={ (e) => this.setState({cirurgiasRealizar: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Cirurgias a Realizar</small>
                        </div>
                        <div className="form-group col-md-5">
                            <input type="text" className="input-login" placeholder="Nome do Acompanhante" onChange={ (e) => this.setState({nomeAcompanhante: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Nome completo do acompanhante</small>
                        </div>
                        <div className="form-group col-md-5">
                            <input type="text" className="input-login" placeholder="Telefone do acompanhante"  onChange={ (e) => this.setState({telefone: e.target.value})}/>
                            <small id="emailHelp" className="form-text text-muted">Telefone do acompanhante</small>
                        </div>
                        <div className="form-group col-md-2">
                            <input type="text" className="input-login" placeholder="alto, médio, baixo"  onChange={ (e) => this.setState({necessidadeAtendimento: e.target.value})} required/>
                            <small id="emailHelp" className="form-text text-muted">Grau de necessidade de atendimento médico</small>
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

export default Hospitalar;