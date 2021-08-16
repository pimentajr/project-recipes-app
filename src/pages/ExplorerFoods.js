import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FetchApi from '../services/ApiFetch';

export default function ExplorerFoods() {
  const [random, setrandom] = useState([]);
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    async function fetchApi() {
      const results = await FetchApi('themealdb', 'random');
      setrandom(results.meals[0]);
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
      <Header haveSearchBtn={ false } title="Explorar Comidas" />
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button type="button" data-testid="explore-by-area">
            Por Local de Origem
          </button>
        </Link>
        <Link to={ `/comidas/${random.idMeal}` }>
          <button type="button" data-testid="explore-surprise">
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
