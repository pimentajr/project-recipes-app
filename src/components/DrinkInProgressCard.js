import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import DrinkShareButton from './DrinkShareButton';
import DrinkFavoriteButton from './DrinkFavoriteButton';
import IngredientsDrinkInProgress from './IngredientsDrinkInProgress';
import '../RecipesInProgress.css';

class DrinkInProgressCard extends Component {
  render() {
    const { drinkDetails } = this.props;
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
            src={ drinkDetails.strDrinkThumb }
            alt="imagem da receita"
          />
          <Card.Body>
            <Card.Title
              data-testid="recipe-title"
              className="recipe-in-progress-title"
            >
              {drinkDetails.strDrink}
            </Card.Title>
            <DrinkShareButton test="share-btn" id={ drinkDetails.idDrink } />
            <DrinkFavoriteButton test="favorite-btn" id={ drinkDetails.idDrink } />
            <p data-testid="recipe-category">{ drinkDetails.strCategory }</p>
            <IngredientsDrinkInProgress />
            <p
              data-testid="instructions"
              className="instructions"
            >
              { drinkDetails.strInstructions }
            </p>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  drinkDetails: state.drinkReducer.drinkDetails,
});

DrinkInProgressCard.propTypes = {
  drinkDetails: PropTypes.shape({
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(DrinkInProgressCard);
