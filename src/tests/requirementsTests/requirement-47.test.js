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

describe(`47 - Design the screen so that it contains an image of the recipe, its title,
its category (or whether the drink is alcoholic or not), a list of ingredients with
their respective quantities and instructions`, () => {
  it('Check elements of a food recipe',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas/52977/in-progress' });

      expect(await screen.findByTestId('recipe-photo')).toBeInTheDocument();
      expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
      expect(await screen.findByTestId('share-btn')).toBeInTheDocument();
      expect(await screen.findByTestId('favorite-btn')).toBeInTheDocument();
      expect(await screen.findByTestId('recipe-category')).toBeInTheDocument();
      expect(await screen.findByTestId('0-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('1-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('2-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('3-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('4-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('5-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('6-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('7-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('8-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('9-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('10-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('11-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('12-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('instructions')).toBeInTheDocument();
      expect(await screen.findByTestId('finish-recipe-btn')).toBeInTheDocument();
    });

  it('Check elements of a drink recipe',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/bebidas/15997/in-progress' });

      expect(await screen.findByTestId('recipe-photo')).toBeInTheDocument();
      expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
      expect(await screen.findByTestId('share-btn')).toBeInTheDocument();
      expect(await screen.findByTestId('favorite-btn')).toBeInTheDocument();
      expect(await screen.findByTestId('recipe-category')).toBeInTheDocument();
      expect(await screen.findByTestId('0-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('1-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('2-ingredient-step')).toBeInTheDocument();
      expect(await screen.findByTestId('instructions')).toBeInTheDocument();
      expect(await screen.findByTestId('finish-recipe-btn')).toBeInTheDocument();
    });
});
