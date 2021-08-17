import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import * as requestMenu from '../../services/requestMenu';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import mealRecipeDetails from '../mocks/meals/mockMealRecipeDetails';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import drinkRecipeDetails from '../mocks/drinks/mockDrinkRecipeDetails';
import App from '../../App';

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

// Como realizar o mock do clipboard https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest

const originalClipboard = { ...global.navigator.clipboard };

beforeEach(() => {
  jest.clearAllMocks();
  const mockClipboard = {
    writeText: jest.fn(),
  };
  global.navigator.clipboard = mockClipboard;
});

afterEach(() => {
  jest.clearAllMocks();
  global.navigator.clipboard = originalClipboard;
});

describe(`43 - Implement the solution so that when you click the share button, the
recipe link within the app should be copied to the clipboard and a message notifying
you that the link was copied should appear`, () => {
  it(`Checks the message "Link copiado!" and if the food recipe link was copied to the
  clipboard`, async () => {
    renderWithRouterAndStore(<App />, { route: mockMealPath });

    fireEvent.click(await screen.findByTestId('share-btn'));

    expect(await screen.findByText('Link copiado!')).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it(`Checks the message "Link copiado!" and if the drink recipe link was copied to
  the clipboard`, async () => {
    renderWithRouterAndStore(<App />, { route: mockDrinkPath });

    fireEvent.click(await screen.findByTestId('share-btn'));

    expect(await screen.findByText('Link copiado!')).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
