import React,{Component} from 'react';
import './info.css';

class Info extends Component{

    render(){
        return(
            <div className="container" >
                <div className="row line-w" >
                    <div className="col-md-10 offset-md-1">
                        <h3>
                            QRCard
                        </h3>
                        <p>
                            &emsp;Qr card é uma plataforma de cadastro de informações destinada à aqueles que precisam de atenção e cuidados especiais, que podem
                            não saber se localizar e informar a respeito de seu responsável.
                        </p>
                        <p>
                            &emsp;A plataforma funciona de forma simples, você seleciona quem deseja manter em segurança e preenche uma pequena ficha cadastral,
                            após preenche-la, um QRCode é gerado e você pode imprimi-lo, grava-lo em uma pulseira, colar ou até mesmo fabricar uma camiseta, assim 
                            qualquer pessoa que o encontrar, saberá direciona-lo de volta para sua casa, te ligar ou enviar um e-mail para lhe informar 
                            a respeito de seu paradeiro.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

export default Info