import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import IngredientesFoodInProgress from './IngredientesFoodInProgress';

class FoodInProgressCard extends Component {
  render() {
    const { foodDetails } = this.props;
    return (
      <div>
        <img
          data-testid="recipe-photo"
          alt="imagem da receita"
          src={ foodDetails.strMealThumb }
          width="300px"
          height="250px"
        />
        <p data-testid="recipe-title">{foodDetails.strMeal}</p>
        <ShareButton test="share-btn" id={ foodDetails.idMeal } />
        <FavoriteButton test="favorite-btn" id={ foodDetails.idMeal } />
        <p data-testid="recipe-category">{ foodDetails.strCategory }</p>
        <IngredientesFoodInProgress />
        <p data-testid="instructions">{ foodDetails.strInstructions }</p>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled
          >
            {' '}
            Finalizar Receita
          </button>
        </Link>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  foodDetails: state.foodReducer.foodDetails,
});

export default connect(mapStateToProps)(FoodInProgressCard);
