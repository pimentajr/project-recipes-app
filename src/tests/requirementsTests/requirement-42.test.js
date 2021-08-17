import React from 'react';
import { screen } from '@testing-library/react';
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

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe('42 - Implement a share button and a favorite recipe button', () => {
  it('Checks if the buttons are available in the details screen of a food', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas/52977' });

    expect(await screen.findByTestId('share-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('favorite-btn')).toBeInTheDocument();
  });

  it('Checks if buttons are available on a drink\'s details screen', async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas/15997' });

    expect(await screen.findByTestId('share-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('favorite-btn')).toBeInTheDocument();
  });
});
