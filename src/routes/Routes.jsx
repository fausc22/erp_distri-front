// routes.jsx
import React from 'react';
import { Routes as ReactDomRoutes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import BlueNavbar from '../components/Navbar/Navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout/Layout.jsx';
import Productos from '../pages/Productos/Productos.jsx';
import RegistrarVenta from '../pages/Ventas/RegistrarVenta.jsx';
import ListaPrecios from '../pages/Ventas/ListaPrecios.jsx';
import HistorialVentas from '../pages/Ventas/Historial.jsx';
import Clientes from '../pages/Personas/Clientes.jsx';
import Empleados from '../pages/Personas/Personal.jsx';
import Proveedores from '../pages/Personas/Proveedores.jsx';
import HistorialRemito from '../pages/Productos/HistorialRemito.jsx';
// import CompraProveedores from '../pages/Compras/CompraProveedores.jsx';
// import HistorialGastos from '../pages/Compras/HistorialGastos.jsx';
// import Gastos from '../pages/Compras/Gastos.jsx';


const Routes = ({}) => {
  return (
    <ReactDomRoutes>

      //RUTAS LOGIN
      <Route path="/" element={<Login/> } />

      //RUTAS INICIO
      <Route path="/inicio" element={<Layout> <Home/> </Layout>  }/>

      //RUTAS VENTAS
      <Route path="/registrar-venta" element={<Layout> <RegistrarVenta/> </Layout>  }/>
      <Route path="/lista-precios" element={<Layout> <ListaPrecios/> </Layout>  }/>
      <Route path="/historial-ventas" element={<Layout> <HistorialVentas/> </Layout>  }/>


      //RUTAS COMPRAS 
      {/* <Route path="/compra-proveedores" element={<Layout> <CompraProveedores/> </Layout>  }/>
      <Route path="/historial-gastos" element={<Layout> <HistorialGastos/> </Layout>  }/>
      <Route path="/gastos" element={<Layout> <Gastos/> </Layout>  }/> */}

      //RUTAS INVENTARIO
      <Route path="/productos" element={<Layout> <Productos/> </Layout>  }/>
      <Route path="/historial-remito" element={<Layout> <HistorialRemito/> </Layout>  }/>

      

      //RUTAS PERSONAL
      <Route path="/editar-clientes" element={<Layout> <Clientes/> </Layout>  }/>
      <Route path="/editar-personal" element={<Layout> <Empleados/> </Layout>  }/>
      <Route path="/editar-proveedores" element={<Layout> <Proveedores/> </Layout>  }/>

    </ReactDomRoutes>
  );
}

export default Routes;
