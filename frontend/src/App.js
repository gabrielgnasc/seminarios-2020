import React from 'react';
import Routes from './routes';
import Navbar from './components/navBar/navBar'

function App() {

    function logado(){
        if(localStorage.getItem('token')){
            return (
               <> 
                    <Navbar></Navbar>
                    <Routes></Routes> 
                </> 
                
            );
        }else{
            return <Routes></Routes>  
        }
    }

    return(
        <>
              {logado()}
        </>
    )  
} 


export default App;
