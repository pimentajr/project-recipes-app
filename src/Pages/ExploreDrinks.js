import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomDrink } from '../Services/Data';

function ExploreDrinks() {
  const [randomDrink, setRandomDrink] = useState(null);

  const callRandomDrink = () => {
    fetchRandomDrink(setRandomDrink);
  };

  return (
    <div>
      {randomDrink ? (<Redirect to={ `/bebidas/${randomDrink.idDrink}` } />) : null }
      <Header title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          className="btn btn-outline-dark"
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes

        </button>
      </Link>
      <button
        className="btn btn-outline-dark"
        onClick={ callRandomDrink }
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!

      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
