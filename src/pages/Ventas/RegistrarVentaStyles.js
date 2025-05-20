import styled from 'styled-components';

export const LoginContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh; /* Usar min-height para que el contenedor crezca si el contenido es mayor */
    background-color: #f4f4f4;
    padding: 20px; /* Añadir un poco de padding general para pantallas pequeñas */
`;

export const LoginWrapper = styled.div`
    display: flex;
    flex-wrap: wrap; /* Permitir que los contenedores LeftContainer y RightContainer se apilen en pantallas pequeñas */
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 1200px; /* Reducir el max-width para que no se vea demasiado ancho en tablets */
    margin: 20px; /* Añadir margen para separar del borde de la pantalla en dispositivos pequeños */
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column; /* Apilar los contenedores en pantallas más pequeñas */
        padding: 15px;
    }
`;

export const LeftContainer = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #1E3A8A;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px; /* Añadir margen inferior para separarlo del RightContainer en pantallas pequeñas */
    min-width: 300px; /* Asegurar un ancho mínimo para el contenido */

    @media (max-width: 768px) {
        width: 100%; /* Ocupar todo el ancho en pantallas pequeñas */
        margin-bottom: 15px;
        padding: 15px;
    }
`;

export const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #3B82F6;
    color: #333;
    position: relative;
    overflow: hidden;
    width: 65%; /* Reducir el ancho inicial para dejar espacio cuando estén uno al lado del otro */
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        width: 100%; /* Ocupar todo el ancho en pantallas pequeñas */
        padding: 15px;
    }
`;

export const FormGroup = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;

export const StyledButton = styled.button`
    background-color: #f8f9fa;
    color: white;
    padding: 10px 20px; /* Reducir el padding para pantallas más pequeñas */
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
    width: 100%; /* Hacer que los botones ocupen todo el ancho en pantallas pequeñas */
    box-sizing: border-box; /* Incluir el padding y el borde en el ancho */

    &:hover {
        background-color: #0056b3;
    }

    /* Estilos específicos para el botón de confirmar venta */
    ${(props) => props.onClick && props.style && props.style.background === 'green' && `
        background: green;
        color: white;
        &:hover {
            background: darkgreen;
        }
    `}

    /* Estilos específicos para el botón de cancelar */
    ${(props) => props.secondary && props.style && props.style.background === 'RED' && `
        background: red;
        color: white;
        margin-top: 10px;
        &:hover {
            background: darkred;
        }
    `}

    @media (min-width: 769px) {
        width: auto; /* Volver al ancho automático en pantallas más grandes */
    }
`;

export const Title = styled.h2`
    color: blue;
    text-align: center;
    margin-bottom: 20px; /* Añadir un poco de espacio debajo del título */
`;

export const Input = styled.input`
    padding: 10px; /* Reducir el padding para pantallas más pequeñas */
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%; /* Ocupar todo el ancho del contenedor */
    box-sizing: border-box; /* Incluir el padding y el borde en el ancho */
`;

export const Select = styled.select`
    padding: 10px; /* Reducir el padding para pantallas más pequeñas */
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%; /* Ocupar todo el ancho del contenedor */
    box-sizing: border-box; /* Incluir el padding y el borde en el ancho */
`;

export const TableContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    overflow-x: auto; /* Permitir el scroll horizontal en pantallas pequeñas si la tabla es muy ancha */
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    background: #ffffff;
    padding: 10px;

    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px; /* Reducir el ancho mínimo para evitar desbordamiento en pantallas pequeñas */
    }

    th, td {
        padding: 8px; /* Reducir el padding de las celdas */
        text-align: left;
        border: 1px solid #ddd;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    th {
        background: #f8f9fa;
        font-weight: bold;
    }

    /* Ajustar el ancho de las columnas según sea necesario */
    th:nth-child(1), td:nth-child(1) { width: 40px; } /* Código */
    th:nth-child(2), td:nth-child(2) { width: 150px; white-space: normal; word-break: break-word; } /* Nombre del producto */
    th:nth-child(3), td:nth-child(3) { width: 70px; } /* Unidad de medida */
    th:nth-child(4), td:nth-child(4) { width: 60px; } /* Cantidad */
    th:nth-child(5), td:nth-child(5) { width: 90px; } /* Precio Unitario */
    th:nth-child(6), td:nth-child(6) { width: 70px; } /* IVA */
    th:nth-child(7), td:nth-child(7) { width: 80px; } /* Subtotal */
    th:last-child, td:last-child { width: 50px; text-align: center; } /* Botón de eliminar */
`;

export const SummaryContainer = styled.div`
    margin-top: 20px;
    text-align: right;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
`;

export const ModalContainer = styled.div`
    width: 90%; /* Hacer el modal más ancho en pantallas pequeñas */
    max-width: 500px; /* Reducir el max-width para que no ocupe demasiado en tablets */
    background: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    margin: 30px auto; /* Añadir margen superior e inferior */
    color: #333;
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin-top: 15px;
`;

export const ModalButton = styled.button`
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
    transition: background 0.3s;
    width: 100%; /* Hacer que los botones del modal ocupen todo el ancho en pantallas pequeñas */
    box-sizing: border-box;

    &:hover {
        background-color: darkblue;
    }

    ${(props) => props.secondary && `
        background-color: red;
        &:hover {
            background-color: darkred;
        }
    `}
`;

export const ClientInfo = styled.div`
    padding: 10px;
    border-radius: 6px;
    background: #ffffff;
    width: 100%; /* Ocupar todo el ancho disponible */
    text-align: left; /* Alinear el texto a la izquierda para mejor lectura en móviles */
    margin-top: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    color: #333;
    box-sizing: border-box;
`;

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%; /* Ocupar todo el ancho del contenedor padre */
`;

export const SearchInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
`;

export const SearchButton = styled.button`
    background-color: lightblue;
    border: none;
    padding: 10px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background-color: deepskyblue;
    }
`;