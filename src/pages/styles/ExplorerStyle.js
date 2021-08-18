import styled from 'styled-components';

export const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 40px;
  line-height: 72px;
  letter-spacing: 0.1em;
  text-align: center;
  margin: 20px 0;
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
  width: 340px;
  height: 220px;
  margin: 10px 25px 40px 25px;
  display: flex;
  align-items: center;
`;

export const CardBox = styled.div`
  width: ${(props) => (props.food ? '280px' : '280px')};
  height: 100px; 
  background: rgba(223, 178, 139, 0.85);
  background: ${(props) => (
    props.food ? '#FC6E51' : '#FFC729'
  )};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  position: relative;
  top: 70px;
  left: 55px;
  left: ${(props) => (props.food ? '55px' : '20px')};
`;

export const ImageFood = styled.img`
  height: 170px;
  align-self: center;
  position: relative;
  bottom: 75px;
  z-index: 98;
  text-shadow: 2px 2px 2px black;
`;

export const ImageDrink = styled.img`
  height: 230px;
  align-self: center;
  position: relative;
  bottom: 125px;
  left: 170px;
  z-index: 98;
  text-shadow: 2px 2px 2px black;
`;

export const ImageShadow = styled.div`
  width: 125px;
  height: 20px;
  border-radius: 40px;
  box-shadow: 0 25px 25px rgba(0,0,0,0.90);
  position: relative;
  bottom: 115px;
  left: 30px;
  z-index: 97;
`;

export const CardFoodTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 72px;
  line-height: 72px;
  letter-spacing: 0.1em;
  margin: 40px 0 0 100px;
  color: rgba(44, 44, 44, 08);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  top: 60px;
  z-index: 98;
  ${CardContainer}:hover & {
    transition: 0.15s;
    transform: scale(1.2, 1.2) translate(-20px);
  }
  transition: 0.07s;
`;

export const CardFoodTitleBordered = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 72px;
  line-height: 72px;
  letter-spacing: 0.1em;
  color: transparent;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: rgba(44, 44, 44, 08);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  margin:-72px 0 -35px 100px;
  z-index: 99;
  top: 60px;
  position: relative;
  ${CardContainer}:hover & {
    transition: 0.15s;
    transform: scale(1.2, 1.2) translate(-20px);
  }
  transition: 0.07s;
`;

export const CardDrinkTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 72px;
  line-height: 72px;
  letter-spacing: 0.1em;
  margin: 40px 0 0 40px;
  color: rgba(44, 44, 44, 08);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  top: 60px;
  right: 10px;
  z-index: 98;
  ${CardContainer}:hover & {
    transition: 0.15s;
    transform: scale(1.2, 1.2) translate(20px);
  }
  transition: 0.07s;
`;

export const CardDrinkTitleBordered = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 72px;
  line-height: 72px;
  letter-spacing: 0.1em;
  color: transparent;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: rgba(44, 44, 44, 08);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  margin: -72px 0 -35px 40px;
  z-index: 99;
  top: 60px;
  right: 10px;
  position: relative;
  ${CardContainer}:hover & {
    transition: 0.15s;
    transform: scale(1.2, 1.2) translate(20px);
  }
  transition: 0.07s;
`;
