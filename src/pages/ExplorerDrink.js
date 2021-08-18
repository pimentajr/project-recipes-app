import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/ExplorerFoodOrDrink.css';

import {
  ButtonsContainer,
  Button,
} from './styles/ExplorerFoodOrDrink';

function ExplorerDrink() {
  const headerProps = {
    title: 'Explorar Bebidas',
    enableSearchButton: false,
    enableProfileButton: true,
  };

  const [randomIDRecipe, setRandomIDRecipe] = useState('');

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((result) => setRandomIDRecipe(result.drinks[0].idDrink));
  }, []);

  return (
    <div>
      <Header props={ headerProps } />
      <ButtonsContainer>
        <Link className="link" to="/explorar/bebidas/ingredientes">
          <Button
            className="background-red"
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </Button>
        </Link>

        <Link className="link" to={ `/bebidas/${randomIDRecipe}` }>
          <Button
            className="background-yellow"
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

export default ExplorerDrink;
