import React  from 'react';
import './homeCard.css';
import QRCode from 'qrcode.react';
import { MdChildFriendly, MdLocalHospital, MdEdit, MdFileDownload } from "react-icons/md";
import { FaDog,FaTrash } from "react-icons/fa";
import {history} from '../../../shared/history/history';
import api from '../../service';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class HomeCard extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            user :  null,
            modal: false
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

    updateUser(){
       
        let user = this.state.user;
        
        const token = localStorage.getItem('token');
        const headers = {'Authorization': 'Bearer ' + token}

        api.post('/updateUser',{user: user} ,{ headers }).then((res) =>{
            alert('Card excluído')
        },(error) => {
            alert(error)
        })
    }

    createCard(){
        let card = []
        for (let i = 0; i < this.state?.user?.type?.length ; i++) {

            var url = "http://192.168.0.29:3000/view/" + this.state?.user.type[i].typeId; 

            card.push(
                <div className="col-md-6" key={this.state?.user.type[i].typeId}> 
                    <div className="meu-card" >

                        <QRCode level={"H"} size={160} value={url} fgColor="#292929" className="qr-code"  id={this.state?.user?.type[i].typeId} />

                        <div className="meu-card-body">
                            <div className="div-prin">
                                <h2 className="icon-ala" > 
                                    {this.state?.user?.type[i]?.type === 'crianças e especiais' ? <MdChildFriendly className="icon-adjust-home" /> : null }
                                    {this.state?.user?.type[i]?.type === 'animais' ? <FaDog className="icon-adjust-home" />  : null }  
                                    {this.state?.user?.type[i]?.type === 'hospitalar' ? <MdLocalHospital className="icon-adjust-home" /> : null  }     
                                </h2> 

                                <h4 style={{marginLeft:9, overflowWrap:"break-word"}}> 
                                    {this.state?.user?.type[i]?.type === 'crianças e especiais' ?  this.state?.user?.type[i]?.nome.split(" ")[0] : null }
                                    {this.state?.user?.type[i]?.type === 'animais' ? this.state?.user?.type[i]?.nome.split(" ")[0] : null }  
                                    {this.state?.user?.type[i]?.type === 'hospitalar' ? this.state?.user?.type[i]?.nome.split(" ")[0] : null  }    
                                </h4>
                            </div>
                            <div className="div-resumo" >
                                {this.gerarResumo(i)}
                            </div>
                        </div>
                        
                        <div>
                            {this.Configuracao(this.state?.user?.type[i]?.typeId, i)}
                        </div>
                    </div>
                </div>
            )
        }

        return card
    }

    Configuracao(id, index){

        var url1 = this.state?.user.type[index].type.replace("crianças e especiais","criancas-e-especiais");
        var url2 = this.state?.user.type[index].typeId;

        return (
            <div className="config-card top-to-down" id={id} >
                <button type="button" onClick={ ()=> {history.push('/home/'+url1 + '/' + url2 );} } >
                    <MdEdit></MdEdit>
                </button>
               
                <button type="button" onClick={() =>{ this.setState({modal: true})}} ><FaTrash></FaTrash></button>
               
                <button type="button" onClick={() => this.downloadQR(this.state?.user?.type[index].typeId, this.state?.user?.type[index].nome)}>
                    <MdFileDownload></MdFileDownload>
                </button>

                <Dialog
                    open={this.state.modal}
                    onClose={() =>{ this.setState({modal: false})}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">

                    <DialogTitle id="alert-dialog-title">{"Apagar card"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Você está prestes a apagar este card, deseja continuar?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={ () =>{
                            this.setState({modal: false})
                        }} color="primary" autoFocus>
                            cancelar
                        </Button>

                        <Button onClick={
                            () => {
                                this.setState(state =>{
                                    var types = state.user.type;
                                    types = types.pop(index)
                                    return ({type: types, modal: false })
                                });
                                this.updateUser();
                            }
                        } color="primary" >
                            continuar 
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }

    gerarResumo(i){
        const dados = this.state?.user.type[i];
        var labels = [];

        if(dados !== null){
        Object.keys(dados).forEach(function(item){
            if(dados[item]){
                
                labels.push(

                    <div className="col-12" key={item} >
                        <p style={{display:"block"}}> 
                            { 
                                item.split(/(?=[A-ZÀ-Ú])/).join(" ")
                                    .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) 
                            }:
                        </p>
                        <p style={{display:"block"}}>
                            {dados[item]}
                        </p>
                    </div>
                );
            }
        });
        }


        return ( <div className="row"> {labels} </div>)
    }


    downloadQR(id, nome){
        const canvas = document.getElementById(id);
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "QR-"+ nome.trim().replace(" ", "_") + ".png";
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