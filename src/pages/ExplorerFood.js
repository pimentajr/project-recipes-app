import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/ExplorerFoodOrDrink.css';

import {
  ButtonsContainer,
  Button,
} from './styles/ExplorerFoodOrDrink';

function ExplorerFood() {
  const headerProps = {
    title: 'Explorar Comidas',
    enableSearchButton: false,
    enableProfileButton: true,
  };

  const [randomIDRecipe, setRandomIDRecipe] = useState('');

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((result) => setRandomIDRecipe(result.meals[0].idMeal));
  }, []);

  return (
    <div>
      <Header props={ headerProps } />
      <ButtonsContainer>
        <Link className="link" to="/explorar/comidas/ingredientes">
          <Button
            className="background-red"
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </Button>
        </Link>

        <Link className="link" to="/explorar/comidas/area">
          <Button
            className="background-yellow"
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </Button>
        </Link>

        <Link className="link" to={ `/comidas/${randomIDRecipe}` }>
          <Button
            className="background-green"
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </Button>
        </Link>
      </ButtonsContainer>
      <Footer />
    </div>
  );
}

export default ExplorerFood;
