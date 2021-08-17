import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import IngredientesFoodInProgress from './IngredientsFoodInProgress';
import '../RecipesInProgress.css';

class FoodInProgressCard extends Component {
  render() {
    const { foodDetails } = this.props;
    return (
      <div className="div-recipes-in-progress">
        <Card
          style={ { width: '16rem' } }
          className="recipes-in-progress"
        >
          <Card.Img
            variant="top"
            height="250px"
            width="300px"
            data-testid="recipe-photo"
            src={ foodDetails.strMealThumb }
            alt="imagem da receita"
          />
          <Card.Body>
            <Card.Title
              className="recipe-in-progress-title"
              data-testid="recipe-title"
            >
              {foodDetails.strMeal}
            </Card.Title>
            <ShareButton test="share-btn" id={ foodDetails.idMeal } />
            <FavoriteButton test="favorite-btn" id={ foodDetails.idMeal } />
            <p data-testid="recipe-category">{ foodDetails.strCategory }</p>
            <IngredientesFoodInProgress />
            <p
              data-testid="instructions"
              className="instructions"
            >
              { foodDetails.strInstructions }
            </p>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  foodDetails: state.foodReducer.foodDetails,
});

FoodInProgressCard.propTypes = {
  foodDetails: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    idMeal: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(FoodInProgressCard);
