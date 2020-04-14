import React,{ useState } from 'react';
import Login from  './Login';
import BarraLateral from '../../components/BarraLateral';
import * as logo from  './../../shared/images/logo.png';

function IndexLogin() {
  
  const widht = window.innerWidth;
  const [contemBarra, setContemBarra] = useState(widht);

  window.addEventListener('resize', function(){
    setContemBarra(window.innerWidth)
  })

  function barraLateral(){
    if(contemBarra > 981){
      return(
        <BarraLateral></BarraLateral>
      )
    }else if(contemBarra < 865) {
      return(
        <div style={{height:40}}>
        </div>
      )
    }
  }

  return (
    <div className="App-header">
      {barraLateral()}
      <Login></Login>
      <img src={logo} className="img-logo" alt="QR Id" ></img>
    </div>
  );
}

export default IndexLogin;
