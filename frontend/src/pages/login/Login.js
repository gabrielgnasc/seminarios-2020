import React,{Component} from 'react';
import LoginComponent from  './loginComponent/LoginComponent';
import BarraLateral from '../../components/barraLateral/barraLateral';
import * as logo from  './../../shared/images/logo.png';
import api from '../service';
import {history} from '../../shared/history/history';
import { connect } from 'react-redux';
import {toggleStateUser} from '../../store/actions';
import {Navbar} from 'react-bootstrap';
import logoW from '../../shared/images/logo-w.png';


class Login extends Component {

  _isMounted = false;

  constructor(props){
    super(props);

    const widht = window.innerWidth;
    
    this.state = {
      containsBar: widht,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.resize();
    this.checkLogIn();
    this.props.dispatch(toggleStateUser(null,false))
  }

  resize(){
    if(this._isMounted){
      window.addEventListener('resize',  ()=>{
        if(this._isMounted){
          this.setState({containsBar: window.innerWidth});
        }
      });
    }
  }

  async checkLogIn(){

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
    if(this.state.containsBar > 981){
      return(
        <BarraLateral></BarraLateral>
      )
    }else if(this.state.containsBar < 865) {
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
    console.log(process.env.NODE_ENV)
    return(
        <div className="App-header">
            {this.barraLateral()}
            <LoginComponent ></LoginComponent>
            <img src={logo} className="img-logo" alt="QR Id" ></img>
        </div>
    );
  }
}

export default connect(state => ({isLogged: state.isLogged}))(Login) ;
