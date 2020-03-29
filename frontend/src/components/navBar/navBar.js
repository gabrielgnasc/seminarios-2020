import React from 'react';
import './navbar.css'
import {Navbar, Nav, NavDropdown,Card} from 'react-bootstrap'
import { MdHome } from "react-icons/md"; 
import {FaUserAlt,FaDog} from "react-icons/fa";
import {MdChildFriendly, MdLocalHospital} from "react-icons/md";
import {FiChevronDown} from "react-icons/fi";
import logoW from '../../shared/images/logo-w.png';
import {history} from '../../shared/history/history';

class NavBar extends React.Component {

    constructor(props){
        super(props);

        if(!localStorage.getItem('token')){
            history.push('/login');
        }
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
                                    <Nav.Link onClick={ () => this.props.callBack('home')}  >
                                        <MdHome className="icon-adjust" />
                                        Home
                                    </Nav.Link>
                                </div>
                                <div className="border-nav" id="homeC" >
                                    <NavDropdown title="Alas" id="collasible-nav-dropdown">
                                        <NavDropdown.Item onClick={ () => this.props.callBack('hospital')}>
                                            <MdLocalHospital className="icon-adjust" />
                                            Hospitalar
                                        </NavDropdown.Item>

                                        <NavDropdown.Item onClick={ () => this.props.callBack('animal')}>
                                            <FaDog className="icon-adjust" />
                                            Animal
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={ () => this.props.callBack('crianca')}>
                                            <MdChildFriendly className="icon-adjust" />
                                            Crianças e PCD
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                                <div className="border-nav">
                                    <Nav.Link  >
                                        <FaUserAlt className="icon-adjust" />
                                        {this.props.state.user?.name}
                                        <FiChevronDown className="icon-adjust" style={{marginLeft: 5}} />
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

