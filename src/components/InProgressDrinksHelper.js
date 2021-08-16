import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default class InProgressDrinksHelper extends Component {
  render() {
    const { strDrinkThumb, strDrink,
      shareLinkClick, favoriteButtonClick,
      favoriteButton, shareButton, strAlcoholic } = this.props;
    return (
      <div className="recipe-details">
        <div className="image-details">
          <img
            data-testid="recipe-photo"
            src={ strDrinkThumb }
            alt={ strDrink }
          />
        </div>
        <h3 data-testid="recipe-title">{ strDrink }</h3>
        <div className="buttons-details">
          <button
            type="button"
            data-testid="share-btn"
            onClick={ shareLinkClick }
            className="share-button"
            style={{ boxSizing: 'border-box', margin: '0' }}
          >
            {/* <img src={ shareIcon } alt="share" /> */}
            <i style={{fontSize: '48px', boxSizing: 'border-box', margin: '0'}} className="fas fa-share-alt-square" />
          </button>
          <button
            type="button"
            onClick={ favoriteButtonClick }
            className="like-button-progress"
          >
            {/* <img
                data-testid="favorite-btn"
                src={ !favoriteButton ? whiteHeartIcon : blackHeartIcon }
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
        <p className="category-details" data-testid="recipe-category">{ strAlcoholic }</p>
      </div>
    );
  }
}

InProgressDrinksHelper.propTypes = {
  strDrinkThumb: PropTypes.oneOfType.isRequired,
  strDrink: PropTypes.oneOfType.isRequired,
  shareLinkClick: PropTypes.oneOfType.isRequired,
  favoriteButtonClick: PropTypes.oneOfType.isRequired,
  favoriteButton: PropTypes.oneOfType.isRequired,
  shareButton: PropTypes.oneOfType.isRequired,
  strAlcoholic: PropTypes.oneOfType.isRequired,
};
