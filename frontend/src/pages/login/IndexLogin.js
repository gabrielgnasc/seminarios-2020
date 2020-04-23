import React from 'react';
import Login from  './Login';
import BarraLateral from '../../components/BarraLateral';
import * as logo from  './../../shared/images/logo.png';
import api from '../service';
import {history} from '../../shared/history/history';


class IndexLogin extends React.Component {

  _isMounted = false;
  constructor(props){
    super(props);

    const widht = window.innerWidth;
     
    this.state = {
      contemBarra: widht,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.resize();
    this.verificarLogado();
  }

  resize(){
    if(this._isMounted){
      window.addEventListener('resize',  ()=>{
        if(this._isMounted){
          this.setState({contemBarra: window.innerWidth});
        }
      });
    }
   
  }

  verificarLogado(){
    
    if(localStorage.getItem('token')){
      const token = localStorage.getItem('token');

      const verificarToken = async () => { 

        try{
          const headers = {'Authorization': 'Bearer ' + token};
          const response =  await api.get('/token/' + token ,  { headers });
          if(this._isMounted){
            if(response.status=== 200){
              history.push('/')
            }
          }

        }catch(error){
          localStorage.removeItem('token');
        }

      }

      if(this._isMounted){
        verificarToken();
      }

    }
  }
  

  componentWillUnmount() {
    this._isMounted = false;
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
            <Login ></Login>
            <img src={logo} className="img-logo" alt="QR Id" ></img>
        </div>
    );
  }
}

export default IndexLogin;
