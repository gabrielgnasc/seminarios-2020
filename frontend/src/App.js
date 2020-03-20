import React from 'react';
import Login from  './pages/login';
import './App.css'
import BarraLateral from './components/BarraLateral';

function App() {
  var screenWidth = window.innerWidth;

  return (
    <div className="App-header">
      <BarraLateral></BarraLateral>
      <Login></Login>
    </div>
  );
}

export default App;
