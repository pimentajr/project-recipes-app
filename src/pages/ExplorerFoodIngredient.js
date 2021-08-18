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

function ExplorerFoodIngredient() {
  const headerProps = {
    title: 'Explorar Ingredientes',
    enableSearchButton: false,
    enableProfileButton: true,
  };

  const [listIngredients, setListIngredients] = useState('');

  const maxCardsOnPage = 12;
  const ingredientsLimited = listIngredients.slice(0, maxCardsOnPage);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((response) => response.json())
      .then((result) => setListIngredients(result.meals));
  }, []);

  const imageIngredientUrl = 'https://www.themealdb.com/images/ingredients/';

  const maxLengthFont = 10;

  return (
    <div>
      <Header props={ headerProps } />
      <Container>
        {ingredientsLimited && ingredientsLimited.map((listIngredient, index) => (
          <CardIngredient key={ index }>
            <Link
              to={ `/comidas/ingredientes/${listIngredient.strIngredient}` }
            >
              <div data-testid={ `${index}-ingredient-card` }>
                <SVG viewBox="0 0 20 12" width="100%">
                  <path d="M0,0 L0,0 L80,20 L0,20z" fill="#FC6E51" />
                </SVG>
                <Image
                  data-testid={ `${index}-card-img` }
                  src={ `${imageIngredientUrl}${listIngredient.strIngredient}.png` }
                  alt={ listIngredient.strIngredient }
                />
                <TitleIngredient
                  data-testid={ `${index}-card-name` }
                  font-size={ listIngredient.strIngredient.length > maxLengthFont
                    ? 'small' : 'regular' }
                >
                  {listIngredient.strIngredient}
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

export default ExplorerFoodIngredient;
