import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${({ drink }) => (drink ? '#a73d7e' : '#fcdc4d')};
`;

export const TransparentButton = styled.div`
  border: none;
  padding: 0;
  background-color: transparent;
  color: transparent;
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
  bottom: 0;
  position: fixed;
  width: 100%;
`;

export const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 46vw;
  color: black;
  margin: 2vw;
  img {
    width: 42vw;
  }
`;

export const RecipeStateButton = styled.button`
  background-color: #f8f9fa;
  border: 1px solid gray;
  bottom: 0;
  position: fixed;
  width: 100%;
  font-size: 1.2rem;
`;
