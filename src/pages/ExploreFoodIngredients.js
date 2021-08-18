import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/HeaderFood';
import { getIngredients } from '../services/RequestFood';
import { RequestHook } from '../Context/RequestHook';

function ExploreFoodIngredients() {
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const { setIngredient } = RequestHook();
  const MAX_RESULT = 12;
  const history = useHistory();

  useEffect(() => {
    async function loadIngredients() {
      const request = await getIngredients();
      setIngredientsArray(request);
    }
    loadIngredients();
  }, []);

  function handleClick(text) {
    history.push('/comidas/');
    setIngredient(text);
  }

  function renderCard(object, number) {
    return (
      <button
        type="button"
        key={ number }
        onClick={ () => handleClick(object.strIngredient) }
      >
        <div data-testid={ `${number}-ingredient-card` }>
          <p data-testid={ `${number}-card-name` }>{ object.strIngredient }</p>
          <img
            data-testid={ `${number}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${object.strIngredient}-Small.png` }
            alt={ `${number}-card-name` }
            width="50px"
          />
        </div>
      </button>
    );
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" search={ false } />
      { ingredientsArray.length === 0 ? <p>loading</p> : ingredientsArray
        .slice(0, MAX_RESULT).map((item, index) => renderCard(item, index)) }
      <Footer />
    </div>
  );
}

export default ExploreFoodIngredients;
