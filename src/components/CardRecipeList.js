import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import { RequestHook } from '../Context/RequestHook';

import CardRecipe from './CardRecipe';

import { searchFoodsAll } from '../services/RequestFood';

import {
  searchDrinksAll,
} from '../services/RequestDrinks';

function CardRecipeList() {
  const {
    filteredFood,
    filteredDrink,
    initialItensFood,
    setInitialItensFood,
    initialItensDrink,
    setInitialItensDrink,
  } = RequestHook();
  const history = useHistory();
  const MAX_RESULT = 12;

  const local = window.location.href;
  const url = 'http://localhost:3000/comidas';
  let filterType = filteredFood;

  if (local !== url) {
    filterType = filteredDrink;
  }

  useEffect(() => {
    async function getInitialItensDrinkAndFood() {
      if (filterType === filteredFood) {
        setInitialItensFood([]);
        const itemsFood = await searchFoodsAll();
        setInitialItensFood(itemsFood);
      } else if (filterType === filteredDrink) {
        setInitialItensDrink([]);
        const itemsDrink = await searchDrinksAll();
        setInitialItensDrink(itemsDrink);
      }
    }
    getInitialItensDrinkAndFood();
  }, [filterType, filteredDrink, filteredFood,
    setInitialItensDrink, setInitialItensFood]);

  return (
    <div>
      { (filterType.length === 1)
        && filterType.map((item) => (
          (filterType === filteredFood)
            ? history.push(`comidas/${item.idMeal}`)
            : history.push(`bebidas/${item.idDrink}`)
        )) }

      { (filterType.length > 1)
        && filterType.slice(0, MAX_RESULT).map((item, index) => (
          <CardRecipe key={ index } item={ item } index={ index } />
        )) }

      {/* carregar 12 primeiros itens */ }
      { (initialItensFood.length >= 1)
        && initialItensFood.slice(0, MAX_RESULT)
          .map((item, index) => (
            <CardRecipe key={ index } item={ item } index={ index } />
          )) }

      { (initialItensDrink.length >= 1)
        && initialItensDrink.slice(0, MAX_RESULT)
          .map((item, index) => (
            <CardRecipe key={ index } item={ item } index={ index } />
          )) }
    </div>
  );
}

export default CardRecipeList;
