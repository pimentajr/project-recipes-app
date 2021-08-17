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

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});
beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

const ingredientStepTestId = 'ingredient-checkbox-step';
const finishRecipeBtnTestId = 'finish-recipe-btn';

describe(`52 - Implement the solution so that the finish recipe button can only be 
enabled when all ingredients are "checked"`, () => {
  it('Check if the end button is disabled in food recipes',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas/52977/in-progress' });

      const ingredientStep = await screen.findAllByTestId(ingredientStepTestId);
      fireEvent.click(ingredientStep[0]);
      expect(ingredientStep[0]).toBeChecked();
      expect(ingredientStep[1]).not.toBeChecked();

      expect(await screen.findByTestId(finishRecipeBtnTestId)).toBeDisabled();
    });

  it('check if the end button is enabled in food recipes',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas/52977/in-progress' });

      const ingredientStep = await screen.findAllByTestId(ingredientStepTestId);

      ingredientStep.forEach((input) => {
        fireEvent.click(input);
        expect(input).toBeChecked();
      });

      expect(await screen.findByTestId(finishRecipeBtnTestId)).not.toBeDisabled();
    });

  it('Check if the end button is disabled in drink recipes',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/bebidas/15997/in-progress' });

      const ingredientStep = await screen.findAllByTestId(ingredientStepTestId);
      fireEvent.click(ingredientStep[0]);
      expect(ingredientStep[0]).toBeChecked();
      expect(ingredientStep[1]).not.toBeChecked();

      expect(await screen.findByTestId(finishRecipeBtnTestId)).toBeDisabled();
    });

  it('Check if the end button is enabled in drink recipes',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/bebidas/15997/in-progress' });

      const ingredientStep = await screen.findAllByTestId(ingredientStepTestId);

      ingredientStep.forEach((input) => {
        fireEvent.click(input);
        expect(input).toBeChecked();
      });

      expect(await screen.findByTestId(finishRecipeBtnTestId)).not.toBeDisabled();
    });
});
