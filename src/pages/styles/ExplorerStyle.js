import styled from 'styled-components';

export const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 40px;
  line-height: 72px;
  letter-spacing: 0.1em;
  text-align: center;
  margin-top: 40px;
  position: relative;
  left: 10px;
  `;

export const Yellow = styled.span`
  font-size: 65px;
  color: #FFC729;
`;

export const Green = styled.span`
  font-size: 65px;
  color: #A0D468;
`;

export const Red = styled.span`
  font-size: 65px;
  color: #FC6E51;
`;

export const CardContainer = styled.div`
  min-width: ${(props) => (props.food ? '230px' : '250px')};
  height: 380px;
  background: rgba(200, 200, 200, 0.8);
  border-radius: 25px;
  margin: 0 40px 30px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageFood = styled.img`
  height: 250px;
  align-self: center;
  position: relative;
  left: 5px;
  z-index: 98;
  text-shadow: 2px 2px 2px black;
`;

export const ImageDrink = styled.img`
  height: 340px;
  align-self: center;
  position: relative;
  bottom: 50px;
  left: 15px;
  z-index: 98;
  text-shadow: 2px 2px 2px black;
`;

export const ImageShadow = styled.div`
  width: 180px;
  height: 20px;
  border-radius: 40px;
  box-shadow: 0 25px 25px rgba(0,0,0,0.90);
  position: relative;
  top: -40px;
  left: 50px;
  z-index: 97;
`;

export const CardTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 72px;
  line-height: 72px;
  letter-spacing: 0.1em;
  margin: ${(props) => (props.food ? '40px 0 0 30px' : '40px 0 0 12px')};
  color: rgba(44, 44, 44, 08);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  ${CardContainer}:hover & {
    transition: 0.1s;
    transform: scale(1.2, 1.2) translate(3px);
  }
`;

export const CardTitleBordered = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 72px;
  line-height: 72px;
  letter-spacing: 0.1em;
  color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: rgba(44, 44, 44, 08);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  margin: ${(props) => (props.food ? '-72px 0 -35px 30px' : '-72px 0 -35px 12px')};
  z-index: 99;
  position: relative;
  ${CardContainer}:hover & {
    transition: 0.1s;
    transform: scale(1.2, 1.2) translate(3px);
  }
`;
