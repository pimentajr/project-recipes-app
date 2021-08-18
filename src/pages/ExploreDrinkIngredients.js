import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import HeaderDrink from '../components/HeaderDrink';
import { getIngredients } from '../services/RequestDrinks';
import { RequestHook } from '../Context/RequestHook';

function ExploreDrinkIngredients() {
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
    history.push('/bebidas/');
    setIngredient(text);
  }

  function renderCard(object, number) {
    return (
      <button
        type="button"
        key={ number }
        onClick={ () => handleClick(object.strIngredient1) }
      >
        <div data-testid={ `${number}-ingredient-card` }>
          <p data-testid={ `${number}-card-name` }>{ object.strIngredient1 }</p>
          <img
            data-testid={ `${number}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${object.strIngredient1}-Small.png` }
            alt={ `${number}-card-name` }
            width="50px"
          />
        </div>
      </button>
    );
  }

  return (
    <div>
      <HeaderDrink title="Explorar Ingredientes" search={ false } />
      { ingredientsArray.length === 0 ? <p>loading</p> : ingredientsArray
        .slice(0, MAX_RESULT).map((item, index) => renderCard(item, index)) }
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredients;
