import React,{ useState } from 'react';
import Login from  './Login';
import BarraLateral from '../../components/BarraLateral';
import * as qrr from  './../../shared/images/qrr.png'

function IndexLogin() {
  
  const widht = window.innerWidth < 865;
  const [contemBarra, setContemBarra] = useState(!widht);

  window.addEventListener('resize', function(){
    if (window.innerWidth < 865) {
        setContemBarra(false)
    } else {
        setContemBarra(true)
    }
  })

  function barraLateral(){
    if(contemBarra){
      return(
        <BarraLateral></BarraLateral>
      )
    }else{
      return(
        <>
          <p className="text-qrid" >QR Id</p>
          <img alt="QR-ID" src={qrr} className="img-cel" ></img>
        </>
      )
    }
  }

  return (
    <div className="App-header">
      {barraLateral()}
      <Login></Login>
    </div>
  );
}

export default IndexLogin;
