import React,{Component} from 'react';
import './terms.css';

class Terms extends Component{

    render(){
        return(
            <div className="container" >
                <div className="row line-w" >
                    <div className="col-md-10 offset-md-1">
                        <h3>
                            Termos QRCard
                        </h3>
                        <p>
                            &emsp;Ao clicar em concordar com os termos de utilização você concorda com os seguintes termos:
                        </p>
                        <p>
                            &emsp;A plataforma não tem fins lucrativos e não vai cobrar você pelos serviços, assim como você não exigirá
                            qualquer serviço além dos que já estão disponibilizados na mesma. 
                        </p>
                        <p>
                            &emsp;Você concorda que as informações inseridas no site serão de caráter público, afinal essa é finalidade
                            do site e que a plataforma e seu desenvolvedor não tem nenhuma responsabilidade com os dados inseridos 
                            na utilização do serviço.
                        </p>
                        <p>
                            &emsp;Você concorda que não utilizará a plataforma de forma ilícita ou contra as leis, sendo você o único
                            responsável por qualquer infração cometida na utilização indevida da mesma.
                        </p>
                        <p>
                            &emsp;Você concorda que os termos podem ser atualizados a qualquer momento, sendo você previamente avisado com uma semana
                            de antecedência por uma mensagem enviada no e-mail cadastrado ao criar uma conta.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

export default Terms