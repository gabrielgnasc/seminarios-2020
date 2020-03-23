import React from 'react';
import NavBar from '../../components/navBar/navBar'
import HomeCard from './homeCard';
import './home.css';

class Home extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            home: true,
            hospital:false,
            animal: false,
            criancaPCD: false,
        };
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
                <div className="container" >
                    {  this.state.home ? <HomeCard/> : null}
                    {  this.state.hospital ? <h1>hospital</h1>: null}
                    {  this.state.animal ?  <h1>animal</h1>: null}
                    {  this.state.criancaPCD ?  <h1>criancaPCD</h1>: null}
                </div>
            </>
        );
    }
}

export default Home;