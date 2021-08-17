import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import * as requestMenu from '../../services/requestMenu';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import mealRecipeDetails from '../mocks/meals/mockMealRecipeDetails';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import drinkRecipeDetails from '../mocks/drinks/mockDrinkRecipeDetails';
import App from '../../App';

const favoriteBtnTestId = 'favorite-btn';

const mockMealPath = '/comidas/52977';
const mockDrinkPath = '/bebidas/15997';

jest
  .spyOn(requestMenu, 'searchMealByName')
  .mockImplementation(() => Promise.resolve(mealsFiltersByAll));

jest
  .spyOn(requestMenu, 'searchDrinkByName')
  .mockImplementation(() => Promise.resolve(drinksFiltersByAll));

jest
  .spyOn(requestMenu, 'mealsRecipeDetails')
  .mockImplementation(() => Promise.resolve(mealRecipeDetails));

jest
  .spyOn(requestMenu, 'drinksRecipeDetails')
  .mockImplementation(() => Promise.resolve(drinkRecipeDetails));

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});
beforeEach(() => jest.clearAllMocks());

describe(`45 - Implement the logic on the bookmark button, if clicked, the heart
icon should change its current state, if filled it should change to "unfilled"
and vice versa`, () => {
  it('Favorite food', async () => {
    renderWithRouterAndStore(<App />, { route: mockMealPath });

    expect(await screen.findByTestId(favoriteBtnTestId))
      .toHaveAttribute('src', expect.stringContaining('whiteHeartIcon'));

    fireEvent.click(await screen.findByTestId(favoriteBtnTestId));

    expect(await screen.findByTestId(favoriteBtnTestId))
      .toHaveAttribute('src', expect.stringContaining('blackHeartIcon'));
  });

  it('Disfavors the food', async () => {
    const favoriteRecipes = [{
      id: '52977',
      type: 'comida',
      area: 'Turkish',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Corba',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    renderWithRouterAndStore(<App />, { route: mockMealPath });

    expect(await screen.findByTestId(favoriteBtnTestId))
      .toHaveAttribute('src', expect.stringContaining('blackHeartIcon'));

    fireEvent.click(await screen.findByTestId(favoriteBtnTestId));

    expect(await screen.findByTestId(favoriteBtnTestId))
      .toHaveAttribute('src', expect.stringContaining('whiteHeartIcon'));
  });

  it('Favorite drink', async () => {
    renderWithRouterAndStore(<App />, { route: mockDrinkPath });

    expect(await screen.findByTestId(favoriteBtnTestId))
      .toHaveAttribute('src', expect.stringContaining('whiteHeartIcon'));

    fireEvent.click(await screen.findByTestId(favoriteBtnTestId));

    expect(await screen.findByTestId(favoriteBtnTestId))
      .toHaveAttribute('src', expect.stringContaining('blackHeartIcon'));
  });

  it('Disfavors drinking', async () => {
    const favoriteRecipes = [{
      id: '15997',
      type: 'bebida',
      area: '',
      category: 'Ordinary Drink',
      alcoholicOrNot: 'Optional alcohol',
      name: 'GG',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    renderWithRouterAndStore(<App />, { route: mockDrinkPath });

    expect(await screen.findByTestId(favoriteBtnTestId))
      .toHaveAttribute('src', expect.stringContaining('blackHeartIcon'));

    fireEvent.click(await screen.findByTestId(favoriteBtnTestId));

    expect(await screen.findByTestId(favoriteBtnTestId))
      .toHaveAttribute('src', expect.stringContaining('whiteHeartIcon'));
  });
});
