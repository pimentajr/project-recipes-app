import styled from 'styled-components';

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 70vh;
`;

export const Button = styled.button`
  font-family: 'Poppins', sans-serif;
  width: 300px;
  height: 100px;
  border: none;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
`;
