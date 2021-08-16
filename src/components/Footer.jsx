import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer" style={ { position: 'fixed', bottom: 0 } }>
      <Link to="/bebidas">
        <button
          type="button"
        >
          <img
            src={ drinkIcon }
            alt="Imagem do ícone de acesso às bebidas"
            data-testid="drinks-bottom-btn"
          />
          <span>Bebidas</span>
        </button>
      </Link>
      <Link to="/explorar">
        <button
          type="button"
        >
          <img
            src={ exploreIcon }
            alt="Imagem do ícone de acesso aos conteúdos do app"
            data-testid="explore-bottom-btn"
          />
          <span>Explorar</span>
        </button>
      </Link>
      <Link to="/comidas">
        <button
          type="button"
        >
          <img
            src={ mealIcon }
            alt="Imagem do ícone de acesso às comidas"
            data-testid="food-bottom-btn"
          />
          <span>Comidas</span>
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
