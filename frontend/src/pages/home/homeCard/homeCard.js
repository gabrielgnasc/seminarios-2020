import React from 'react';
import './homeCard.css';

class HomeCard extends React.Component{

    constructor(props){
        super(props)   
    }

    render(){
        return(
            <>
                <div className="home-bg" >
                    <h2  >Meus cards</h2>
                    <hr></hr> 
                </div>
                
             
            </>
        );
    }
}

export default HomeCard;