import styled from "styled-components";

export const LoginContainerStyled = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, #f8f9fa, #e0e0e0);
`;

export const LoginWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  
  background: linear-gradient(45deg, #ffffff, #f0f0f0);
  
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const LeftContainer = styled.div`
  flex: 1;
  padding: 60px 40px;
  background-color: #1E3A8A;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;
  color: #343a40;
  width: 30%;
  
  

  button {
    margin-bottom: 10px; /* Añadir espacio entre los botones */
  }
`;

export const RightContainer = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 40px;
  background-color: #3B82F6;
  color: white;
  position: relative;
  overflow: hidden;
  width: 70%; /* Hacer el contenedor un poco más grande */
  
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const TitleRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  padding: 20px;

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 30px;
    font-weight: 700;
    margin-top: 0;
  }
`;

export const Title = styled.h1`
  margin-bottom: 10px;
  font-size: 36px;
  text-align: center;

  @media screen and (max-width: 576px) {
    font-size: 28px;
  }
`;

export const Subtitle = styled.p`
  margin-bottom: 40px;
  font-size: 18px;
  text-align: center;
  color: #6c757d;

  @media screen and (max-width: 576px) {
    font-size: 16px;
    margin-bottom: 30px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #343a40;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  @media screen and (max-width: 576px) {
    font-size: 14px;
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


export const SearchResultList = styled.ul`
  list-style: none;
  padding: 0;
  background-color: black;
`;

export const SearchResultItem = styled.li`
  background-color: black;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #e9e9e9;
  }
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

export const ModalContainer = styled.div`
    width: 80%;
     max-width: 650px;
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