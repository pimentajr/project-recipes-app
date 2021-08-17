import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function MadeFoodRecipeCard({ recipe, index }) {
  const { id, name, image, category, area, doneDate, tags } = recipe;
  const [share, setShare] = useState(null);

  const copyClipboard = ({ target }) => {
    setShare(true);
    const { alt } = target;
    const path = `http://localhost:3000/comidas/${alt}`;
    navigator.clipboard.writeText(path);
  };

  return (
    <div>
      <Link to={ `/comidas/${id}` }>
        <img
          src={ image }
          data-testid={ `${index}-horizontal-image` }
          alt="recipe"
          className=""
          width="70px"

        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </Link>
      <h2 data-testid={ `${index}-horizontal-top-text` }>
        { `${area} - ${category}` }
      </h2>
      <p>{ area }</p>
      <p data-testid={ `${index}-horizontal-top-done-date` }>
        { doneDate }
      </p>
      <p data-testid={ `${index}-${tags[0]}-horizontal-tag` }>{tags[0]}</p>
      <p data-testid={ `${index}-${tags[1]}-horizontal-tag` }>{tags[1]}</p>
      <div className="btnFinishRecipe">
        <button
          src={ shareIcon }
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
MadeFoodRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    area: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
export default MadeFoodRecipeCard;
