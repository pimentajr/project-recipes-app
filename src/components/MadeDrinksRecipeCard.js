import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function MadeDrinksRecipeCard({ recipe, index }) {
  const { id, name, image, doneDate, alcoholicOrNot } = recipe;
  const [share, setShare] = useState(null);

  const copyClipboard = ({ target }) => {
    setShare(true);
    console.log(target);
    const { alt } = target;
    const path = `http://localhost:3000/bebidas/${alt}`;
    navigator.clipboard.writeText(path);
  };
  return (
    <div>
      <Link to={ `/bebidas/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          alt="recipe drink"
          src={ image }
          width="70px"
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { alcoholicOrNot }
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>
        { doneDate }
      </p>
      <div>
        <button
          type="button"
          onClick={ (event) => copyClipboard(event) }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt={ id }
            width="20px"
          />
        </button>
        {share ? <span>Link copiado!</span> : null}
      </div>
    </div>
  );
}

MadeDrinksRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }).isRequired,
};

export default MadeDrinksRecipeCard;
