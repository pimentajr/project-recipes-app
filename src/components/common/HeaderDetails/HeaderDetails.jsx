import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import useFavoriteRecipies from '../../../hooks/useFavoriteRecipies';
import shareIcon from '../../../images/shareIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import './HeaderDetails.css';

const HeaderDetails = (
  {
    thumb,
    alt,
    category,
    favoriteFood,
    favoriteDrink,
    drinkOrFood,
  },
) => {
  const { favoriteTrue, setFavoriteTrue, favoriteRecipe } = useFavoriteRecipies(
    favoriteFood,
    favoriteDrink,
    drinkOrFood,
  );
  const [menssage, setMenssage] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const favoritedStore = localStorage.favoriteRecipes;
    if (favoritedStore) {
      const saveLocalStorage = JSON.parse(favoritedStore)
        .some((trueOrFalse) => history.location.pathname.includes(trueOrFalse.id));

      if (saveLocalStorage) {
        setFavoriteTrue(true);
      }
    }
  }, [history.location.pathname, setFavoriteTrue]);

  const handleClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href.split('/in-progress')[0]);
    setMenssage('Link copiado!');
    const time = 3000;
    setTimeout(() => {
      setMenssage(null);
    }, time);
  };

  return (
    <header>
      {
        thumb
          ? (
            <img
              className="thumbMeal-style"
              src={ thumb }
              alt={ `showing ${alt} product` }
              data-testid="recipe-photo"
            />
          )
          : <h1>Carregando</h1>
      }
      <h4 data-testid="recipe-title">{alt}</h4>
      <h6 data-testid="recipe-category">{category}</h6>
      <button
        type="button"
        onClick={ () => handleClipboard() }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="Icon to share foods"
        />
      </button>
      <button
        type="button"
        onClick={ () => favoriteRecipe() }
      >
        <img
          data-testid="favorite-btn"
          src={
            !favoriteTrue
              ? whiteHeartIcon
              : blackHeartIcon
          }
          alt="Icon to favorite foods"
        />
      </button>
      <span>{menssage}</span>
    </header>
  );
};

const mapStateToProps = (state) => ({
  favoriteFood: state.recipeDetailsReducer.meal,
  favoriteDrink: state.recipeDetailsReducer.drink,
});

HeaderDetails.propTypes = ({
  thumb: PropTypes.img,
  alt: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps)(HeaderDetails);
