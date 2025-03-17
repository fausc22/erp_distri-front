// ListaPreciosStyles.js

import styled from "styled-components";

export const LoginContainerStyled = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #f8f9fa, #e0e0e0);
`;

export const LoginWrapper = styled.div`
    width: 100%;
    max-width: 1000px;
    background-color: #007bff; /* Fondo azul */
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    color: white; /* Color de texto */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60px 40px;

    @media screen and (max-width: 768px) {
        width: 90%;
        padding: 40px;
    }
`;

export const Title = styled.h1`
    font-size: 36px;
    margin-bottom: 10px;
    text-align: center;

    @media screen and (max-width: 576px) {
        font-size: 28px;
    }
`;

export const StyledButton = styled.button`
    width: 100%;
    padding: 15px;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:active {
        background-color: #004085;
    }

    @media screen and (max-width: 576px) {
        font-size: 16px;
    }
`;
