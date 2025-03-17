import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BlueNavbar() {
  return (
    <>
      
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/inicio">DISTRIBUIDORA VERTIMAR</Navbar.Brand>
          <Nav className="me-auto">

          <NavDropdown title="VENTAS" id="basic-nav-dropdown">

              <NavDropdown.Item href="/registrar-venta">Registrar Venta</NavDropdown.Item>
              
              <NavDropdown.Item href="/lista-precios">Generar Lista de Precios</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="/historial-ventas">Historial de Ventas</NavDropdown.Item>
              

                
          </NavDropdown>


          <NavDropdown title="COMPRAS" id="basic-nav-dropdown">

              <NavDropdown.Item href="#action/3.1">Registrar Compra</NavDropdown.Item>

              <NavDropdown.Item href="#action/3.1">Registrar Gasto</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Historial de Compras</NavDropdown.Item>
              

                
          </NavDropdown>

            <NavDropdown title="INVENTARIO" id="basic-nav-dropdown">

              <NavDropdown.Item href="/productos">Productos</NavDropdown.Item>

              <NavDropdown.Item href="/consulta-stock">Consulta de STOCK</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="/historial-remito">Historial de Pedidos / Remitos</NavDropdown.Item>
              
              
                
            </NavDropdown>

            <NavDropdown title="FINANZAS" id="basic-nav-dropdown">

              <NavDropdown.Item href="#action/3.1">Fondos</NavDropdown.Item>

              <NavDropdown.Item href="#action/3.2">Historial de Ingresos</NavDropdown.Item>

              <NavDropdown.Item href="#action/3.3">Historial de Egresos</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="/listaPrecios">Generar Reportes Financieros</NavDropdown.Item>
              
                
            </NavDropdown>

            <NavDropdown title="EMPRESA" id="basic-nav-dropdown">

              <NavDropdown.Item href="#action/3.1">Pago de Sueldos</NavDropdown.Item>

              <NavDropdown.Item href="#action/3.2">Desempeños</NavDropdown.Item>

              

              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Administracion</NavDropdown.Item>
              
                
            </NavDropdown>

            <NavDropdown title="PERSONAS" id="basic-nav-dropdown">

              <NavDropdown.Item href="/editar-clientes">Clientes</NavDropdown.Item>

              <NavDropdown.Item href="/editar-proveedores">Proveedores</NavDropdown.Item>

              <NavDropdown.Item href="/editar-personal">Personal</NavDropdown.Item>

              
              
                
            </NavDropdown>

          </Nav>
        </Container>
      </Navbar>
      
    </>
  );
}

export default BlueNavbar;