import React,{ useState } from 'react';
import Login from  './pages/login/login';
import './App.css'
import BarraLateral from './components/BarraLateral';
import * as qrr from './shared/images/qrr.png'

function App() {
  
  const [contemBarra, setContemBarra] = useState();

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
        <img src={qrr} style={{width: 150}} ></img>
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

export default App;
