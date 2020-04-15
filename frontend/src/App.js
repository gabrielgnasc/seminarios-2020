import React,{useState} from 'react';
import Routes from './routes';
import Navbar from './components/navBar/navBar'

function App() {

    var contemToken ;
    localStorage.getItem('token') ? contemToken = true: contemToken = false;

    const [logado, setLogado] = useState(contemToken);

    function navBarExiste(){
        if(logado){
            return(
                <Navbar logado={logado} setLogado={setLogado} ></Navbar>
            );
        }
        else{
            return(
                <></>
            )
        }
    }
    
    
    return(
        <>
            {navBarExiste()}
            <Routes logado={logado} setLogado={setLogado} ></Routes> 
            <p style={{textAlign: 'center', marginTop:30,color:'#FFF' }}> QR Id © 2020. Todos os direitos reservados</p>
        </>
    )  
} 

export default App;
