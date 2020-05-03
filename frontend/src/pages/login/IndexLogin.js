import React from 'react';
import Login from  './Login';
import BarraLateral from '../../components/BarraLateral';
import * as logo from  './../../shared/images/logo.png';
import api from '../service';
import {history} from '../../shared/history/history';
import { connect } from 'react-redux';
import {toggleStateUser} from '../../store/actions';
import {Navbar} from 'react-bootstrap';
import logoW from '../../shared/images/logo-w.png';


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
    this.props.dispatch(toggleStateUser(null,false))
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

  async verificarLogado(){

    if (localStorage.getItem('token')){
      try{
        const headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')};
        const response =  await api.get('/token/' + localStorage.getItem('token') ,  { headers });
        if (response.status === 200){
          history.push('/');
        }
        if (response.status === 400){
          localStorage.removeItem('token');
        }
      } catch(error){
        localStorage.removeItem('token');
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
        <div style={{width: '100%'}}>
           {this.nav()}
        </div>
      )
    }

  }

  nav(){    
    return(
        <Navbar bg="light" expand="lg" className="nav-color" >
            <Navbar.Brand href="/home">
                <img src={logoW} style={{width: 40, marginLeft:25}} alt="Logo img" ></img>QR Card
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" style={{flexFlow: 'row-reverse'}}>
            
            </Navbar.Collapse>
        </Navbar>  
    );

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

export default connect(state => ({isLogged: state.isLogged}))(IndexLogin) ;
