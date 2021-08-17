import React from 'react';
import { screen } from '@testing-library/react';
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

describe('48 - Develop a checkbox for each item on the ingredient list', () => {
  it('All ingredients of a food recipe have a checkbox',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas/52977/in-progress' });

      const ingredientStep = await screen.findAllByTestId('ingredient-checkbox-step');

      ingredientStep.forEach((input) => {
        expect(input).not.toBeChecked();
      });
    });

  it('All ingredients of a drink recipe have a checkbox',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/bebidas/15997/in-progress' });

      const ingredientStep = await screen.findAllByTestId('ingredient-checkbox-step');

      ingredientStep.forEach((input) => {
        expect(input).not.toBeChecked();
      });
    });
});
