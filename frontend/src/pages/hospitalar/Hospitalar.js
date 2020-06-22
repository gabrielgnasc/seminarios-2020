import './Hospitalar.css';
import React,{Component} from 'react';
import {TextField} from '@material-ui/core';
import Info from '../../components/InfoCriarQr/Info';
import { connect } from 'react-redux';
import {toggleStateUser} from '../../store/actions';
import serviceGetUser from '../serviceGetUser';
import serviceUpdateUser from '../serviceUpdateUser';

class Hospitalar extends Component{

    constructor(props, {user}){
        super(props) 
        this.state = {
            nome: '',
            genero:'',
            idade: '',
            peso:'',
            altura:'',
            cpf: '',
            alergias: '',
            tipoSanguineo: '',
            areaHospitalar: '',
            remedios: '',
            examesRealizados: '',
            cirurgiasRealizadas: '',
            examesARealizar: '',
            cirurgiasARealizar: '',
            nomeDoAcompanhante: '',
            telefone: '',
            necessidadeDeAtendimento: '',
            typeId: '',
            type: 'hospitalar'
        };

        const {computedMatch} = this.props;
        if(computedMatch !== undefined){
            this.id = computedMatch.params.id;
        }

        props.dispatch(toggleStateUser(null,true));
        this.user = null;
        this.getUser();
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
                    <Info name="Hospitalar"/>
                    <form className="form-animal row" onSubmit={(e) => this.updateUser(e)}  >
                       
                        <div className="form-group col-md-8">
                       
                            <TextField type="text" className="inputForm" value={this.state?.nome} label="Nome" variant="outlined" 
                            onChange={ (e) => this.setState({nome: e.target.value})} required/>
                       
                            <small id="emailHelp" className="form-text text-muted">Nome completo do paciente</small>
                       
                        </div>
                       
                        <div className="form-group col-md-4">
                       
                            <TextField type="text" className="inputForm" value={this.state?.genero} label="Gênero"  variant="outlined"
                             onChange={ (e) => this.setState({genero: e.target.value})} required/>
                       
                            <small id="emailHelp" className="form-text text-muted">Masculino, Feminino, LGBTQ+</small>
                       
                        </div>
                       
                        <div className="form-group col-md-4">
                       
                            <TextField type="number" min="0" className="inputForm" value={this.state?.idade} label="Idade"  variant="outlined" 
                            inputProps={{min: 0 }} onChange={ (e) => this.setState({idade: e.target.value})} required/>
                       
                            <small id="emailHelp" className="form-text text-muted">Idade</small>
                       
                        </div>
                       
                        <div className="form-group col-md-4">
                       
                            <TextField type="number" min="1" className="inputForm" value={this.state?.peso} label="Peso"  variant="outlined"
                             inputProps={{min: 0 }} onChange={ (e) => this.setState({peso: e.target.value})} required/>
                       
                            <small id="emailHelp" className="form-text text-muted">Peso</small>
                       
                        </div>
                       
                        <div className="form-group col-md-4">
                       
                            <TextField type="number" className="inputForm" value={this.state?.altura} label="Altura"  variant="outlined" 
                            inputProps={{min: 0 }} onChange={ (e) => this.setState({altura: e.target.value})} required />
                       
                            <small id="emailHelp" className="form-text text-muted">Altura</small>
                       
                        </div>
                       
                        <div className="form-group col-md-8">
                       
                            <TextField type="text" className="inputForm" value={this.state?.cpf} label="CPF" variant="outlined" 
                            onChange={ (e) => this.setState({cpf: e.target.value})} />
                       
                            <small id="emailHelp" className="form-text text-muted">CPF</small>
                       
                        </div>
                       
                        <div className="form-group col-md-4">
                       
                            <TextField type="text" className="inputForm" value={this.state?.tipoSanguineo} label="Tipo sanguíneo"  variant="outlined"
                             onChange={ (e) => this.setState({tipoSanguineo: e.target.value})} required/>
                       
                            <small id="emailHelp" className="form-text text-muted">Tipo sanguíneo</small>
                       
                        </div>
                       
                        <div className="form-group col-md-12">
                       
                            <TextField multiline type="text" rows="3" className="inputForm" value={this.state?.alergias} label="Alergias" variant="outlined"
                            onChange={ (e) => this.setState({alergias: e.target.value})} required/>
                       
                            <small id="emailHelp" className="form-text text-muted">Alergias</small>
                       
                        </div>
                       
                        <div className="form-group col-md-12">
                       
                            <TextField multiline type="text" rows="3" className="inputForm" value={this.state?.remedios} label="Remédios" variant="outlined"
                            onChange={ (e) => this.setState({remedios: e.target.value})} required/>
                       
                            <small id="emailHelp" className="form-text text-muted">Remédios</small>
                       
                        </div>
                       
                        <div className="form-group col-md-12">
                       
                            <TextField multiline type="text" rows="3" className="inputForm" value={this.state?.examesRealizados} label="Exames Realizados" variant="outlined"
                            onChange={ (e) => this.setState({examesRealizados: e.target.value})} required/>
                       
                            <small id="emailHelp" className="form-text text-muted">Exames Realizados</small>
                       
                        </div>
                       
                        <div className="form-group col-md-12">
                       
                            <TextField multiline type="text" rows="3" className="inputForm" value={this.state?.cirurgiasRealizadas} label="Cirurgias Realizadas" 
                             variant="outlined" onChange={ (e) => this.setState({cirurgiasRealizadas: e.target.value})} required/>
                       
                            <small id="emailHelp" className="form-text text-muted">Cirurgias Realizadas</small>
                       
                        </div>
                       
                        <div className="form-group col-md-12">
                       
                            <TextField multiline type="text" rows="3" className="inputForm" value={this.state?.examesARealizar} label="Exames a Realizar"  
                            variant="outlined" onChange={ (e) => this.setState({examesARealizar: e.target.value})} required/>
                       
                            <small id="emailHelp" className="form-text text-muted">Exames a Realizar</small>
                       
                        </div>
                       
                        <div className="form-group col-md-12">
                       
                            <TextField multiline type="text" rows="3" className="inputForm" value={this.state?.cirurgiasARealizar} label="Cirurgias Realizar" 
                            variant="outlined" onChange={ (e) => this.setState({cirurgiasARealizar: e.target.value})} required/>
                       
                            <small id="emailHelp" className="form-text text-muted">Cirurgias a Realizar</small>
                       
                        </div>
                       
                        <div className="form-group col-md-5">
                       
                            <TextField type="text" className="inputForm" value={this.state?.nomeDoAcompanhante} label="Nome do Acompanhante" variant="outlined" 
                            onChange={ (e) => this.setState({nomeDoAcompanhante: e.target.value})} required/>
                       
                            <small id="emailHelp" className="form-text text-muted">Nome completo do acompanhante</small>
                       
                        </div>
                       
                        <div className="form-group col-md-5">
                       
                            <TextField type="number" className="inputForm" value={this.state?.telefone} label="Telefone do acompanhante"  variant="outlined" 
                            onChange={ (e) => this.setState({telefone: e.target.value})} required/>
                       
                            <small id="emailHelp" className="form-text text-muted">Telefone do acompanhante</small>
                       
                        </div>
                       
                        <div className="form-group col-md-2">
                       
                            <TextField type="text" className="inputForm" value={this.state?.necessidadeDeAtendimento} label="alto, médio, baixo"  variant="outlined" 
                            onChange={ (e) => this.setState({necessidadeDeAtendimento: e.target.value})} required/>
                       
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

export default connect(state => ({user: state.user}))(Hospitalar);