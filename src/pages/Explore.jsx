import React from 'react';
import { useHistory } from 'react-router';

import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

export default function Explore() {
  const history = useHistory();

  return (
    <div>
      <Header pageTitle="Explorar" itHasNotSearchButton />
      <button
        type="button"
        data-testid="explore-food"
        onClick={ () => history.push('explorar/comidas') }
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('explorar/bebidas') }
      >
        Explorar Bebidas
      </button>
      <Footer />
    </div>
  );
}
