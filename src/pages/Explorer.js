import React from 'react';
import { Link } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';
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
  ImageFood,
  ImageShadow,
  ImageDrink,
  CardTitle,
  CardTitleBordered,
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
      <ScrollContainer className="scroll-container">
        <CardContainer food>
          <Link className="explore-link" to="/explorar/comidas">

            <CardTitle food>FOOD</CardTitle>
            <CardTitleBordered food>FOOD</CardTitleBordered>

            <ImageFood src={ ExploreFood } />
            <ImageShadow />

          </Link>
        </CardContainer>

        <CardContainer drink>
          <Link className="explore-link" to="/explorar/bebidas">

            <CardTitle drink>DRINK</CardTitle>
            <CardTitleBordered drink>DRINK</CardTitleBordered>

            <ImageDrink src={ ExploreDrink } />

          </Link>
        </CardContainer>
      </ScrollContainer>
      <Footer />
    </div>
  );
}

export default Explorer;
