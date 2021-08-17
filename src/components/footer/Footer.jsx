import React from 'react';
import { useHistory } from 'react-router';

import DrinkIcon from '../../images/drinkIcon.svg';
import ExploreIcon from '../../images/exploreIcon.svg';
import MealIcon from '../../images/mealIcon.svg';

import './Footer.css';

export default function Footer() {
  const history = useHistory();
  return (
    <div className="footerContainer" data-testid="footer">
      <input
        type="button"
        src={ DrinkIcon }
        onClick={ () => history.push('/bebidas') }
        data-testid="drinks-bottom-btn"
      />
      <input
        type="button"
        className="explore"
        src={ ExploreIcon }
        onClick={ () => history.push('/explorar') }
        data-testid="explore-bottom-btn"
      />
      <input
        type="button"
        src={ MealIcon }
        onClick={ () => history.push('/comidas') }
        data-testid="food-bottom-btn"
      />
    </div>
  );
}
