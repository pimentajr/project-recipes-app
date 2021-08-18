import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderDrink from '../components/HeaderDrink';
import { searchRandomDrink } from '../services/RequestDrinks';

function ExploreDrink() {
  const history = useHistory();
  async function handleSurprise() {
    const request = await searchRandomDrink();
    history.push(`/bebidas/${request.idDrink}`);
  }

  return (
    <div>
      <HeaderDrink title="Explorar Bebidas" search={ false } />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => handleSurprise() }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrink;
