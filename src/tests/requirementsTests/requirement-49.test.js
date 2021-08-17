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

describe(`49 - Implement a logic that, when clicking on an ingredient's checkbox, its 
name must be "crossed out" from the list`, () => {
  it('Check if it is possible to mark all steps of the food recipe',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas/52977/in-progress' });

      const ingredientStep = await screen.findAllByTestId('ingredient-checkbox-step');

      ingredientStep.forEach((input) => {
        fireEvent.click(input);
        expect(input).toBeChecked();
      });
    });

  it('Check if it is possible to mark all steps of the drink recipe',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/bebidas/15997/in-progress' });

      const ingredientStep = await screen.findAllByTestId('ingredient-checkbox-step');

      ingredientStep.forEach((input) => {
        fireEvent.click(input);
        expect(input).toBeChecked();
      });
    });
});
