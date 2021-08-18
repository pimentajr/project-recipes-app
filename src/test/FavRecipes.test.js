import React from 'react';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/react';
import renderWithRouterAndStore from './renderWithRouterAndStore';
import FavRecipes from '../pages/receitas-favoritas';

const testHistory = createMemoryHistory({ initialEntries: ['/receitas-favoritas'] });

const ALL_FILTER = 'filter-by-all-btn';
const FOOD_FILTER = 'filter-by-food-btn';
const DRINK_FILTER = 'filter-by-drink-btn';
const CARD_IMG_0 = '0-horizontal-image';
const CATEGORY_0 = '0-horizontal-top-text';
const RECIPE_NAME_0 = '0-horizontal-name';
const SHARE_BTN_0 = '0-horizontal-share-btn';
const FAV_BTN_0 = '0-horizontal-favorite-btn';
const CARD_IMG_1 = '1-horizontal-image';
const CATEGORY_1 = '1-horizontal-top-text';
const RECIPE_NAME_1 = '1-horizontal-name';
const SHARE_BTN_1 = '1-horizontal-share-btn';
const FAV_BTN_1 = '1-horizontal-favorite-btn';

describe('Testa a tela de receitas feitas', () => {
  const initialState = {
    recipes: {
      favorites: [{
        id: '52771',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: '178319',
        type: 'bebida',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      }],
    },
  };

  it('Testa se a tela renderiza os componentes corretamente', () => {
    const {
      getByTestId,
    } = renderWithRouterAndStore(<FavRecipes />, testHistory, initialState);
    const allFilter = getByTestId(ALL_FILTER);
    const foodFilter = getByTestId(FOOD_FILTER);
    const drinkFilter = getByTestId(DRINK_FILTER);
    const cardImg0 = getByTestId(CARD_IMG_0);
    const category0 = getByTestId(CATEGORY_0);
    const recipeName0 = getByTestId(RECIPE_NAME_0);
    const shareBtn0 = getByTestId(SHARE_BTN_0);
    const favBtn0 = getByTestId(FAV_BTN_0);
    const cardImg1 = getByTestId(CARD_IMG_1);
    const category1 = getByTestId(CATEGORY_1);
    const recipeName1 = getByTestId(RECIPE_NAME_1);
    const shareBtn1 = getByTestId(SHARE_BTN_1);
    const favBtn1 = getByTestId(FAV_BTN_1);

    expect(allFilter).toBeInTheDocument();
    expect(foodFilter).toBeInTheDocument();
    expect(drinkFilter).toBeInTheDocument();
    expect(cardImg0).toBeInTheDocument();
    expect(category0).toBeInTheDocument();
    expect(recipeName0).toBeInTheDocument();
    expect(shareBtn0).toBeInTheDocument();
    expect(favBtn0).toBeInTheDocument();
    expect(cardImg1).toBeInTheDocument();
    expect(category1).toBeInTheDocument();
    expect(recipeName1).toBeInTheDocument();
    expect(shareBtn1).toBeInTheDocument();
    expect(favBtn1).toBeInTheDocument();
  });

  it('Testa se os filtros funcionam corretamente', () => {
    const {
      getByTestId,
      getByText,
    } = renderWithRouterAndStore(<FavRecipes />, testHistory, initialState);
    const allFilter = getByTestId(ALL_FILTER);
    const foodFilter = getByTestId(FOOD_FILTER);
    const drinkFilter = getByTestId(DRINK_FILTER);
    const recipeName = getByText(/Spicy/i);

    expect(recipeName).toBeInTheDocument();
    fireEvent.click(drinkFilter);
    expect(recipeName).not.toBeInTheDocument();
    fireEvent.click(foodFilter);
    expect(recipeName).not.toBeInTheDocument();
    fireEvent.click(allFilter);
    expect(recipeName).not.toBeInTheDocument();
  });

  it('Testa se é possível desfavoritar um item', () => {
    const {
      getByTestId,
      getByText,
    } = renderWithRouterAndStore(<FavRecipes />, testHistory, initialState);
    const favBtn0 = getByTestId(FAV_BTN_0);
    const recipeName = getByText(/Spicy/i);
    fireEvent.click(favBtn0);
    expect(recipeName).not.toBeInTheDocument();
  });
});
