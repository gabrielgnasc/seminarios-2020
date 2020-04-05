import React from 'react';
import './navbar.css'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { MdHome } from "react-icons/md"; 
import {FaUserAlt,FaDog} from "react-icons/fa";
import {MdChildFriendly, MdLocalHospital, MdExitToApp} from "react-icons/md";
import {FiChevronDown} from "react-icons/fi";
import logoW from '../../shared/images/logo-w.png';
import {history} from '../../shared/history/history';
import api from '../../pages/service'

class NavBar extends React.Component {

    constructor(props){
        super(props);
        if(!localStorage.getItem('token')){
            history.push('/login');
        }
        this.user = null;
        this.getUser();
    }

    getUser(){
        const token = localStorage.getItem('token');
        const headers = {'Authorization': 'Bearer ' + token}
        api.get('/token/' + token ,  { headers }).then((res) =>{
            this.user =res.data;
            this.setState({typeId: btoa(this.user.email) + (this.user.type.length).toString()})
            if(res.data.error){
                history.push('/login');
            }

        })
    }

    render(){
        return(
            <>
                <Navbar bg="light" expand="lg" className="nav-color">
                    <Navbar.Brand href="/home">
                        <img src={logoW} style={{width: 40, marginLeft:25}} alt="Logo img" ></img>QR Id
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" style={{flexFlow: 'row-reverse'}}>
                        <div >
                            <Nav className="mr-auto">
                                <div className="border-nav" id="homeC" >
                                    <Nav.Link href="/home"  >
                                        <MdHome className="icon-adjust" />
                                        Home
                                    </Nav.Link>
                                </div>
                                <div className="border-nav" id="homeC" >
                                    <NavDropdown title="Criar Qr" id="collasible-nav-dropdown">

                                        <NavDropdown.Item href="/home/hospitalar" >    
                                                <MdLocalHospital className="icon-adjust" />
                                                Hospitalar
                                        </NavDropdown.Item>

                                        <NavDropdown.Item  href="/home/animais">
                                                <FaDog className="icon-adjust" />
                                                Animal
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/home/criancas-e-especiais">
                                                <MdChildFriendly className="icon-adjust" />
                                                Crianças e especiais
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                                <div className="border-nav">
                                    <Nav.Link  >
                                        <FaUserAlt className="icon-adjust" />
                                        Perfil
                                        {/* <FiChevronDown className="icon-adjust" style={{marginLeft: 5}} /> */}
                                    </Nav.Link>
                                    
                                </div>

                                <div className="border-nav">
                                    <Nav.Link  href="/login" onClick={() => {localStorage.removeItem('token')}}>
                                        <MdExitToApp className="icon-adjust" />
                                        Sair 
                                    </Nav.Link>
                                    
                                </div>
                            </Nav>
                        </div>
                    </Navbar.Collapse>
                </Navbar>                
            </>
        );
    }   
}

export default NavBar;

