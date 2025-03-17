// ListaPrecios.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContainerStyled, LoginWrapper, StyledButton, Title } from './ListaPreciosStyles'; // Modificamos las importaciones
import toast, { Toaster } from 'react-hot-toast';

const ListaPrecios = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes realizar la lógica de autenticación si es necesario
    // Por ejemplo, validar credenciales

    // Después de la autenticación exitosa, navegar a la ruta "/inicio"
    navigate('/inicio');
  };

  return (
    <LoginContainerStyled>
      <LoginWrapper>
        <div style={{ backgroundColor: '#007bff', color: 'white', padding: '60px 40px', textAlign: 'center' }}>
          <Title>HOLA</Title>
        </div>
      </LoginWrapper>
      <Toaster />
    </LoginContainerStyled>
  );
};

export default ListaPrecios;
