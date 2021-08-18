import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreFood from '../images/exploreFood.png';
import ExploreDrink from '../images/exploreDrink.png';
import './css/ExplorePage.css';

import {
  Title,
  Yellow,
  Green,
  Red,
  CardContainer,
  CardBox,
  ImageFood,
  ImageShadow,
  ImageDrink,
  CardFoodTitle,
  CardDrinkTitle,
  CardFoodTitleBordered,
  CardDrinkTitleBordered,
} from './styles/ExplorerStyle';

function Explorer() {
  const headerProps = {
    title: 'Explorar',
    enableSearchButton: false,
    enableProfileButton: true,
  };

  return (
    <div className="explore-page">
      <Header props={ headerProps } />
      <Title>
        Explorar
        <Yellow>.</Yellow>
        <Green>.</Green>
        <Red>.</Red>
      </Title>
      <div className="scroll-container">
        <CardContainer food>
          <Link className="explore-link" to="/explorar/comidas">

            <CardFoodTitle>FOOD</CardFoodTitle>
            <CardFoodTitleBordered>FOOD</CardFoodTitleBordered>

            <CardBox food />

            <ImageFood src={ ExploreFood } />
            <ImageShadow />
          </Link>
        </CardContainer>

        <CardContainer drink>
          <Link className="explore-link" to="/explorar/bebidas">

            <CardDrinkTitle>DRINK</CardDrinkTitle>
            <CardDrinkTitleBordered>DRINK</CardDrinkTitleBordered>

            <CardBox drink />

            <ImageDrink src={ ExploreDrink } />
          </Link>
        </CardContainer>
      </div>
      <Footer />
    </div>
  );
}

export default Explorer;
