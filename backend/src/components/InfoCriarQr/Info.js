import React from 'react';
//import {Card, CardContent, Typography} from '@material-ui/core';


function Info(name){

    return(

        <div style={{ marginTop: '-70px'}}>

            <div className="cardConfig"  > 
                <div className="titulo-card" >
                    <h2>
                        {name}
                    </h2>
                </div>
                <div style={{padding: 50, paddingTop: 70, paddingBottom: 20}}>
                    <h3>Preencha os dados do formulário abaixo com as informações corretas e coerentes, os campos com * são obrigatórios</h3>
                </div>
 
            </div>
        </div>
    );
}

export default Info;