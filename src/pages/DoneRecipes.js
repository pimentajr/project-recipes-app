import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import ShareBtnIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [filter, setFilter] = useState('all');
  const [list, setList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.doneRecipes) {
      const doneRecipesFromLS = JSON.parse(localStorage.doneRecipes);
      if (filter === 'all') {
        setList(JSON.parse(localStorage.doneRecipes));
      } if (filter === 'food') {
        const foodDoneRecipes = doneRecipesFromLS
          .filter((recipe) => recipe.type === 'comida');
        setList(foodDoneRecipes);
      } if (filter === 'drink') {
        const drinkDoneRecipes = doneRecipesFromLS
          .filter((recipe) => recipe.type === 'bebida');
        setList(drinkDoneRecipes);
      }
    }
  }, [filter]);

  function btnClickHandler(type) {
    const infoArray = Object.values(type);
    const link = `http://localhost:3000/${infoArray[0]}s/${infoArray[1]}`;
    navigator.clipboard.writeText(link);
    const x = 'Link copiado!';
    document.getElementById('alert').innerHTML = x;
    return navigator.clipboard.writeText(link);
  }

  return (
    <main>
      <Header title="Receitas Feitas" haveSearchBtn={ false } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>
      <div>
        {
          list !== null && list !== undefined
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
                {
                  recipe.tags.map((tag, tagIndex) => (
                    <h4
                      key={ tagIndex }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </h4>
                  ))
                }
              </div>))
            : ''
        }
      </div>
    </main>);
}
