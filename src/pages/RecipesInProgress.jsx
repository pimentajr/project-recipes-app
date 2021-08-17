import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { setStorage, newDoneRecipe, getStorage } from '../helpers/Storage';
import ReturnRecipe from '../helpers/ReturnRecipe';
import ShareAndFavButtons from '../components/subcomponents/ShareAndFavButtons';
import { storageMeals, storageCocktails } from '../helpers/LocalStorageIngredients';
import '../styles/RecipesInProgress.css';

function RecipesInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;
  const [returnedDetail, setReturnedDetail] = useState({});
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [doneRecipes] = useState(getStorage('doneRecipes'));
  const [typeFoods, setTypeFoods] = useState('');
  const [recipe, setRecipe] = useState('');
  const [inProgressRecipes, setInprogressRecipes] = useState();
  const [btnDoneRecipe, setBtnDoneRecipe] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const food = pathname.includes('comida');
  const drink = pathname.includes('bebida');

  const addDoneRecipe = () => {
    const newDoneRecip = newDoneRecipe(returnedDetail, typeFoods);
    const saveLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setStorage('doneRecipes', [...doneRecipes, newDoneRecip]);
    delete saveLocalStorage[recipe][id];
    setStorage('inProgressRecipes', saveLocalStorage);
  };

  useEffect(() => {
    const saveLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setInprogressRecipes(saveLocalStorage);
  }, []);

  useEffect(() => {
    async function recipesReturn() {
      const { fetchDetails, typeFood,
        recipeType, ingredientsList } = await ReturnRecipe(id, food, drink);
      setReturnedDetail(fetchDetails);
      console.log(fetchDetails);
      setTypeFoods(typeFood);
      setRecipe(recipeType);
      setArrayIngredients(ingredientsList);
    }
    recipesReturn();
  }, [food, drink, id]);

  if (!localStorage.inProgressRecipes) {
    setStorage('inProgressRecipes', ({
        cocktails: {},
        meals: {},
      }));
  }

  function valueIngredients({ target }) {
    if (food) {
      const savedata = ((storageMeals(food, target.id, id)));
      setCheckedIngredients(savedata);
    } else {
      const savedata = ((storageCocktails(drink, target.id, id)));
      setCheckedIngredients(savedata);
    }
  }

  useEffect(() => {
    function disable() {
      if (checkedIngredients.length
        === arrayIngredients.length) {
        return false;
      }
      return true;
    }
    setBtnDoneRecipe(disable());
  }, [arrayIngredients, checkedIngredients]);

  return (
    <div className="container-recipe">
      <img
        data-testid="recipe-photo"
        alt="Thumb Recipe"
        src={ pathname.includes('comidas')
          ? returnedDetail.strMealThumb
          : returnedDetail.strDrinkThumb }
        width="360px"
        height="360px"
      />
      <h3 data-testid="recipe-title">
        { pathname.includes('comidas')
          ? returnedDetail.strMeal
          : returnedDetail.strDrink}
      </h3>
      <ShareAndFavButtons details={ returnedDetail } />
      <p data-testid="recipe-category">{returnedDetail.strCategory}</p>
      { arrayIngredients.map((ingredient, index) => (
        <label
          htmlFor={ ingredient }
          data-testid={ `${index}-ingredient-step` }
          key={ index }
        >
          {(!!inProgressRecipes[recipe][id] && inProgressRecipes[recipe][id]
            .includes(ingredient)) ? <input
              id={ ingredient }
              type="checkbox"
              key={ index }
              onClick={ (e) => valueIngredients(e) }
              defaultChecked
            /> : <input
              id={ ingredient }
              type="checkbox"
              key={ index }
              onClick={ (e) => valueIngredients(e) }
            />}
          {ingredient}
        </label>))}
      <p data-testid="instructions">{returnedDetail.strInstructions}</p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          className="button-finish"
          alt="Finish-Recipe"
          onClick={ () => { addDoneRecipe(); history.push('/receitas-feitas'); } }
          data-testid="finish-recipe-btn"
          disabled={ btnDoneRecipe }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default RecipesInProgress;
