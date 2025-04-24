import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  LoginContainerStyled, 
  LoginWrapper, 
  LeftContainer, 
  RightContainer, 
  FormGroup, 
  StyledButton, 
  Title, 
  Subtitle, 
  Input, 
  TitleRightContainer,
  SearchResultList,
  SearchResultItem,
  ModalContainer,
  ModalContent,
  ModalButton
} from './ProveedoresStyles';

import toast, { Toaster } from 'react-hot-toast';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';

const Productos = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    condicion_iva: '',
    cuit: '',
    dni: '',
    direccion: '',
    ciudad: '',
    provincia: '',
    telefono: '',
    email: ''
  })

  const handleSearch = async () => {
    if (searchQuery.length >= 3) {
      try {
        const response = await axios.get(`http://localhost:3001/personas/buscar-proveedor?search=${searchQuery}`);
        setSearchResults(response.data.data);
        setModalIsOpen(true);
      } catch (error) {
        console.error('Error al buscar cliente:', error);
      }
    }
  };

  const handleResultClick = (client) => {
    setFormData({
      nombre: client.nombre,
      condicion_iva: client.condicion_iva,
      cuit: client.cuit,
      dni: client.dni,
      direccion: client.direccion,
      ciudad: client.ciudad,
      provincia: client.provincia,
      telefono: client.telefono,
      email: client.email
    });

    setSearchQuery('');
    setModalIsOpen(false);
  };

  

  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Solo permitir números en CUIT, DNI y Teléfono
    if (["cuit", "dni", "telefono"].includes(name) && !/^\d*$/.test(value)) {
      return;
    }
  
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  

  const handleSaveProduct = async () => {
    try {
      if (formData.id) {
        await axios.put(`http://localhost:3001/personas/actualizar-proveedor/${formData.id}`, formData);
        toast.success('Proveedor actualizado correctamente');
      } else {
        await axios.post('http://localhost:3001/personas/crear-proveedor', formData);
        toast.success('Proveedor creado correctamente');
      }
    } catch (error) {
      toast.error('Error al guardar proveedor');
      console.error(error);
    } finally {
      setFormData({
        nombre: '',
        condicion_iva: '',
        cuit: '',
        dni: '',
        direccion: '',
        ciudad: '',
        provincia: '',
        telefono: '',
        email: ''
      });
    }
  };

  const renderForm = () => {
    switch (selectedOption) {
      case 'new':
        return (
          <>
            <TitleRightContainer>
              <h2 >NUEVO PROVEEDOR</h2>
              <p>INSERTE LOS SIGUIENTES DATOS</p>
            </TitleRightContainer>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">NOMBRE</InputGroup.Text>
              <Form.Control
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">CONDICION IVA</InputGroup.Text>
              <Form.Select
                name="condicion_iva"
                value={formData.condicion_iva}
                onChange={handleInputChange}
                aria-label="Default select example"
              >
                <option value="">SELECCIONE UNA CATEGORIA</option>
                <option value="Responsable Inscripto">Responsable Inscripto</option>
                <option value="Monotributo">Monotributo</option>
                <option value="Consumidor Final">Consumidor Final</option>
              </Form.Select>
            </InputGroup>
            
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">CUIT</InputGroup.Text>
              <Form.Control
                name="cuit"
                value={formData.cuit}
                onChange={handleInputChange}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">DNI</InputGroup.Text>
              <Form.Control
                name="dni"
                value={formData.dni}
                onChange={handleInputChange}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>DIRECCION</InputGroup.Text>
              
              <Form.Control
                name="direccion"
                value={formData.direccion}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>CIUDAD</InputGroup.Text>
              
              <Form.Control
                name="ciudad"
                value={formData.ciudad}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>PROVINCIA</InputGroup.Text>
              
              <Form.Control
                name="provincia"
                value={formData.provincia}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>TELEFONO</InputGroup.Text>
              
              <Form.Control
                name="telefono"
                value={formData.telefono}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>EMAIL</InputGroup.Text>
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control
                name="email"
                value={formData.email}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={handleInputChange}
              />
            </InputGroup>
            <Button variant="success" style={{marginBottom: '10px'}} onClick={() => handleSaveProduct()}>CREAR PROVEEDOR</Button>{' '}
            <Button variant="danger" onClick={() => setFormData({ nombre: '',
                condicion_iva: '',
                cuit: '',
                dni: '',
                direccion: '',
                ciudad: '',
                provincia: '',
                telefono: '',
                email: ''})}>LIMPIAR DATOS
            </Button>{' '}
          </>
        );
      case 'edit':
        return (
          <>
            <TitleRightContainer>
              <h2>EDITAR PROVEEDOR</h2>
              <p>MODIFIQUE LOS DATOS DEL PROVEEDOR</p>
            </TitleRightContainer>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="BUSCAR POR NOMBRE"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)} 
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="success" onClick={handleSearch} id="button-addon2">
                BUSCAR
              </Button>
            </InputGroup>

            

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">NOMBRE</InputGroup.Text>
              <Form.Control
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">CONDICION IVA</InputGroup.Text>
              <Form.Select
                name="condicion_iva"
                value={formData.condicion_iva}
                onChange={handleInputChange}
                aria-label="Default select example"
              >
                <option value="">SELECCIONE UNA CATEGORIA</option>
                <option value="Responsable Inscripto">Responsable Inscripto</option>
                <option value="Monotributo">Monotributo</option>
                <option value="Consumidor Final">Consumidor Final</option>
              </Form.Select>
            </InputGroup>
            
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">CUIT</InputGroup.Text>
              <Form.Control
                name="cuit"
                value={formData.cuit}
                onChange={handleInputChange}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">DNI</InputGroup.Text>
              <Form.Control
                name="dni"
                value={formData.dni}
                onChange={handleInputChange}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>DIRECCION</InputGroup.Text>
              
              <Form.Control
                name="direccion"
                value={formData.direccion}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>CIUDAD</InputGroup.Text>
              
              <Form.Control
                name="ciudad"
                value={formData.ciudad}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>PROVINCIA</InputGroup.Text>
              
              <Form.Control
                name="provincia"
                value={formData.provincia}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>TELEFONO</InputGroup.Text>
              
              <Form.Control
                name="telefono"
                value={formData.telefono}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>EMAIL</InputGroup.Text>
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control
                name="email"
                value={formData.email}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={handleInputChange}
              />
            </InputGroup>
            <Button variant="success" style={{marginBottom: '10px'}} onClick={handleSaveProduct}>ACTUALIZAR PROVEEDOR</Button>{' '}
            <Button variant="danger" onClick={() => setFormData({ nombre: '',
                condicion_iva: '',
                cuit: '',
                dni: '',
                direccion: '',
                ciudad: '',
                provincia: '',
                telefono: '',
                email: ''})}>LIMPIAR DATOS
            </Button>{' '}
          </>
        );
      default:
        return null;

        
    }
  };

  return (
    <LoginContainerStyled>
      <LoginWrapper>
        <LeftContainer>
          <Title style={{color:'lightblue'}}>PROVEEDORES</Title>
          <Subtitle style={{color:'white'}}>SELECCIONE UNA OPCIÓN</Subtitle>
          <Button variant="success" rounded onClick={() => setSelectedOption('new')}>NUEVO PROVEEDOR</Button>{' '}
          <Button variant="warning" rounded onClick={() => setSelectedOption('edit')} >EDITAR PROVEEDOR</Button>{' '}
          
        </LeftContainer>
        <RightContainer show={!!selectedOption}>
          {renderForm()}
        </RightContainer>
      </LoginWrapper>
      <Toaster position="top-right" />

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <ModalContainer>
          <h3>Seleccionar Producto</h3>
          {searchResults.map((product, index) => (
            <div key={index} onDoubleClick={() => handleResultClick(product)}>
              {product.nombre}
            </div>
          ))}
          <ModalButton onClick={() => setModalIsOpen(false)}>Cerrar</ModalButton>
        </ModalContainer>
      </Modal>
    </LoginContainerStyled>
  );
};

export default Productos;
