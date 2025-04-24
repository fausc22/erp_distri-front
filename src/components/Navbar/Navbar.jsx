import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from "react-bootstrap/Button";

function BlueNavbar() {
  const getUserRole = () => {
    return localStorage.getItem("role"); // Retorna el rol almacenado
  };

  const role = getUserRole(); // Obtiene el rol del usuario
  

  const handleLogout = () => {
    localStorage.removeItem("role"); // Elimina el rol del usuario
    localStorage.removeItem("token"); // Elimina el token de autenticación (si existe)
    window.location.href = "/"; // Redirige a la página de inicio de sesión
  };



  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/inicio">DISTRIBUIDORA VERTIMAR</Navbar.Brand>
          <Nav className="me-auto">
            
            {/* VENTAS - Visible para GERENTE y VENDEDOR */}
            {(role === "GERENTE" || role === "VENDEDOR") && (
              <NavDropdown title="VENTAS" id="basic-nav-dropdown">
                <NavDropdown.Item href="/registrar-venta">Registrar Venta</NavDropdown.Item>
                <NavDropdown.Item href="/lista-precios">Generar Lista de Precios</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/historial-ventas">Historial de Ventas</NavDropdown.Item>
              </NavDropdown>
            )}

            {/* INVENTARIO - Visible para GERENTE y VENDEDOR */}
            {(role === "GERENTE" || role === "VENDEDOR") && (
              <NavDropdown title="INVENTARIO" id="basic-nav-dropdown">
                <NavDropdown.Item href="/productos">Productos</NavDropdown.Item>
                <NavDropdown.Item href="/consulta-stock">Consulta de STOCK</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/historial-remito">Historial de Pedidos / Remitos</NavDropdown.Item>
              </NavDropdown>
            )}

            {/* COMPRAS - Visible solo para GERENTE */}
            {role === "GERENTE" && (
              <NavDropdown title="COMPRAS" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Registrar Compra</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1">Registrar Gasto</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Historial de Compras</NavDropdown.Item>
              </NavDropdown>
            )}

            {/* FINANZAS - Visible solo para GERENTE */}
            {role === "GERENTE" && (
              <NavDropdown title="FINANZAS" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Fondos</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Historial de Ingresos</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Historial de Egresos</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/listaPrecios">Generar Reportes Financieros</NavDropdown.Item>
              </NavDropdown>
            )}

            {/* EMPRESA - Visible solo para GERENTE */}
            {role === "GERENTE" && (
              <NavDropdown title="EMPRESA" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Pago de Sueldos</NavDropdown.Item>
                
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Administración</NavDropdown.Item>
              </NavDropdown>
            )}

            {/* PERSONAS - Visible solo para GERENTE */}
            {role === "GERENTE" && (
              <NavDropdown title="PERSONAS" id="basic-nav-dropdown">
                <NavDropdown.Item href="/editar-clientes">Clientes</NavDropdown.Item>
                <NavDropdown.Item href="/editar-proveedores">Proveedores</NavDropdown.Item>
                <NavDropdown.Item href="/editar-personal">Personal</NavDropdown.Item>
              </NavDropdown>
            )}

          </Nav>

          {/* Botón "Cerrar Sesión" alineado a la derecha */}
          <Nav className="ms-auto">
            <Button variant="outline-danger" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default BlueNavbar;
