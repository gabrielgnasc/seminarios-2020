import React, {Component} from 'react';

class Info extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(

            <div style={{ marginTop: '-70px'}}>

                <div className="cardConfig"  > 
                    <div className="titulo-card" >
                        <h2>
                            {this.props.name}
                        </h2>
                    </div>
                    <div className="div-texto-info" >
                        <p className=" h3 texto-info-name " >Preencha os dados do formulário abaixo com as informações corretas e coerentes, os campos com * são obrigatórios</p>
                    </div>
    
                </div>
            </div>
        );
    }
}

export default Info;