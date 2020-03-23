import React from 'react';
import './homeCard.css';

class HomeCard extends React.Component{

    constructor(props){
        super(props)   
    }


    render(){
        return(
            <>
                <div style={{paddingTop:25, width: '100%'}} >
                    <h2  >Meus cards</h2> 
                </div>
                <hr></hr>
             
            </>
        );
    }
}

export default HomeCard;