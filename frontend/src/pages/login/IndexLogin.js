import React from 'react';
import Login from  './Login';
import BarraLateral from '../../components/BarraLateral';
import * as logo from  './../../shared/images/logo.png';
import {history} from '../../shared/history/history'

class IndexLogin extends React.Component {

  
  constructor(props){
    super(props);

    const widht = window.innerWidth;
     
    this.state = {
      contemBarra: widht
    };

    this.resize();

    this.setStateLog = this.setStateLog.bind(this)
  }

  resize(){
    window.addEventListener('resize',  ()=>{
        this.setState({contemBarra: window.innerWidth});
    });
  }
  

  setStateLog(valor){
    this.props.setLogado(valor);
    history.push('/');
  }

  barraLateral(){
    if(this.state.contemBarra > 981){
      return(
        <BarraLateral></BarraLateral>
      )
    }else if(this.state.contemBarra < 865) {
      return(
        <div style={{height:40}}>
        </div>
      )
    }
  }

  render(){
    return(
        <div className="App-header">
            {this.barraLateral()}
            <Login func={this.setStateLog} ></Login>
            <img src={logo} className="img-logo" alt="QR Id" ></img>
        </div>
    );
  }
}

export default IndexLogin;
