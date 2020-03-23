import React from 'react';
import './navbar.css'
import {Navbar, Nav} from 'react-bootstrap'
import {MdLocalHospital, MdHome, MdChildFriendly} from "react-icons/md"; 
import {FaDog} from "react-icons/fa";
import {FiChevronDown} from "react-icons/fi";

class NavBar extends React.Component {

    constructor(props){
        super(props);
        console.log(props);
    }

    render(){
        console.log(this.props)
        return(
            <>
            <Navbar bg="light" expand="lg" className="nav-color">
                    <Navbar.Brand href="/home">
                        <p className="text-qrid" >QR Id</p>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse style={{flexFlow: 'row-reverse'}} id="responsive-navbar-nav">
                        <div >
                            <Nav className="mr-auto">
                                <div className="border-nav" id="homeC" >
                                    <Nav.Link onClick={ () => this.props.callBack('home')}  >
                                        <MdHome className="icon-adjust" />
                                        Home
                                    </Nav.Link>
                                </div>
                                <div className="border-r-nav">
                                    <Nav.Link onClick={ () => this.props.callBack('hospital')}>
                                        <MdLocalHospital className="icon-adjust" />
                                        Hospitalar
                                    </Nav.Link>
                                </div>
                                <div className="border-r-nav">
                                    <Nav.Link onClick={ () => this.props.callBack('animal')}>
                                        <FaDog className="icon-adjust" />
                                        Animal
                                    </Nav.Link>
                                </div>
                                <div className="border-r-nav">
                                    <Nav.Link onClick={ () => this.props.callBack('crianca')}>
                                        <MdChildFriendly className="icon-adjust" />
                                        Crianças e PCD
                                    </Nav.Link>
                                </div>
                                <div className="border-b-nav">
                                    <Nav.Link  >
                                        Perfil
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