import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import RenderRecipes from '../components/RenderRecipes';
import Footer from '../components/Footer';
import FetchApi from '../services/ApiFetch';

export default function Foods() {
  const [toggleValue, setToggle] = useState([false, '']);
  const [catItens, setCatItens] = useState([]);
  const qty = 12;
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.Mechanics.searcResults);
  const recipesByIngredient = useSelector((state) => (
    state.Mechanics.recipeByIngredientName));

  useEffect(() => {
    async function fetchApi() {
      console.log(recipesByIngredient);
      if (recipesByIngredient) {
        console.log('entrei no ifão');
        const results = await FetchApi('themealdb', 'ingrediente', recipesByIngredient);
        dispatch({
          type: 'MODIFY_SEARCH_RESULTS',
          payload: results,
        });
        return;
      }
      const results = await FetchApi('themealdb', 'nome', '');
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
      const results = await FetchApi('themealdb', null, null, 'list');
      const categories = results.meals.slice(0, catQty);
      setCatItens(categories);
    }
    fetchApi();
  }, []);

  async function categoryOnClickBtn({ target }) {
    const test = target.innerText;
    if (test === 'All') {
      const results = await FetchApi('themealdb', 'nome', '');
      dispatch({
        type: 'MODIFY_SEARCH_RESULTS',
        payload: results,
      });
    }
    if ((toggleValue[0] === false || test !== toggleValue[1]) && test !== 'All') {
      const results = await FetchApi('themealdb', null, null, [test]);
      dispatch({
        type: 'MODIFY_SEARCH_RESULTS',
        payload: results,
      });
    }
    setToggle([true, test]);
    if (toggleValue[0] === true && toggleValue[1] === test) {
      const results = await FetchApi('themealdb', 'nome', '');
      dispatch({
        type: 'MODIFY_SEARCH_RESULTS',
        payload: results,
      });
      setToggle(!toggleValue[0]);
    }
  }

  return (
    <div className="container-recipes">
      <Header
        title="Comidas"
        haveSearchBtn
        searchTrigger="themealdb"
      />
      <div className="catBtns btn-group btn-group-toggle" data-toggle="buttons">
        {
          catItens.map((item) => (
            <button
              key={ item.strCategory }
              type="button"
              id="catBtn"
              className="catBtn btn btn-secondary active"
              data-testid={ `${item.strCategory}-category-filter` }
              onClick={ (e) => categoryOnClickBtn(e) }
            >
              {item.strCategory}
            </button>))
        }
        <button
          type="button"
          className="btn btn-secondary active"
          onClick={ (event) => categoryOnClickBtn(event) }
          data-testid="All-category-filter"
        >
          All
        </button>
      </div>
      <div>
        {
          recipes.meals !== null && recipes.meals !== undefined
            ? recipes.meals.slice(0, qty).map((recipe, index) => (
              <RenderRecipes
                key={ index }
                title={ recipe.strMeal }
                index={ index }
                srcImage={ recipe.strMealThumb }
                id={ recipe.idMeal }
                trigger="comidas"
              />))
            : ''
        }
      </div>
      <Footer />
    </div>
  );
}
