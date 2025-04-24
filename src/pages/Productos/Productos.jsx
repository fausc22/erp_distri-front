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
} from './ProductosStyles';

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
    unidad_medida: '',
    costo: '',
    precio: '',
    categoria_id: '',
    iva: '',
    stock_actual: ''
  })

  const handleSearch = async () => {
    if (searchQuery.length >= 3) {
      try {
        const response = await axios.get(`http://localhost:3001/productos/buscar-producto?search=${searchQuery}`);
        setSearchResults(response.data.data);
        setModalIsOpen(true);
      } catch (error) {
        console.error('Error al buscar productos:', error);
      }
    }
  };

  const handleResultClick = (product) => {
    setFormData({
      id: product.id,  // Asegurar que el ID se incluya en la edición
      nombre: product.nombre,
      unidad_medida: product.unidad_medida,
      costo: product.costo,
      precio: product.precio,
      categoria_id: product.categoria_id,
      iva: product.iva,
      stock_actual: product.stock_actual
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
        await axios.put(`http://localhost:3001/productos/actualizar-producto/${formData.id}`, formData);
        toast.success('Producto actualizado correctamente');
      } else {
        await axios.post('http://localhost:3001/productos/crear-producto', formData);
        toast.success('Producto agregado correctamente');
      }
    } catch (error) {
      toast.error('Error al guardar producto');
      console.error(error);
    } finally {
      setFormData({
        nombre: '',
        unidad_medida: '',
        costo: '',
        precio: '',
        categoria_id: '',
        iva: '',
        stock_actual: ''
      });
    }
  };

  const renderForm = () => {
    switch (selectedOption) {
      case 'new':
        return (
          <>
            <TitleRightContainer>
              <h2 >NUEVO PRODUCTO</h2>
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
              <InputGroup.Text id="inputGroup-sizing-default">CATEGORIA</InputGroup.Text>
              <Form.Control
                name="Categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <br />
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">UNIDAD MEDIDA</InputGroup.Text>
              <Form.Select
                name="unidad_medida"
                value={formData.unidad_medida}
                onChange={handleInputChange}
                              
                aria-label="Default select example"
              >
                  <option value=""></option>
                  <option value="UNIDADES">UNIDADES</option>
                  <option value="LITROS">LITROS</option>
                              
              </Form.Select>
              
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>PRECIO COSTO</InputGroup.Text>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                name="costo"
                value={formData.costo}
                onChange={handleInputChange}
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>PRECIO VENTA</InputGroup.Text>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>IVA</InputGroup.Text>
              <InputGroup.Text>%</InputGroup.Text>
              <Form.Control
                name="iva"
                value={formData.iva}
                onChange={handleInputChange}
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">STOCK</InputGroup.Text>
              <Form.Control
                name="stock"
                value={formData.stock_actual}
                onChange={handleInputChange}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <Button variant="success" onClick={() => handleSaveProduct()}>CREAR PRODUCTO</Button>{' '}
            <Button variant="danger" onClick={() => setFormData({ nombre: '',
              unidad_medida: '',
              costo: '',
              precio: '',
              categoria_id: '',
              iva: '',
              stock_actual: ''})}>LIMPIAR DATOS
            </Button>{' '}
          </>
        );
      case 'edit':
        return (
          <>
            <TitleRightContainer>
              <h2>EDITAR PRODUCTO</h2>
              <p>MODIFIQUE LOS DATOS DEL PRODUCTO</p>
            </TitleRightContainer>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="BUSCAR POR NOMBRE O CATEGORIA"
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
              <InputGroup.Text id="inputGroup-sizing-default">CATEGORIA</InputGroup.Text>
              <Form.Control
                name="Categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <br />
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">UNIDAD MEDIDA</InputGroup.Text>
              <Form.Select
                name="unidad_medida"
                value={formData.unidad_medida}
                onChange={handleInputChange}
                              
                aria-label="Default select example"
              >
                  <option value=""></option>
                  <option value="UNIDADES">UNIDADES</option>
                  <option value="LITROS">LITROS</option>
                              
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>PRECIO COSTO</InputGroup.Text>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                name="costo"
                value={formData.costo}
                onChange={handleInputChange}
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>PRECIO VENTA</InputGroup.Text>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>IVA</InputGroup.Text>
              <InputGroup.Text>%</InputGroup.Text>
              <Form.Control
                name="iva"
                value={formData.iva}
                onChange={handleInputChange}
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">STOCK</InputGroup.Text>
              <Form.Control
                type="number"
                name="stock_actual"
                value={formData.stock_actual}
                onChange={handleInputChange}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                min="0"
              />
            </InputGroup>
            <Button variant="success" onClick={handleSaveProduct}>ACTUALIZAR PRODUCTO</Button>{' '}
            <Button variant="danger" onClick={() => setFormData({ nombre: '',
              unidad_medida: '',
              costo: '',
              precio: '',
              categoria_id: '',
              iva: '',
              stock_actual: ''})}>LIMPIAR DATOS
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
          <Title style={{color:'lightblue'}}>PRODUCTOS</Title>
          <Subtitle style={{color:'white'}}>SELECCIONE UNA OPCIÓN</Subtitle>
          <Button variant="success" rounded onClick={() => setSelectedOption('new')}>NUEVO PRODUCTO</Button>{' '}
          <Button variant="warning" rounded onClick={() => setSelectedOption('edit')} >EDITAR PRODUCTO</Button>{' '}
          
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
