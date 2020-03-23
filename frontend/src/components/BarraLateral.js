import React from 'react';
import './BarraLateral.css'
import * as qrid from './../shared/images/qrr.png';

function BarraLateral() {
  return (
      <div className="info-login-bg" >
        <div className="info-login">
          <div className="text-info-w">
            <h1 className="text-logo"> QR Id </h1>
            <p>Agora as pessoas que você ama podem ficar ainda mais seguras.</p>
          </div>
          <img alt="QR-ID" src={qrid} className="img-qr" ></img>
          <p style={{color:'#FFF', fontSize:16}}>Escaneie para mais informações</p>
          <div className="text-info-w2">
            <p >Cadastre-se já, é gratuito.</p><br></br>
            <p>Mantenha sempre seguro as pessoas mais importantes pra você!</p>
          </div>
        </div>
      </div>
  );
}

export default BarraLateral;
