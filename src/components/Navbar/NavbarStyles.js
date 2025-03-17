import styled from 'styled-components';

export const NavbarWrapper = styled.div`
    .p-menubar {
        background-color: var(--blue); /* Color de fondo */
        border-radius: 5px; /* Borde redondeado */
        font-size: 16px; /* Tamaño de fuente */
    }

    .p-menuitem {
        &:hover {
            background-color: #0056b3; /* Color de fondo al pasar el cursor */
        }

        .p-menuitem-text {
            color: white; /* Color del texto */
        }

        .p-menuitem-icon {
            color: white; /* Color del icono */
        }
    }
`;
