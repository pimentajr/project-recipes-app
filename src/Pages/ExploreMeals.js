import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomMeal } from '../Services/Data';

function ExploreMeals() {
  const [randomMeal, setRandomMeal] = useState(null);

  const callRandomMeal = () => {
    fetchRandomMeal(setRandomMeal);
  };

  return (
    <div>
      {randomMeal ? (<Redirect to={ `/comidas/${randomMeal.idMeal}` } />) : null }
      <Header title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button
          className="btn btn-outline-dark"
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes

        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          className="btn btn-outline-dark"
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem

        </button>
      </Link>
      <button
        className="btn btn-outline-dark"
        onClick={ callRandomMeal }
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!

      </button>
      <Footer />
    </div>
  );
}

export default ExploreMeals;
