import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContainerStyled, LoginWrapper, LeftContainer, RightContainer, FormGroup, StyledButton, Title, Subtitle, Input, RightImage, TitleRightContainer } from './LoginStyles';
import imgLogin from '../../assets/img/login-img/bg-blue.jpg';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
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
        <LeftContainer>
          <Title>INICIAR SESION</Title>
          <Subtitle>Bienvenido! Por favor, inicie sesión para continuar.</Subtitle>
          <FormGroup>
            <label htmlFor="username">Usuario</label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Contraseña</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
            />
          </FormGroup>
          <StyledButton onClick={handleLogin}>Login</StyledButton>
        </LeftContainer>
        <RightContainer>
          <TitleRightContainer>
            <h3>Bienvenido!</h3>
            <h2>DISTRIBUIDORA VERTIMAR SRL</h2>
          </TitleRightContainer>
          <RightImage src={imgLogin} alt=''/>
        </RightContainer>
      </LoginWrapper>
      <Toaster/>
    </LoginContainerStyled>
  );
};

export default Login;
