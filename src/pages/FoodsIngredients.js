import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FetchApi from '../services/ApiFetch';

//

export default function FoodsIngredients() {
  const [ingredients, setIngredients] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function getIngredientsFromApi() {
      const qty = 12;
      const response = await FetchApi('themealdb', 'listIngredients');
      const get = response.meals.slice(0, qty);
      setIngredients(get);
    }
    getIngredientsFromApi();
  }, []);

  function btnClickHandler(ingredientName) {
    dispatch({
      type: 'SEND_INGREDIENT_NAME_TO_STORE',
      name: ingredientName,
    });
    dispatch({
      type: 'MODIFY_SEARCH_RESULTS',
      payload: [],
    });
    history.push('/comidas');
  }

  function renderIngredientsCard() {
    return (
      ingredients
        .map((item, index) => (
          <button
            key={ index }
            type="button"
            onClick={ () => btnClickHandler(item.strIngredient) }
          >
            <div
              className="ingredients-card"
              data-testid={ `${index}-ingredient-card` }
              style={ { padding: '10px' } }
            >
              <img
                alt="ingredient-logo"
                src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
                width="300px"
                height="300px"
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>
                {item.strIngredient}
              </h3>
            </div>
          </button>
        ))
    );
  }

  return (
    <main>
      <Header haveSearchBtn={ false } title="Explorar Ingredientes" />
      <Footer />
      {ingredients ? renderIngredientsCard() : 'loading...'}
    </main>
  );
}
