import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContainerStyled, LoginWrapper, StyledButton, Title } from './ListaPreciosStyles'; // Modificamos las importaciones
import toast, { Toaster } from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import useAuth from '../../components/useAuth'

const ListaPrecios = () => {
  useEffect(() => {
    document.title = 'VERTIMAR | LISTA DE PRECIOS';
  });
  useAuth(); // Bloquea si no hay token

  return (
    <LoginContainerStyled>
      <LoginWrapper>
        <h1>Hola</h1>

        <Table responsive="lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
      </Table>
      </LoginWrapper>
      <Toaster />
    </LoginContainerStyled>
  );
};

export default ListaPrecios;
