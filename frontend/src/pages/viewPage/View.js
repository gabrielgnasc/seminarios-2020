import React from 'react';
import './View.css';
import api from '../service';
import {Navbar} from 'react-bootstrap';
import logoW from '../../shared/images/logo-w.png';


 class View extends React.Component{

        constructor(props){
            super(props) 
            this.state = {
                type: null
            };
      
            const {match} = this.props;
            this.id = match.params.id;

            this.getUser();     
        }
    
        getUser(){
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            }
            try{
                api.get('/userType/' + this.id, {headers }).then((res) =>{
                    this.setState({type: res.data})
                    if(res.data.length === 0 ){
                        this.setState({type: {erro: 'Este código não possui nenhum dado'}});
                    }
                })

            }catch(error){
                alert(error.message)
            }
            
        }

        gerarPagina(){
            const dados = this.state.type;
            var labels = [];

            if(dados !== null){
            Object.keys(dados).forEach(function(item){
                if(dados[item]){
                    
                    labels.push(

                        <div className="col-md-6" key={item} >
                            <h6> 
                                { 
                                    item.split(/(?=[A-ZÀ-Ú])/).join(" ")
                                        .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) 
                                }:
                            </h6>
                            <textarea value={dados[item]} className="input-login" disabled></textarea>
                        </div>
                    );
                }
            });
            }


            return ( <div className="row"> {labels} </div>)
        }
    
       nav(){
            if(!localStorage.getItem('token')){
                return(
                    <Navbar bg="light" expand="lg" className="nav-color">
                        <Navbar.Brand href="/home">
                            <img src={logoW} style={{width: 40, marginLeft:25}} alt="Logo img" ></img>QR Id
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" style={{flexFlow: 'row-reverse'}}>
                        
                        </Navbar.Collapse>
                    </Navbar>  
                );
            }else{
                return( <></>)
            }
       }
    
        render(){
            
            return(
                <>
                    {this.nav()}
                    <div className="container">
                        <div className="card shadow" style={{marginTop:35}}>
                            <div className="card-header">
                                <h2>Informações do Código lido</h2>
                            </div>
                            <div className="card-body" style={{padding:25}}>
                            {this.gerarPagina()}       
                            </div>
                        </div>
                        
                    </div>
                </>
            );
        }
    }
    
    export default View;