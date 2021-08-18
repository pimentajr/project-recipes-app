import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/Explorar.css';

function Explorar() {
  return (
    <div>
      <Header showButton={ false } title="Explorar" />
      <div className="explore-btns-container">
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
            className="explorar-btn explore-food-btn big-font"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
            className="explorar-btn explore-drink-btn big-font"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explorar;
