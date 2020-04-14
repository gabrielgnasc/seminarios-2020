import React from 'react';
import Routes from './routes';
import Navbar from './components/navBar/navBar'

function App() {

    return(
        <>
            <Navbar></Navbar>
            <Routes></Routes> 
            <p style={{textAlign: 'center', marginTop:30,color:'#FFF' }}> QR Id © 2020. Todos os direitos reservados</p>
        </>
    )  
} 

export default App;
