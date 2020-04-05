import React  from 'react';
import './homeCard.css';
import QRCode from 'qrcode.react';
import { MdChildFriendly, MdLocalHospital } from "react-icons/md";
import { FaDog } from "react-icons/fa";


class HomeCard extends React.Component{

    createCard(){
        let card = []
    
        for (let i = 0; i < this.props?.user?.type?.length ; i++) {

            var url = "http://localhost:3000/" + this.props.user?.type[i].typeId; 
            card.push(
                <div className="col-md-6" key={this.props.user?.type[i].typeId}> 
                    <div className="meu-card left-to-right" >

                        <QRCode level={"H"} size={160} value={url}  id={this.props.user?.type[i].typeId} />

                        <div className="meu-card-body">

                            <h2 className="icon-ala" > 
                                {this.props?.user?.type[i]?.type === 'Crianças e PCD' ? <MdChildFriendly className="icon-adjust" /> : null }
                                {this.props?.user?.type[i]?.type === 'Animal' ? <FaDog className="icon-adjust" />  : null }  
                                {this.props?.user?.type[i]?.type === 'Hospitalar' ? <MdLocalHospital className="icon-adjust" /> : null  }     
                            </h2> 

                            <h4> 
                                {this.props?.user?.type[i]?.type === 'Crianças e PCD' ?  this.props.user?.type[i]?.nome : null }
                                {this.props?.user?.type[i]?.type === 'Animal' ? this.props.user?.type[i]?.nome : null }  
                                {this.props?.user?.type[i]?.type === 'Hospitalar' ? this.props.user?.type[i]?.nome : null  }    
                            </h4>
                
                        </div>
                        <div>
                            <a onClick={() => this.downloadQR(this.props.user?.type[i].typeId, this.props.user?.type[i].nome)}> D </a>
                        </div>
                    </div>
                </div>
            )
        }

        
        return card
    }

    downloadQR(id, nome){
        const canvas = document.getElementById(id);
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "QR-"+ nome.replace(" ", "_") + ".png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };


    render(){
        return(
            <>
                <div className="row">
                   
                    {this.createCard()}
                   
                </div>
               
                
             
            </>
        );
    }
}

export default HomeCard;