import styled from 'styled-components';

export const LoginContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    background-color: #f4f4f4;
`;

export const LoginWrapper = styled.div`
    display: flex;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 1800px;
    min-height: 40vh;
    justify-content: space-between;
`;

export const LeftContainer = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #1E3A8A;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    
`;

export const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background-color: #3B82F6;
    color: #333;
    position: relative;
    overflow: hidden;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;

export const StyledButton = styled.button`
    background-color: #f8f9fa;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
    

    &:hover {
        background-color: #0056b3;
    }
`;

export const ConfirmButton = styled.button`
    background-color: green;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
    

    &:hover {
        background-color:rgb(72, 179, 0);
    }
`;

export const DeletedButton = styled.button`
    background-color: red;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
    

    &:hover {
        background-color:rgb(179, 51, 0);
    }
`;

export const Title = styled.h2`
    color: blue;
    text-align: center;
`;

export const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const Select = styled.select`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const TableContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    

    overflow-x: auto;
    overflow-y: auto;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    background: #ffffff;
    padding: 10px;

    table {
        width: 100%;
        min-width: 1000px; /* Se mantiene el tamaño mínimo */
        

        border-collapse: collapse;
        
        table-layout: fixed; /* Asegura que las columnas no cambien de tamaño */
    }

    th {
        padding: 10px;
        text-align: center;
        border: 1px solid #ddd; /* Agrega líneas divisorias */
        background: #f8f9fa; /* Color de fondo sutil para el encabezado */
        font-weight: bold; /* Negrita en encabezados */
        white-space: nowrap; /* Evita saltos de línea en el encabezado */
        
    }

    td {
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd; /* Agrega líneas divisorias entre celdas */
        white-space: nowrap; /* Mantiene la mayoría de las columnas en una sola línea */
        overflow: hidden;
        text-overflow: ellipsis;
        
    }

    /* Permite que el nombre del producto se divida en varias líneas */
    td:nth-child(2) { 
        white-space: normal;
        word-wrap: break-word;
    }

    

    /* Definimos un ancho fijo para cada columna */
    th:nth-child(1), td:nth-child(1) { width: 50px; }  /* Código */
    th:nth-child(2), td:nth-child(2) { width: 100px; } /* Nombre del producto */
    th:nth-child(3), td:nth-child(3) { width: 230px; } /* Unidad de medida */
    th:nth-child(4), td:nth-child(4) { width: 150px } /* Cantidad */
    th:nth-child(5), td:nth-child(5) { width: 100px; } /* Precio Unitario */
    th:nth-child(6), td:nth-child(6) { width: 100px; } /* IVA */
    th:nth-child(7), td:nth-child(7) { width: 180px; } /* Subtotal */
    th:nth-child(8), td:nth-child(8) { width: 150px; } /* Subtotal */
    th:nth-child(9), td:nth-child(9) { width: 150px; } /* Subtotal */
    th:nth-child(10), td:nth-child(10) { width: 120px; } /* Subtotal */
    th:nth-child(11), td:nth-child(11) { width: 150px; } /* Subtotal */




`;


export const SummaryContainer = styled.div`
    margin-top: 20px;
    text-align: right;
`;

export const ModalContainer = styled.div`
    width: 120%;
     max-width: 1000px;
     background: #ffffff;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    margin: auto;
    color: #333;


     

`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
`;

export const ModalButton = styled.button`
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    transition: background 0.3s;

    &:hover {
        background-color: darkblue;
    }
`;

export const ClientInfo = styled.div`
    padding: 12px;
    border-radius: 6px;
    background: #ffffff;
    width: 80%;
    text-align: center;
    margin-top: 10px;
    font-size: 18px;
    border: 1px solid #ddd;
    color: #333;
`;

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const SearchInput = styled.input`
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const SearchButton = styled.button`
    background-color: lightblue;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background-color: deepskyblue;
    }
`;


export const TableContainerModal = styled.div`
    margin-top: 20px;
    width: 100%;
    

    overflow-x: auto;
    overflow-y: auto;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    background: #ffffff;
    padding: 10px;

    table {
        width: 100%;
        min-width: 1000px; /* Se mantiene el tamaño mínimo */
        

        border-collapse: collapse;
        
        table-layout: fixed; /* Asegura que las columnas no cambien de tamaño */
    }

    th {
        padding: 10px;
        text-align: center;
        border: 1px solid #ddd; /* Agrega líneas divisorias */
        background: #f8f9fa; /* Color de fondo sutil para el encabezado */
        font-weight: bold; /* Negrita en encabezados */
        white-space: nowrap; /* Evita saltos de línea en el encabezado */
        
    }

    td {
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd; /* Agrega líneas divisorias entre celdas */
        white-space: nowrap; /* Mantiene la mayoría de las columnas en una sola línea */
        overflow: hidden;
        text-overflow: ellipsis;
        
    }

    /* Permite que el nombre del producto se divida en varias líneas */
    td:nth-child(2) { 
        white-space: normal;
        word-wrap: break-word;
    }

    

    /* Definimos un ancho fijo para cada columna */
    th:nth-child(1), td:nth-child(1) { width: 70px; }  /* Código */
    th:nth-child(2), td:nth-child(2) { width: 350px; } /* Nombre del producto */
    th:nth-child(3), td:nth-child(3) { width: 120px; } /* Unidad de medida */
    th:nth-child(4), td:nth-child(4) { width: 120px } /* Cantidad */
    




`;
