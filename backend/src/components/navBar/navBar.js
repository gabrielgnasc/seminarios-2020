import React from 'react';
import './navbar.css'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { MdHome } from "react-icons/md"; 
import {FaUserAlt,FaDog, FaQrcode} from "react-icons/fa";
import {MdChildFriendly, MdLocalHospital, MdExitToApp} from "react-icons/md";
import logoW from '../../shared/images/logo-w.png';
import Configuracoes from '../../pages/configuracoes';
import { connect } from 'react-redux';
import toggleStateUser from '../../store/actions';

class NavBar extends React.Component {

    container = React.createRef();

    constructor(props){

        super(props);

        this.user = null;
        this.state = {
            expanded: false
        }
    }

    handleClick = () => {
        this.setState({expanded: !this.state.expanded});
    };

    handleClickOutside = event => {
        if (this.container.current && !this.container.current.contains(event.target)) {
            this.setState({
                expanded: false
            });
        }
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    componentDidUpdate(){
        console.log(this.props)
    }


    navegacao(){
        var qrMenu = "Criar QR";
        if(true){
            return(
                <div ref={this.container}>
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
                            <Nav.Link  href="/login" onClick={() => {localStorage.removeItem('token')}}>
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
                { this.props.isLogged &&
                    <Navbar bg="light" expand="lg" className="nav-color">
                        <Navbar.Brand href="/home">
                            <img src={logoW} style={{width: 40, marginLeft:25}} alt="Logo img" ></img>QR Id
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" style={{flexFlow: 'row-reverse'}}>
                        {this.navegacao()}
                        </Navbar.Collapse>
                    </Navbar> 
                }               
            </>
        );
    }   
}

export default connect(state => ({ user: state.user, isLogged: state.isLogged }) )(NavBar);

