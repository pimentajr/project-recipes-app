import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../App.css';

class Footer extends Component {
  render() {
    return (
      <div
        className="footer"
        data-testid="footer"
      >
        <Link
          to="/bebidas"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
        >
          {/* <img
            src={ drinkIcon }
            alt="Atalho para Bebidas"
          /> */}
          <i
            style={
              {
                fontSize: '38px',
                display: 'block',
                margin: '0',
                padding: '0',
                color: '#0F46A5' }
            }
            className="fas fa-cocktail"
          />
        </Link>
        <Link
          to="/explorar"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
        >
          {/* <img
            src={ exploreIcon }
            alt="Atalho para Explorar"
          /> */}
          <i
            style={ {
              fontSize: '38px',
              display: 'block',
              margin: '0',
              color: '#1d7a66',
              padding: '0' } }
            className="far fa-compass"
          />
        </Link>
        <Link
          to="/comidas"
          data-testid="food-bottom-btn"
          src={ mealIcon }
        >
          {/* <img
            src={ mealIcon }
            alt="Atalho para Comidas"
          /> */}
          <i
            style={ {
              fontSize: '38px',
              display: 'block',
              marginRight: '6px',
              padding: '0',
              color: '#0F46A5' } }
            className="fas fa-utensils"
          />
        </Link>
      </div>
    );
  }
}

export default Footer;
