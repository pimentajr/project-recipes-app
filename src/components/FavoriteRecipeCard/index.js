import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareIcon from '../../images/shareIcon.svg';
import FavoriteButton from '../FavoriteButton';

class FavoriteRecipeCard extends React.Component {
  render() {
    const { recipe, count } = this.props;

    return (
      <section>
        <section>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              width="200px"
              data-testid={ `${count}-horizontal-image` }
            />
          </Link>
        </section>
        <section>
          <p data-testid={ `${count}-horizontal-top-text` }>
            {
              recipe.type === 'comida'
                ? `${recipe.area} - ${recipe.category}`
                : recipe.alcoholicOrNot
            }
          </p>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <h1 data-testid={ `${count}-horizontal-name` }>
              { recipe.name }
            </h1>
          </Link>
          <button type="button">
            <img
              src={ ShareIcon }
              alt="Compartilhar"
              data-testid={ `${count}-horizontal-share-btn` }
            />
          </button>
          <FavoriteButton recipe={ recipe } count={ count } />
        </section>
      </section>
    );
  }
}

export default FavoriteRecipeCard;

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    type: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }),
}.isRequired;
