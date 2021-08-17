import React, { useState, useEffect } from 'react';
import { getCategoriesDrink, searchByCategoryDrink } from '../services/RequestDrinks';
import { getCategoriesFood, searchByCategoryFood } from '../services/RequestFood';
import { RequestHook } from '../Context/RequestHook';

function NavCategories() {
  const [category, setCategory] = useState([]);
  const { setInitialItensFood, setInitialItensDrink } = RequestHook();

  const local = window.location.href;
  const url = 'http://localhost:3000/comidas';
  const MAX_RESULT = 5;

  useEffect(() => {
    async function getAllCategories() {
      if (local === url) {
        setInitialItensFood([]);
        setCategory([]);
        const items = await getCategoriesFood();
        setCategory(items);
      } else if (local !== url) {
        setCategory([]);
        setInitialItensDrink([]);
        const itemsDrink = await getCategoriesDrink();
        setCategory(itemsDrink);
      }
    }
    getAllCategories();
  }, [local, setInitialItensDrink, setInitialItensFood]);

  async function searchByCategoryDrinkAndFood(text) {
    if (local === url) {
      setInitialItensFood([]);
      const items = await searchByCategoryFood(text);
      setInitialItensFood(items);
    } else if (local !== url) {
      setInitialItensDrink([]);
      const itemsDrink = await searchByCategoryDrink(text);
      setInitialItensDrink(itemsDrink);
    }
  }

  async function renderAllCategoriesButtons() {
    if (local === url) {
      setInitialItensFood([]);
      const items = await getCategoriesFood();
      setInitialItensFood(items);
    } if (local !== url) {
      setInitialItensDrink([]);
      const itemsDrink = await getCategoriesDrink();
      setInitialItensDrink(itemsDrink);
    }
  }

  return (
    <div>
      { category ? category.length >= 1 && category
        .slice(0, MAX_RESULT)
        .map((item, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${item.strCategory}-category-filter` }
            onClick={ (e) => searchByCategoryDrinkAndFood(e.target.value) }
            value={ item.strCategory }
          >
            { item.strCategory }
          </button>
        )) : <p>Loading...</p> }

      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => renderAllCategoriesButtons() }
      >
        All
      </button>
    </div>
  );
}

export default NavCategories;
