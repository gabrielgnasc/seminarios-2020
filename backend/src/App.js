import React from 'react';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './store';

function App() {
    return(
        <Provider store={store}>
            
            <Routes ></Routes> 
            <p style={{textAlign: 'center', marginTop:30,color:'#FFF' }}> QR Id © 2020. Todos os direitos reservados</p>
        </Provider>
    )  
} 

export default App;
