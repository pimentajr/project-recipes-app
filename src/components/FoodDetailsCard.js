import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
// import '../FoodAndDrinkDetails.css';

class FoodDetailsCard extends Component {
  render() {
    const { foodDetails } = this.props;
    let ingredients = [];
    let measurements = [];
    const array = Array.of(Object.entries(foodDetails));
    if (array[0].length > 0) {
      ingredients = array[0].filter((item) => item[0].includes('strIngredient'))
        .filter((item) => item[1]).map((item) => item[1]);
      measurements = array[0].filter((item) => item[0].includes('strMeasure'))
        .filter((item) => item[1]).map((item) => item[1]);
    }
    return (
      <div className="div-details">
        <Card
          style={ { width: '16rem' } }
          className="food-details-card"
        >
          <Card.Img
            variant="top"
            height="250px"
            width="300px"
            data-testid="recipe-photo"
            src={ foodDetails.strMealThumb }
            alt="Foto do prato"
          />
          <Card.Body>
            <Card.Title
              className="recipe-title"
              data-testid="recipe-title"
            >
              { foodDetails.strMeal }
            </Card.Title>
            <ShareButton test="share-btn" id={ foodDetails.idMeal } />
            <FavoriteButton test="favorite-btn" id={ foodDetails.idMeal } />
            <p data-testid="recipe-category">{ foodDetails.strCategory }</p>
            <ul>
              { ingredients
                .map((item, index) => (item
                  ? (
                    <li
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ index }
                    >
                      {`${item} - ${measurements[index]}`}
                    </li>)
                  : ''))}
            </ul>
            <p
              data-testid="instructions"
              className="instructions"
            >
              { foodDetails.strInstructions }
            </p>
          </Card.Body>
          <iframe
            data-testid="video"
            width="300px"
            height="250px"
            title="Vídeo da Receita"
            src={ foodDetails.strYoutube }
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  foodDetails: state.foodReducer.foodDetails,
});

FoodDetailsCard.propTypes = {
  foodDetails: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    idMeal: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(FoodDetailsCard);
