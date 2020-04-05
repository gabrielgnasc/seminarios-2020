import React from 'react';
import NavBar from '../../components/navBar/navBar'
import {Nav} from 'react-bootstrap';
import HomeCard from './homeCard';
import Animal from './animal';
import CriancasPCD from './criancasPCD';
import Hospitalar from './hospitalar';
import {history} from '../../shared/history/history'
import './home.css';
import api from '../service';
import {MdSettings,MdHome,MdChildFriendly, MdLocalHospital} from 'react-icons/md';
import {FaDog} from "react-icons/fa";

class Home extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            home: true,
            hospital:false,
            animal: false,
            criancaPCD: false,
            user: null
        };
        this.getUser();
    }

    getUser(){
        const token = localStorage.getItem('token');
        const headers = {'Authorization': 'Bearer ' + token}
        api.get('/token/' + token ,  { headers }).then((res) =>{
            this.setState({user: res.data});
            if(res.data.error){
                history.push('/login');
            }
        })
    }

    onClickHome(){
        this.setState({
            home: true,
            hospital: false,
            animal: false,
            criancaPCD: false
        })  
    }
    onClickHospital(){
        this.setState({
            home: false,
            hospital: true,
            animal: false,
            criancaPCD: false
        })  
    }
    onClickAnimal(){
        this.setState({
            home: false,
            hospital: false,
            animal: true,
            criancaPCD: false
        })  
    }
    onClickCrianca(){
        this.setState({
            home: false,
            hospital: false,
            animal: false,
            criancaPCD: true
        })  
    }

    async pageReturn(value){
        if(value === 'home')
            this.onClickHome();

        if(value === 'hospital')
            this.onClickHospital();

        if(value === 'animal')
            this.onClickAnimal();

        if(value === 'crianca')
            this.onClickCrianca();
    }

    render(){
        return(
            <>
                <NavBar state={this.state} callBack={this.pageReturn.bind(this)} ></NavBar>
                <div className="container-fuid" style={{backgroundColor: '#F2F2F2', paddingTop: 60}} >
                    <div className="container" >
                        <div className="card-top-n teste" >
                            {this.state.user?.name}
                            <img className="perfil-img" src="data:image/png;base64,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" alt="QR Id" />
                            <button className="close config-btn" ><MdSettings/></button>
                            
                        </div>
                    </div>
                    <div className="container" >
                        <div className="bg-row-at">
                            <Nav justify variant="tabs" defaultActiveKey="link-3">
                                <Nav.Item>
                                    <Nav.Link eventKey="link-3" >Active</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="disabled" >
                                    Disabled
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </div>
                </div>
                                            {/* <div className="row bg-row-at">
                            <div className="col-md-3">
                                <Card className="border-l-s card-click" onClick={ () => this.onClickHome()} >
                                    <Card.Body>
                                    <h4>Meus Cards <MdHome className="icon-adjust-r" /></h4>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="col-md-3 ">
                                <Card className="border-l-i card-click" onClick={ () => this.onClickHospital()}  >
                                    <Card.Body>
                                    <h4>Hospitalar <MdLocalHospital className="icon-adjust-r" /></h4>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="col-md-3">
                                <Card className="border-l-w card-click" onClick={ () => this.onClickAnimal()}  >
                                    <Card.Body>
                                    <h4>Animal <FaDog className="icon-adjust-r" /></h4>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="col-md-3">
                                <Card className="border-l-d card-click" onClick={ () => this.onClickCrianca()}  >
                                    <Card.Body>
                                    <h4>Crianças e PCD <MdChildFriendly className="icon-adjust-r" /></h4>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div> */}
                <div className="container-fuid" style={{borderTop:'1px solid #c2c2c2', marginTop: '-1px'}} >
                    <div className="container">
                        <div>
                            
                            {  this.state.home ? <HomeCard user={this.state.user}/> : null}
                            {  this.state.hospital ? <Hospitalar user={this.state.user}/>: null}
                            {  this.state.animal ?  <Animal user={this.state.user}/>: null}
                            {  this.state.criancaPCD ?  <CriancasPCD user={this.state.user}/>: null}
                        </div>
                    </div>
                </div>
                <p style={{textAlign: 'center', marginTop:30}}> QR Id © 2020. Todos os direitos reservados</p>
            </>
        );
    }
}

export default Home;
