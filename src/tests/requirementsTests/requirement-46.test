import React from 'react';
import { screen, fireEvent, wait } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import * as requestMenu from '../../services/requestMenu';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import mealRecipeDetails from '../mocks/meals/mockMealRecipeDetails';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import drinkRecipeDetails from '../mocks/drinks/mockDrinkRecipeDetails';
import App from '../../App';

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

describe('46 - Save favorite recipes in localStorage under favoriteRecipes key', () => {
  it('Checks if after favorite food recipe, it is correctly saved in localStorage',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas/52977' });

      fireEvent.click(await screen.findByTestId('favorite-btn'));

      const expectedFavoriteMealRecipes = [{
        id: '52977',
        type: 'comida',
        area: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      }];

      await wait(() => expect(
        JSON.parse(localStorage.getItem('favoriteRecipes')),
      ).toStrictEqual(expectedFavoriteMealRecipes));
    });

  it('Checks if after favorite drink recipe, it is correctly saved in localStorage',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/bebidas/15997' });

      fireEvent.click(await screen.findByTestId('favorite-btn'));

      const expectedFavoriteDrinkRecipes = [{
        id: '15997',
        type: 'bebida',
        area: '',
        category: 'Ordinary Drink',
        alcoholicOrNot: 'Optional alcohol',
        name: 'GG',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      }];

      await wait(() => expect(
        JSON.parse(localStorage.getItem('favoriteRecipes')),
      ).toStrictEqual(expectedFavoriteDrinkRecipes));
    });
});
