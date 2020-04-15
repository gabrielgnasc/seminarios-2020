import React from 'react';

function Info(name){

    return(
        <div style={{color: '#FFF', marginTop: 30}}>
            <h2>{name}</h2>
            <br></br>
            <br></br>
            <h5>Preencha os dados do formulário abaixo com as informações corretas e coerentes, os campos com * são obrigatórios</h5>

        </div>
    );
}

export default Info;