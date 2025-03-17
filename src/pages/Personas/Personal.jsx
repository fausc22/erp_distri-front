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
  SearchResultItem
} from './PersonalStyles';
import imgLogin from '../../assets/img/login-img/bg-blue.jpg';
import Toaster from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const Productos = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    precio_costo: '',
    precio_venta: '',
    cantidad: ''
  });

  const handleSearch = async () => {
    if (searchQuery.length >= 3) {
      try {
        const response = await axios.get(`http://localhost:3001/productos?query=${searchQuery}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error al buscar productos:', error);
      }
    }
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (value.length >= 3) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (product) => {
    setFormData({
      nombre: product.nombre,
      categoria: product.categoria,
      precio_costo: product.precio_costo,
      precio_venta: product.precio_venta,
      cantidad: product.cantidad
    });
    setSearchResults([]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
            <Form.Select
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              aria-label="Default select example"
            >
              <option value="">SELECCIONE UNA CATEGORIA</option>
              <option value="ALIMENTOS">ALIMENTOS</option>
              <option value="LIMPIEZA">LIMPIEZA</option>
              <option value="LIQUIDOS">LIQUIDOS</option>
            </Form.Select>
            <br />
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">UNIDAD MEDIDA</InputGroup.Text>
              <Form.Control
                name="cantidad"
                value={formData.cantidad}
                onChange={handleInputChange}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>PRECIO COSTO</InputGroup.Text>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                name="precio_costo"
                value={formData.precio_costo}
                onChange={handleInputChange}
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>PRECIO VENTA</InputGroup.Text>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                name="precio_venta"
                value={formData.precio_venta}
                onChange={handleInputChange}
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>IVA</InputGroup.Text>
              <InputGroup.Text>%</InputGroup.Text>
              <Form.Control
                name="precio_costo"
                value={formData.precio_costo}
                onChange={handleInputChange}
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">STOCK</InputGroup.Text>
              <Form.Control
                name="cantidad"
                value={formData.cantidad}
                onChange={handleInputChange}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <Button variant="success" onClick={() => handleCreateOrUpdateProduct('create')}>CREAR PRODUCTO</Button>{' '}
            <Button variant="danger" onClick={() => setFormData({ nombre: '', categoria: '', precio_costo: '', precio_venta: '', cantidad: '' })}>LIMPIAR DATOS</Button>{' '}
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
                onChange={handleSearchInputChange}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="success" onClick={handleSearch} id="button-addon2">
                BUSCAR
              </Button>
            </InputGroup>

            {searchResults.length > 0 && (
              <SearchResultList>
                {searchResults.map((product) => (
                  <SearchResultItem key={product.ID} onClick={() => handleResultClick(product)}>
                    {product.nombre} - {product.categoria}
                  </SearchResultItem>
                ))}
              </SearchResultList>
            )}

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
            <Form.Select
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              aria-label="Default select example"
            >
              <option value="">SELECCIONE UNA CATEGORIA</option>
              <option value="ALIMENTOS">ALIMENTOS</option>
              <option value="LIMPIEZA">LIMPIEZA</option>
              <option value="LIQUIDOS">LIQUIDOS</option>
            </Form.Select>
            <br />
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">UNIDAD MEDIDA</InputGroup.Text>
              <Form.Control
                name="cantidad"
                value={formData.cantidad}
                onChange={handleInputChange}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>PRECIO COSTO</InputGroup.Text>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                name="precio_costo"
                value={formData.precio_costo}
                onChange={handleInputChange}
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>PRECIO VENTA</InputGroup.Text>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                name="precio_venta"
                value={formData.precio_venta}
                onChange={handleInputChange}
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>IVA</InputGroup.Text>
              <InputGroup.Text>%</InputGroup.Text>
              <Form.Control
                name="precio_costo"
                value={formData.precio_costo}
                onChange={handleInputChange}
                aria-label="Dollar amount (with dot and two decimal places)"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">STOCK</InputGroup.Text>
              <Form.Control
                name="cantidad"
                value={formData.cantidad}
                onChange={handleInputChange}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <Button variant="success" onClick={() => handleCreateOrUpdateProduct('update')}>ACTUALIZAR PRODUCTO</Button>{' '}
            <Button variant="danger" onClick={() => setFormData({ nombre: '', categoria: '', precio_costo: '', precio_venta: '', cantidad: '' })}>LIMPIAR DATOS</Button>{' '}
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
      <Toaster />
    </LoginContainerStyled>
  );
};

export default Productos;
