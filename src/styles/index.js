import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ drink }) => (drink ? '#a73d7e' : '#fcdc4d')};
`;

export const transparentButton = styled.button`
  border: none;
  padding: none;
  background-color: transparent;
`;

export const Underline = styled.p`
  text-decoration: underline;
`;

export const Container = styled.div`
  height: 100vh;
  padding: 10px;
  background-color: ${({ white }) => (white ? 'white' : '#fcdc4d')};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const HeaderNavBar = styled.div`
  display: flex;
  flex-direction: column;
  transition: background-color 0.25s;
  background-color: ${({ drink }) => (drink ? '#a73d7e' : '#fcdc4d')};
`;

export const FooterBar = styled.footer`
  background-color: ${({ drink }) => (drink ? '#a73d7e' : '#fcdc4d')};
  transition: background-color 0.25s;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid;
  padding: 8px;
  bottom: 0;
  position: fixed;
  width: 100%;
`;

export const CarouselItem = styled.div`
  width: 55vw;
  img {
    width: 45vw;
  }
`;
