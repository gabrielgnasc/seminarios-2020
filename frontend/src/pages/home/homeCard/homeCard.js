import React from 'react';
import './homeCard.css';
import * as img from '../../../shared/images/qrw.png';

class HomeCard extends React.Component{

    constructor(props){
        super(props)   
    }

    createcard(){
        let card = []
    
        for (let i = 0; i < this.props?.user?.type?.length ; i++) {
            card.push(
                <div className="meu-card" key={this.props.user?.type[i].typeId}>
                    <img className="meu-card-img" src={img} alt="qr" />
                    <div className="meu-card-body">
                        <h4>Ala:  <span>{this.props.user?.type[i]?.type}</span></h4>

                        <h4> 
                            {this.props?.user?.type[i]?.type === 'Crianças e PCD' ? 'Nome: ' + this.props.user?.type[i]?.nome : null }
                            {this.props?.user?.type[i]?.type === 'Animal' ? 'Nome: ' + this.props.user?.type[i]?.nomeAnimal : null }  
                            {this.props?.user?.type[i]?.type === 'Hospitalar' ? 'Nome: ' + this.props.user?.type[i]?.nome : null  }     
                        </h4>
                        <h4> Telefone: <span>{this.props.user?.type[0]?.telefone}</span>  </h4>

                    </div>
                </div>
            )
        }
        return card
    }


    render(){
        return(
            <>
                <div className="row">
                    <div className="col-md-6"> 
                        {this.createcard()}
                    </div>
                </div>
               
                
             
            </>
        );
    }
}

export default HomeCard;