import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import * as requestMenu from '../../services/requestMenu';
import mealRecipeDetails from '../mocks/meals/mockMealRecipeDetails';
import drinkRecipeDetails from '../mocks/drinks/mockDrinkRecipeDetails';
import App from '../../App';

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
beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe(`53 - Redirect the user after clicking the "Finish recipe" button to the 
recipes made page, whose route should be /recipes-made`, () => {
  it('Redirects after completing a food recipe',
    async () => {
      const { history } = renderWithRouterAndStore(
        <App />, { route: '/comidas/52977/in-progress' },
      );

      const ingredientStep = await screen.findAllByTestId('ingredient-checkbox-step');

      ingredientStep.forEach((input) => {
        fireEvent.click(input);
        expect(input).toBeChecked();
      });

      fireEvent.click(await screen.findByTestId('finish-recipe-btn'));

      const { location: { pathname } } = history;
      expect(pathname).toBe('/receitas-feitas');
    });

  it('Redirects after completing a drink recipe',
    async () => {
      const { history } = renderWithRouterAndStore(
        <App />, { route: '/bebidas/15997/in-progress' },
      );

      const ingredientStep = await screen.findAllByTestId('ingredient-checkbox-step');

      ingredientStep.forEach((input) => {
        fireEvent.click(input);
        expect(input).toBeChecked();
      });

      fireEvent.click(await screen.findByTestId('finish-recipe-btn'));

      const { location: { pathname } } = history;
      expect(pathname).toBe('/receitas-feitas');
    });
});
