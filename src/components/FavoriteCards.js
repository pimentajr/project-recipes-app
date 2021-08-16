import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ShareBtnIcon from '../images/shareIcon.svg';
import FavoriteBtn from './FavoriteBtn';

function FavoriteCards({ list, func }) {
  const history = useHistory();

  function btnClickHandler(type) {
    const infoArray = Object.values(type);
    const link = `http://localhost:3000/${infoArray[0]}s/${infoArray[1]}`;
    navigator.clipboard.writeText(link);
    const x = 'Link copiado!';
    document.getElementById('alert').innerHTML = x;
    return navigator.clipboard.writeText(link);
  }
  return (
    <div>
      { list && list !== undefined
        ? list.map((recipe, index) => (
          <div key={ index }>
            <button
              type="button"
              onClick={ () => history
                .push(`/${recipe.type}s/${recipe.id}`) }
            >
              <img
                src={ `${recipe.image}` }
                className="imageDoneRecipe"
                alt="imagem da receita"
                data-testid={ `${index}-horizontal-image` }
              />
              <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
            </button>
            <h4
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${recipe.area} ${recipe.alcoholicOrNot} - ${recipe.category}`}
            </h4>
            <h4
              data-testid={ `${index}-horizontal-done-date` }
            >
              { recipe.doneDate }
            </h4>
            <div>
              <button
                type="button"
                onClick={ () => btnClickHandler(
                  { type: recipe.type, id: recipe.id },
                ) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ ShareBtnIcon }
                  alt="icone Share"
                />
              </button>
              <p id="alert" />
            </div>
            <FavoriteBtn
              details={ [recipe] }
              gatilho="favorite"
              id={ recipe.id }
              index={ index }
              update={ func }
            />
            {
              recipe.tags ? recipe.tags.map((tag, tagIndex) => (
                <h4
                  key={ tagIndex }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </h4>
              )) : ''
            }
          </div>))
        : ''}
    </div>
  );
}
export default FavoriteCards;
FavoriteCards.propTypes = {
  list: PropTypes.arrayOf(Array),
  func: PropTypes.func,
}.isRequired;
