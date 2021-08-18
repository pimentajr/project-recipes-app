import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  Container,
  CardIngredient,
  Image,
  SVG,
  TitleIngredient,
} from './styles/FoodOrDrinkIngredients';

function ExplorerDrinkIngredient() {
  const headerProps = {
    title: 'Explorar Ingredientes',
    enableSearchButton: false,
    enableProfileButton: true,
  };

  const [listIngredients, setListIngredients] = useState('');

  const maxCardsOnPage = 12;
  const ingredientsLimited = listIngredients.slice(0, maxCardsOnPage);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then((response) => response.json())
      .then((result) => setListIngredients(result.drinks));
  }, []);

  const imageIngredientUrl = 'https://www.thecocktaildb.com/images/ingredients/';

  const maxLengthFont = 10;

  return (
    <div>
      <Header props={ headerProps } />
      <Container>
        {ingredientsLimited && ingredientsLimited.map((listIngredient, index) => (
          <CardIngredient key={ index }>
            <Link
              to={ `/bebidas/ingredientes/${listIngredient.strIngredient1}` }
            >
              <div data-testid={ `${index}-ingredient-card` }>
                <SVG viewBox="0 0 20 12" width="100%">
                  <path d="M0,0 L0,0 L80,20 L0,20z" fill="#FC6E51" />
                </SVG>
                <Image
                  data-testid={ `${index}-card-img` }
                  src={
                    `${imageIngredientUrl}${listIngredient.strIngredient1}-Small.png`
                  }
                  alt={ listIngredient.strIngredient1 }
                />
                <TitleIngredient
                  data-testid={ `${index}-card-name` }
                  font-size={
                    listIngredient.strIngredient1.length > maxLengthFont
                      ? 'small' : 'regular'
                  }
                >
                  {listIngredient.strIngredient1}
                </TitleIngredient>
              </div>
            </Link>
          </CardIngredient>
        ))}
      </Container>
      <Footer />
    </div>
  );
}

export default ExplorerDrinkIngredient;
