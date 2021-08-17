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

describe(`33 - Implement the elements of a recipe details screen respecting the
attributes described in the prototype`, () => {
  it('The food screen has all data-testid attributes.', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas/52977' });

    expect(await screen.findByTestId('recipe-photo'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('recipe-title'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('share-btn'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('favorite-btn'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('recipe-category'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('0-ingredient-name-and-measure'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('instructions'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('video'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('0-recomendation-card'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('start-recipe-btn'))
      .toBeInTheDocument();
  });

  it('The drinks screen has all data-tested attributes.', async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas/15997' });

    expect(await screen.findByTestId('recipe-photo'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('recipe-title'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('share-btn'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('favorite-btn'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('recipe-category'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('0-ingredient-name-and-measure'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('instructions'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('0-recomendation-card'))
      .toBeInTheDocument();
    expect(await screen.findByTestId('start-recipe-btn'))
      .toBeInTheDocument();
  });
});
