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
            console.log(this.id)

            this.getUser()
              
        }
    
        getUser(){

            api.get('/userType/' + this.id ).then((res) =>{
                this.setState({type: res.data})
                if(res.data.length === 0 ){
                    alert('teste')
                }
            })
        }

        gerarPagina(){
            const dados = this.state.type;
            var labels = [];

            if(dados !== null){
            Object.keys(dados).forEach(function(item){
                console.log(item + " = " + dados[item]);
                labels.push(
                    <div>
                        <label> 
                            {item + ": " + dados[item]}
                        </label>

                    </div>
                )
            });
            }


            return ( <div> {labels} </div>)
        }
    
       
    
        render(){
            
            return(
                <div className="container">
                    {this.gerarPagina()}
                </div>
            );
        }
    }
    
    export default View;