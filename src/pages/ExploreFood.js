import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { searchRandomMeal } from '../services/RequestFood';

function ExploreFood() {
  const history = useHistory();
  async function handleSurprise() {
    const request = await searchRandomMeal();
    history.push(`/comidas/${request.idMeal}`);
  }
  return (
    <div>
      <Header title="Explorar Comidas" search={ false } />
      <Link to="/explorar/comidas/ingredientes">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          data-testid="explore-by-area"
          type="button"
        >
          Por Local de Origem
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

ExploreFood.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ExploreFood;
