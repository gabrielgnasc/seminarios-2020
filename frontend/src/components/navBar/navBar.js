import React from 'react';
import './navbar.css'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { MdHome } from "react-icons/md"; 
import {FaUserAlt,FaDog, FaQrcode} from "react-icons/fa";
import {MdChildFriendly, MdLocalHospital, MdExitToApp} from "react-icons/md";
import logoW from '../../shared/images/logo-w.png';
import Configuracoes from '../../pages/configuracoes';

class NavBar extends React.Component {

    constructor(props){
        super(props);

        this.user = null;

        this.state = {
            expanded: false
        }
      
    }

    handleClick = () => {
        this.setState({expanded: !this.state.expanded});
        console.log(this.state.expanded)
    };


    navegacao(){
        var qrMenu = "Criar QR";
        if(true){
            return(
                <div >
                    <Nav className="mr-auto">
                        <div className="border-nav" id="homeC" >
                            <Nav.Link href="/home"  >
                                <MdHome className="icon-adjust" />
                                Home
                            </Nav.Link>
                        </div>
                        <div className="border-nav" id="homeC" >

                            <NavDropdown title={<> <FaQrcode className="icon-adjust"></FaQrcode> {qrMenu} </> } id="collasible-nav-dropdown">

                                <NavDropdown.Item href="/home/hospitalar/create" >    
                                        <MdLocalHospital className="icon-adjust" />
                                        Hospitalar
                                </NavDropdown.Item>

                                <NavDropdown.Item  href="/home/animais/create">
                                        <FaDog className="icon-adjust" />
                                        Animal
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/home/criancas-e-especiais/create">
                                        <MdChildFriendly className="icon-adjust" />
                                        Crianças e especiais
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                        <div className="border-nav">
                            <Nav.Link onClick={this.handleClick} >
                                <FaUserAlt className="icon-adjust" />
                                Perfil
                                {/* <FiChevronDown className="icon-adjust" style={{marginLeft: 5}} /> */}
                            </Nav.Link>
                            
                        </div>

                        <div className="border-nav">
                            <Nav.Link  href="/login" onBlur={() => {localStorage.removeItem('token')}}>
                                <MdExitToApp className="icon-adjust" />
                                Sair 
                            </Nav.Link>

                        </div>
                    </Nav>
                    <div className="config-div"  >
                        { this.state.expanded && <Configuracoes></Configuracoes>}
                    </div>
                </div>
            );
        }
        else{
            return(<></>)
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
                       {this.navegacao()}
                    </Navbar.Collapse>
                </Navbar>                
            </>
        );
    }   
}

export default NavBar;

