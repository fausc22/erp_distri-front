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
} from './ClientesStyles';

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
        const response = await axios.get(`http://localhost:3001/personas/buscar-cliente?search=${searchQuery}`);
        setSearchResults(response.data.data);
        setModalIsOpen(true);
      } catch (error) {
        console.error('Error al buscar cliente:', error);
      }
    }
  };

  const handleResultClick = (client) => {
    setFormData({
      id: client.id,
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProduct = async () => {
    try {
      if (formData.id) {
        await axios.put(`http://localhost:3001/personas/actualizar-cliente/${formData.id}`, formData);
        toast.success('Cliente actualizado correctamente');
      } else {
        await axios.post('http://localhost:3001/personas/crear-cliente', formData);
        toast.success('Cliente creado correctamente');
      }
    } catch (error) {
      toast.error('Error al guardar cliente');
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
              <h2 >NUEVO CLIENTE</h2>
              <p>INSERTE LOS SIGUIENTES DATOS</p>
            </TitleRightContainer>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">NOMBRE</InputGroup.Text>
              <Form.Control
                name="nombre"
                value={formData.nombre}
                
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">CONDICION IVA</InputGroup.Text>
              <Form.Select
                name="condicion"
                value={formData.condicion_iva}
                
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
                
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">DNI</InputGroup.Text>
              <Form.Control
                name="dni"
                value={formData.dni}
                
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
                
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>CIUDAD</InputGroup.Text>
              
              <Form.Control
                name="ciudad"
                value={formData.ciudad}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>PROVINCIA</InputGroup.Text>
              
              <Form.Control
                name="provincia"
                value={formData.provincia}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>TELEFONO</InputGroup.Text>
              
              <Form.Control
                name="telefono"
                value={formData.telefono}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                
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
                
              />
            </InputGroup>
            <Button variant="success" onClick={() => handleSaveProduct()}>CREAR CLIENTE</Button>{' '}
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
              <h2>EDITAR CLIENTE</h2>
              <p>MODIFIQUE LOS DATOS DEL CLIENTE</p>
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
                
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">CONDICION IVA</InputGroup.Text>
              <Form.Select
                name="condicion"
                value={formData.condicion_iva}
                
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
                
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">DNI</InputGroup.Text>
              <Form.Control
                name="dni"
                value={formData.dni}
                
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
                
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>CIUDAD</InputGroup.Text>
              
              <Form.Control
                name="ciudad"
                value={formData.ciudad}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>PROVINCIA</InputGroup.Text>
              
              <Form.Control
                name="provincia"
                value={formData.provincia}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>TELEFONO</InputGroup.Text>
              
              <Form.Control
                name="telefono"
                value={formData.telefono}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                
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
                
              />
            </InputGroup>
            <Button variant="success" onClick={handleSaveProduct}>ACTUALIZAR CLIENTE</Button>{' '}
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
          <Title style={{color:'lightblue'}}>CLIENTES</Title>
          <Subtitle style={{color:'white'}}>SELECCIONE UNA OPCIÓN</Subtitle>
          <Button variant="success" rounded onClick={() => setSelectedOption('new')}>NUEVO CLIENTE</Button>{' '}
          <Button variant="warning" rounded onClick={() => setSelectedOption('edit')} >EDITAR CLIENTE</Button>{' '}
          
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
