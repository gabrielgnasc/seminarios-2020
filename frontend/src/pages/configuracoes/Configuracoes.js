import React from 'react';
import './Configuracoes.css';
import {Card, CardContent, Typography, Button} from '@material-ui/core';
import {TextField} from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import api from '../service';

class Configuracoes extends React.Component{

   
    constructor(props){
        super(props);

        this.state={
            nome: '',
            email: '',
            senhaA: '',
            senhaN: '',
            senhaC: '',
            expanded: 'painel1',
            fotoPerfil: [],
            user: null,
        }

        this.getUser();
    }


    getUser(){
        const token = localStorage.getItem('token');
        const headers = {'Authorization': 'Bearer ' + token}
        api.get('/token/' + token ,  { headers }).then((res) =>{
            this.setState({user: res.data, nome: res.data.name, email: res.data.email})
        })
    }

    updateUser(dados, url){
        const token = localStorage.getItem('token');
        const headers = {'Authorization': 'Bearer ' + token}
        api.post(url,{user: dados} ,{ headers }).then((res) =>{
            
        },(error) => {
            alert(error)
        })
    }

    handleChange = (painel) => (event, isExpanded) => {
        this.setState({expanded: isExpanded ? painel : false});
    };

    handleCapture = ({ target }) => {
        const fileReader = new FileReader();
        const name = 'fotoPerfil';

        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            this.setState((prevState) => ({
                [name]: [...prevState[name], e.target.result]
            }));
        };
    };

    handleAlterPassword = () =>{
        if(this.state.senhaN === this.state.senhaC){
            var dados = {
                senhaAntiga: this.state.senhaA,
                senhaNova: this.state.senhaN,
                email: this.state.user.email
            };
            this.updateUser( dados, '/updatePassword');
        }
        else{
            alert('As senhas não coincidem!')
        }
    }

    handleAlterPerfil = () => {
        var user = this.state.user;
        user.name = this.state.nome;
        user.email = this.state.email
        this.updateUser(user, '/updateUser');
    }

    render(){
     
        return(
            <>
                <div id="seta" ></div>
                <div className="row justify-content-center">
                    <div className="cardConfig"  style={{width: '100%'}}>  
                        <Card  className="tela-in">
                            <CardContent>
                                <div>
                                    <h4>Edite seu perfil</h4>
                                </div>
                                <hr></hr>
                                <div className="row" >
                                    <div className="col-md-12" >

                                        <ExpansionPanel expanded={this.state.expanded === 'painel1'} onChange={this.handleChange('painel1')}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="painel1" >
                                                <Typography className="" >Configurações básicas</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <form className="row" >

                                                    <div className="form-group col-md-12">
                                                        <TextField type="text" className="inputForm" value={this.state?.nome} label="Nome"  
                                                        onChange={ (e) => this.setState({nome: e.target.value})} />
                                                    </div>

                                                    <div className="form-group col-md-12">
                                                        <TextField type="email" className="inputForm" value={this.state?.email} label="Email"  
                                                        onChange={ (e) => this.setState({email: e.target.value})} />
                                                    </div>

                                                    <div className="col-12 justify-items-end">
                                                        <button type="button" onClick={ this.handleAlterPerfil }
                                                            className="btn btn-primary bg-roxo btn-salvar offset-md-10">Salvar</button>
                                                    </div>

                                                </form>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>

                                        <ExpansionPanel expanded={this.state.expanded === 'painel2'} onChange={this.handleChange('painel2')}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="painel2" >
                                                <Typography className="" >Alterar Senha</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <form className="row" >

                                                    <div className="form-group col-md-12">
                                                        <TextField type="text" className="inputForm"  label="Senha antiga"  
                                                        onChange={ (e) => this.setState({senhaA: e.target.value})} />
                                                    </div>

                                                    <div className="form-group col-md-12">
                                                        <TextField type="email" className="inputForm" label="Nova Senha"  
                                                        onChange={ (e) => this.setState({senhaN: e.target.value})} />
                                                    </div>

                                                    <div className="form-group col-md-12">
                                                        <TextField type="email" className="inputForm" label="Confirmar Senha"  
                                                        onChange={ (e) => this.setState({senhaC: e.target.value})} />
                                                    </div>

                                                    <div className="col-12 justify-items-end">
                                                        <button type="button" onClick={ this.handleAlterPassword}
                                                        className="btn btn-primary bg-roxo btn-salvar offset-md-10">Salvar</button>
                                                    </div>
                                                </form>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>

                                        <ExpansionPanel expanded={this.state.expanded === 'painel3'} onChange={this.handleChange('painel3')}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="painel2" >
                                                <Typography className="" >Alterar foto</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <form className="row div-img" >

                                                    <div className="circle" >
                                                        <img src={this.state.fotoPerfil[0]} className="img-config"></img>
                                                    </div>

                                                    <input accept="image/*" onChange={ this.handleCapture} style={{ display: 'none' }} id="raised-button-file" type="file" />
                                                    <label htmlFor="raised-button-file">
                                                        <Button variant="text" component="span" >
                                                            Upload
                                                        </Button>
                                                    </label> 

                                                </form>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                        
                                    </div>
                                </div>
                                
                            </CardContent>
                        </Card>
                    </div>
                </div>
                   
            </>
        )
    }
}
export default Configuracoes


// <div className="titulo-card" >
// <h2>
//     Configurações
// </h2>
// <h5>
//     Edite suas informações
// </h5>
// </div>