import React from 'react';
import './Configuracoes.css';
import {Card, CardContent, Typography, Button } from '@material-ui/core';
import {TextField} from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import api from '../service';


class Configuracoes extends React.Component{

    montado = false;
    constructor(props){
        super(props);

        this.state={
            nome: '',
            email: '',
            senhaA: '',
            senhaN: '',
            senhaC: '',
            expanded: 'painel1',
            fotoPerfil: null,
            user: null,
        }

        this.getUser();
    }

    componentDidMount() {
        this.montado = true;
    }
    componentWillUnmount() {
        this.montado = false;
    }


    getUser(){
        const token = localStorage.getItem('token');
        const headers = 
        {
            'Authorization': 'Bearer ' + token,
        }
        api.get('/token/' + token ,  { headers }).then((res) =>{
            if(this.montado){
                this.setState({user: res.data, nome: res.data.name, email: res.data.email})
                if(res.data.file !== null && res.data.file !== undefined){
                    this.setState({fotoPerfil: res.data.file.url});
                }
            }
        })
    }

    updateUser(dados, url){
        const token = localStorage.getItem('token');
        const headers = 
        {
            'Authorization': 'Bearer ' + token,
        }
        api.post(url,{user: dados} ,{ headers }).then((res) =>{
            window.location.reload();  
        },(error) => {
            alert(error)
        })
    }

    handleChange = (painel) => (event, isExpanded) => {
        if(this.montado){
            this.setState({expanded: isExpanded ? painel : false});
        }
    };

    handleCapture = (e) => {

        const data = new FormData();

        var user = this.state.user;
        const file = e[0];
       
        data.append('file', file)

        api.post('/uploadFile',data ).then((res) =>{
            user.file = res.data.file
            user.file.oldFile = this.state.fotoPerfil;
            this.setState({fotoPerfil: user.file.url});
            this.updateUser(user,'/updateUser' );
        },(error) => {
            alert(error)
        })
        
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
                <div className="row justify-content-center" >
                    <div className="cardConfig"  style={{width: '100%'}}>  
                        <Card  className="tela-in">
                            <CardContent>
                                <div className="row" >
                                    <div className="col-md-12" >

                                        <ExpansionPanel expanded={this.state.expanded === 'painel1'} onChange={this.handleChange('painel1')} 
                                        elevation={this.state.expanded === 'painel1'? 3 : 0} >
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

                                        <ExpansionPanel expanded={this.state.expanded === 'painel2'} onChange={this.handleChange('painel2')} 
                                        elevation={this.state.expanded === 'painel2'? 3 : 0}>
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

                                        <ExpansionPanel expanded={this.state.expanded === 'painel3'} onChange={this.handleChange('painel3')} 
                                        elevation={this.state.expanded === 'painel3'? 3 : 0}> 
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="painel2" >
                                                <Typography className="" >Alterar foto</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <form className="row div-img" >

                                                    <div className="circle" >
                                                        <img src={this.state.fotoPerfil} className="img-config"></img>
                                                    </div>

                                                    <input accept="image/*" onChange={ (e) => this.handleCapture(e.target.files) } style={{ display: 'none' }} id="raised-button-file" type="file" />
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