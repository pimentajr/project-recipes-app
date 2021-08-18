import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategoriesDrink, searchByCategoryDrink } from '../services/RequestDrinks';
import { getCategoriesFood, searchByCategoryFood } from '../services/RequestFood';
import { RequestHook } from '../Context/RequestHook';

function NavCategories({ origin }) {
  const [clickedButton, setClickedButton] = useState('');
  const [category, setCategory] = useState([]);
  const { setFiltered, setByCategory } = RequestHook();

  useEffect(() => {
    function loadCategories() {
      let array;
      if (origin === 'Food') {
        array = ['All', 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
      } else if (origin === 'Drink') {
        array = ['All', 'Ordinary Drink', 'Cocktail',
          'Milk / Float / Shake', 'Other/Unknown', 'Cocoa'];
      }
      setCategory(array);
    }
    loadCategories();
  }, []);

  async function searchByCategory(text) {
    let items;
    if (origin === 'Food') {
      if (text === 'All') {
        items = await getCategoriesFood();
      }
      items = await searchByCategoryFood(text);
    } else if (origin === 'Drink') {
      if (text === 'All') {
        items = await getCategoriesDrink();
      }
      items = await searchByCategoryDrink(text);
    }
    setFiltered(items);
  }

  function handleClick({ value }) {
    if (clickedButton === '') {
      setClickedButton(value);
      setByCategory((state) => !state);
      searchByCategory(value);
    } else if (clickedButton !== value) {
      setClickedButton(value);
      searchByCategory(value);
    } else {
      setByCategory((state) => !state);
    }
  }

  return (
    <div>
      { category.map((item, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${item}-category-filter` }
          value={ item }
          onClick={ (e) => handleClick(e.target) }
        >
          { item }
        </button>
      ))}
    </div>
  );
}

NavCategories.propTypes = {
  origin: PropTypes.string.isRequired,
};

export default NavCategories;
