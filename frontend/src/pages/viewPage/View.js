import React from 'react';
import './View.css';
import api from '../service';

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
                        alert('teste')
                    }
                })

            }catch(error){
                alert('dçlfadf')
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
                            <textarea className="input-login" disabled>
                                {dados[item]}
                            </textarea>
                        </div>
                    );
                }
            });
            }


            return ( <div className="row"> {labels} </div>)
        }
    
       
    
        render(){
            
            return(
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
            );
        }
    }
    
    export default View;