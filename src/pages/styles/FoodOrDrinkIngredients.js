import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 360px;
  flex-wrap: wrap;
`;

export const CardIngredient = styled.div`
  margin: 15px;
  height: 200px;
  width: 150px;
  background: #F7F7FF;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;

export const SVG = styled.svg`
  position: relative;
  top: 110px;
  border-radius: 0 5px 5px;
`;

export const Image = styled.img`
  position: relative;
  width: 140px;
  left: 5px;
  bottom: 80px;
`;

export const TitleIngredient = styled.h1`
  font-family: 'Poppins', sans-serif;
  position: relative;
  z-index: 99;
  bottom: ${(props) => (props['font-size'] === 'regular' ? '80px' : '78px')};
  text-align: center;
  font-size: ${(props) => (props['font-size'] === 'regular' ? '1.45em' : '1.2em')};
  text-transform: uppercase;
  color: white;
`;
