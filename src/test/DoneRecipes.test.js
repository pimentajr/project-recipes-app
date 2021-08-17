import React from 'react';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import DoneRecipe from '../pages/receitas-feitas';

const testHistory = createMemoryHistory({ initialEntries: ['/receitas-feitas'] });

const ALL_FILTER = 'filter-by-all-btn';
const FOOD_FILTER = 'filter-by-food-btn';
const DRINK_FILTER = 'filter-by-drink-btn';
const CARD_IMG_0 = '0-horizontal-image';
const CATEGORY_0 = '0-horizontal-top-text';
const RECIPE_NAME_0 = '0-horizontal-name';
const DATE_0 = '0-horizontal-done-date';
const SHARE_BTN_0 = '0-horizontal-share-btn';
const TAG_0 = '0-SideDish-horizontal-tag';
const CARD_IMG_1 = '1-horizontal-image';
const CATEGORY_1 = '1-horizontal-top-text';
const RECIPE_NAME_1 = '1-horizontal-name';
const DATE_1 = '1-horizontal-done-date';
const SHARE_BTN_1 = '1-horizontal-share-btn';
const TAG_1 = '1-Soup-horizontal-tag';

describe('Testa a tela de receitas feitas', () => {
  const doneRecipes = [{
    id: '52978',
    type: 'comida',
    area: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Kumpir',
    image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
    doneDate: '8/16/2021',
    tags: ['SideDish'],
  },
  {
    id: '52977',
    type: 'comida',
    area: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: '8/16/2021',
    tags: ['Soup'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '8/16/2021',
    tags: [],
  }];

  it('Testa se a tela renderiza os componentes corretamente', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const {
      getByTestId,
    } = renderWithRouter(<DoneRecipe />, testHistory);
    const allFilter = getByTestId(ALL_FILTER);
    const foodFilter = getByTestId(FOOD_FILTER);
    const drinkFilter = getByTestId(DRINK_FILTER);
    const cardImg0 = getByTestId(CARD_IMG_0);
    const category0 = getByTestId(CATEGORY_0);
    const recipeName0 = getByTestId(RECIPE_NAME_0);
    const date0 = getByTestId(DATE_0);
    const shareBtn0 = getByTestId(SHARE_BTN_0);
    const tag0 = getByTestId(TAG_0);
    const cardImg1 = getByTestId(CARD_IMG_1);
    const category1 = getByTestId(CATEGORY_1);
    const recipeName1 = getByTestId(RECIPE_NAME_1);
    const date1 = getByTestId(DATE_1);
    const shareBtn1 = getByTestId(SHARE_BTN_1);
    const tag1 = getByTestId(TAG_1);

    expect(allFilter).toBeInTheDocument();
    expect(foodFilter).toBeInTheDocument();
    expect(drinkFilter).toBeInTheDocument();
    expect(cardImg0).toBeInTheDocument();
    expect(category0).toBeInTheDocument();
    expect(recipeName0).toBeInTheDocument();
    expect(date0).toBeInTheDocument();
    expect(shareBtn0).toBeInTheDocument();
    expect(tag0).toBeInTheDocument();
    expect(cardImg1).toBeInTheDocument();
    expect(category1).toBeInTheDocument();
    expect(recipeName1).toBeInTheDocument();
    expect(date1).toBeInTheDocument();
    expect(shareBtn1).toBeInTheDocument();
    expect(tag1).toBeInTheDocument();
  });

  it('Testa se os filtros funcionam corretamente', () => {
    const {
      getByTestId,
      getByText,
    } = renderWithRouter(<DoneRecipe />, testHistory);
    const allFilter = getByTestId(ALL_FILTER);
    const foodFilter = getByTestId(FOOD_FILTER);
    const drinkFilter = getByTestId(DRINK_FILTER);
    const recipeName = getByText(/Kumpir/i);

    expect(recipeName).toBeInTheDocument();
    fireEvent.click(drinkFilter);
    expect(recipeName).not.toBeInTheDocument();
    fireEvent.click(foodFilter);
    expect(recipeName).not.toBeInTheDocument();
    fireEvent.click(allFilter);
    expect(recipeName).not.toBeInTheDocument();
  });
});
