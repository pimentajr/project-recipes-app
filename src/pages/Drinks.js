import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import RenderRecipes from '../components/RenderRecipes';
import Footer from '../components/Footer';
import FetchApi from '../services/ApiFetch';

export default function Drinks() {
  const [toggleValue, setToggle] = useState([false, '']);
  const [catItens, setCatItens] = useState([]);
  const qty = 12;
  const recipes = useSelector((state) => state.Mechanics.searcResults);
  const dispatch = useDispatch();
  const recipesByIngredient = useSelector((state) => (
    state.Mechanics.recipeByIngredientName));

  useEffect(() => {
    async function fetchApi() {
      if (recipesByIngredient) {
        const results = (
          await FetchApi('thecocktaildb', 'ingrediente', recipesByIngredient));
        dispatch({
          type: 'MODIFY_SEARCH_RESULTS',
          payload: results,
        });
        return;
      }
      const results = await FetchApi('thecocktaildb', 'nome', '');
      dispatch({
        type: 'MODIFY_SEARCH_RESULTS',
        payload: results,
      });
    }
    fetchApi();
  }, []);

  useEffect(() => {
    async function fetchApi() {
      const catQty = 5;
      const results = await FetchApi('thecocktaildb', null, null, 'list');
      const categories = results.drinks.slice(0, catQty);
      setCatItens(categories);
    }
    fetchApi();
  }, []);

  async function categoryOnClickBtn({ target }) {
    const test = target.innerText;
    if (test === 'All') {
      const results = await FetchApi('thecocktaildb', 'nome', '');
      dispatch({
        type: 'MODIFY_SEARCH_RESULTS',
        payload: results,
      });
    }
    if ((toggleValue[0] === false || test !== toggleValue[1]) && test !== 'All') {
      const results = await FetchApi('thecocktaildb', null, null, [test]);
      dispatch({
        type: 'MODIFY_SEARCH_RESULTS',
        payload: results,
      });
    }
    setToggle([true, test]);
    if (toggleValue[0] === true && toggleValue[1] === test) {
      const results = await FetchApi('thecocktaildb', 'nome', '');
      dispatch({
        type: 'MODIFY_SEARCH_RESULTS',
        payload: results,
      });
      setToggle(!toggleValue[0]);
    }
  }

  return (
    <div>
      <Header
        title="Bebidas"
        haveSearchBtn
        searchTrigger="thecocktaildb"
      />
      <div className="catBtns">
        {
          catItens.map((item) => (
            <button
              key={ item.strCategory }
              type="button"
              id="drinkCatBtn"
              data-testid={ `${item.strCategory}-category-filter` }
              onClick={ (e) => categoryOnClickBtn(e) }
            >
              {item.strCategory}
            </button>))
        }
      </div>
      <button
        type="button"
        onClick={ (event) => categoryOnClickBtn(event) }
        data-testid="All-category-filter"
      >
        All
      </button>
      <div>
        {
          recipes.drinks !== null && recipes.drinks !== undefined
            ? recipes.drinks.slice(0, qty).map((recipe, index) => (
              <RenderRecipes
                key={ index }
                title={ recipe.strDrink }
                index={ index }
                srcImage={ recipe.strDrinkThumb }
                id={ recipe.idDrink }
                trigger="bebidas"
                target={ recipe }
              />))
            : ''
        }
      </div>
      <Footer />
    </div>
  );
}
