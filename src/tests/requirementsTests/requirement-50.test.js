import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
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

// Como fazer o mock do window.location.reload https://stackoverflow.com/questions/55712640/jest-testing-window-location-reload

const { reload } = window.location;

beforeAll(() => {
  Object.defineProperty(window.location, 'reload', {
    configurable: true,
  });
  window.location.reload = jest.fn();
});

afterAll(() => {
  window.location.reload = reload;
});

describe(`50 - Save the progress status, which should be kept if the person refreshes 
the page or goes back to the same recipe`, () => {
  it('Saves the progress of a food recipe in progress',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas/52977/in-progress' });

      const ingredientStep = await screen.findAllByTestId('ingredient-checkbox-step');
      fireEvent.click(ingredientStep[0]);
      expect(ingredientStep[0]).toBeChecked();
      expect(ingredientStep[1]).not.toBeChecked();

      window.location.reload();
      expect(window.location.reload).toHaveBeenCalled();

      expect(ingredientStep[0]).toBeChecked();
      expect(ingredientStep[1]).not.toBeChecked();
    });

  it('Saves the progress of a drink recipe in progress',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/bebidas/15997/in-progress' });

      const ingredientStep = await screen.findAllByTestId('ingredient-checkbox-step');
      fireEvent.click(ingredientStep[0]);
      expect(ingredientStep[0]).toBeChecked();
      expect(ingredientStep[1]).not.toBeChecked();

      window.location.reload();
      expect(window.location.reload).toHaveBeenCalled();

      expect(ingredientStep[0]).toBeChecked();
      expect(ingredientStep[1]).not.toBeChecked();
    });
});
