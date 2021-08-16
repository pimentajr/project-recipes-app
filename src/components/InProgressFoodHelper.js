import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default class InProgressFoodHelper extends Component {
  render() {
    const { strMealThumb,
      strMeal, shareLinkClick,
      favoriteButtonClick, favoriteButton, shareButton, strCategory } = this.props;
    return (
      <div className="recipe-details">
        <div className="image-details">
          <img
            data-testid="recipe-photo"
            src={ strMealThumb }
            alt={ strMeal }
          />
        </div>
        <h3 data-testid="recipe-title">{ strMeal }</h3>
        <div className="buttons-details">
          <button
            type="button"
            data-testid="share-btn"
            onClick={ shareLinkClick }
            className="share-button"
            style={ { boxSizing: 'border-box', margin: '0' } }
          >
            {/* <img src={ shareIcon } alt="share" /> */}
            <i style={ { fontSize: '48px', boxSizing: 'border-box', margin: '0' } } className="fas fa-share-alt-square" />
          </button>
          <button
            type="button"
            onClick={ favoriteButtonClick }
            className="like-button-progress"
          >
            {/* <img
                data-testid="favorite-btn"
                src={ !favoriteButton ? <i className="fas fa-heart like-button-notLiked" /> : <i className="fas fa-heart like-button-liked" /> }
                alt="favorite"
              /> */}
            { !favoriteButton
              ? (
                <i className="fas fa-heart like-button-notLiked" />
              )
              : (
                <i className="fas fa-heart like-button-liked" />
              )}
          </button>
        </div>
        {shareButton ? <span style={ { color: 'red' } }>Link copiado!</span> : null}
        <p className="category-details" data-testid="recipe-category">{ strCategory }</p>

      </div>
    );
  }
}

InProgressFoodHelper.propTypes = {
  strMealThumb: PropTypes.oneOfType.isRequired,
  strMeal: PropTypes.oneOfType.isRequired,
  shareLinkClick: PropTypes.oneOfType.isRequired,
  favoriteButtonClick: PropTypes.oneOfType.isRequired,
  favoriteButton: PropTypes.oneOfType.isRequired,
  shareButton: PropTypes.oneOfType.isRequired,
  strCategory: PropTypes.oneOfType.isRequired,
};
