import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FetchApi from '../services/ApiFetch';

export default function ExplorerDrinks() {
  const [random, setrandom] = useState([]);
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    async function fetchApi() {
      const results = await FetchApi('thecocktaildb', 'random');
      setrandom(results.drinks[0]);
    }
    fetchApi();
  }, []);

  useEffect(() => {
    if (update) {
      setUpdate(false);
    }
  }, [update]);

  return (
    <main>
      <Header haveSearchBtn={ false } title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${random.idDrink}` }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </main>
  );
}
