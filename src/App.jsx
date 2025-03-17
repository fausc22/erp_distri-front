import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Routes from './routes/Routes.jsx';
import BlueNavbar from './components/Navbar/Navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";


const App = () => {
  

  return (
    
    <Router>
      <Routes />
    </Router>
  );
};


export default App;
