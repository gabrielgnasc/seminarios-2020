import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './barraLateral.css'
import * as qrid from './../../shared/images/qrr.png';

class BarraLateral extends Component{

  constructor(props){
      super(props);
  }
  render(){
    return (
        <div className="info-login-bg" >
          <div className="info-login">
            <div className="text-info-w">
              <p>Agora as pessoas que você ama podem ficar ainda mais seguras.</p>
            </div>
            <div style={{justifySelf: 'center', alignSelf: 'center'}}>
              <img alt="QR-ID" src={qrid} className="img-qr" ></img>
              <p style={{color:'#FFF', fontSize:16}}>Escaneie para mais <Link to="/info">informações</Link></p>
            </div>
            <div className="text-info-w2">
              <p >Cadastre-se já, é gratuito.</p><br></br>
              <p>Mantenha sempre seguro as pessoas mais importantes pra você!</p>
            </div>
          </div>
        </div>
    );
  }
}

export default BarraLateral;
