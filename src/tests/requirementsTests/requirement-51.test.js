import React from 'react';
import { fireEvent, screen, wait } from '@testing-library/react';
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

const shareBtnTestId = 'share-btn';
const favoriteBtnTestId = 'favorite-btn';

const mockFavoriteMealRecipes = [{
  id: '52977',
  type: 'comida',
  area: 'Turkish',
  category: 'Side',
  alcoholicOrNot: '',
  name: 'Corba',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
}];

const mockFavoriteDrinkRecipes = [{
  id: '15997',
  type: 'bebida',
  area: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Optional alcohol',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
}];

const foodInProgressPathName = { route: '/comidas/52977/in-progress' };
const drinkInProgressPathName = { route: '/bebidas/15997/in-progress' };

const originalClipboard = { ...global.navigator.clipboard };

beforeEach(() => {
  const mockClipboard = {
    writeText: jest.fn(),
  };
  global.navigator.clipboard = mockClipboard;
  jest.clearAllMocks();
  localStorage.clear();
});

afterEach(() => {
  global.navigator.clipboard = originalClipboard;
  jest.clearAllMocks();
  localStorage.clear();
});

describe(`51 - Develop favorite and share logic, recipe detail screen logic applies
here`, () => {
  it('Checks if the buttons are available on a food\'s details screen',
    async () => {
      renderWithRouterAndStore(<App />, foodInProgressPathName);

      expect(await screen.findByTestId(shareBtnTestId)).toBeInTheDocument();
      expect(await screen.findByTestId(favoriteBtnTestId)).toBeInTheDocument();
    });

  it('Check if buttons are available on a drink\'s details screen', async () => {
    renderWithRouterAndStore(<App />, drinkInProgressPathName);

    expect(await screen.findByTestId(shareBtnTestId)).toBeInTheDocument();
    expect(await screen.findByTestId(favoriteBtnTestId)).toBeInTheDocument();
  });

  it(`Check the message "Link copiado!" and if the food recipe link was copied to the
  clipboard`,
  async () => {
    renderWithRouterAndStore(<App />, foodInProgressPathName);

    fireEvent.click(await screen.findByTestId(shareBtnTestId));
    expect(await screen.findByText('Link copiado!')).toBeInTheDocument();

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it(`Check the message "Link Copiado!" and if the drink recipe link was copied to the
  clipboard`,
  async () => {
    renderWithRouterAndStore(<App />, drinkInProgressPathName);

    fireEvent.click(await screen.findByTestId(shareBtnTestId));
    expect(await screen.findByText('Link copiado!')).toBeInTheDocument();

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('Check favorite food',
    async () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteMealRecipes));

      renderWithRouterAndStore(<App />, foodInProgressPathName);

      expect(await screen.findByTestId(favoriteBtnTestId))
        .toHaveAttribute('src', expect.stringContaining('blackHeartIcon'));
    });

  it('Check non-favorite food',
    async () => {
      renderWithRouterAndStore(<App />, foodInProgressPathName);

      expect(await screen.findByTestId(favoriteBtnTestId))
        .toHaveAttribute('src', expect.stringContaining('whiteHeartIcon'));
    });

  it('Check favorite drink',
    async () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteDrinkRecipes));

      renderWithRouterAndStore(<App />, drinkInProgressPathName);

      expect(await screen.findByTestId(favoriteBtnTestId))
        .toHaveAttribute('src', expect.stringContaining('blackHeartIcon'));
    });

  it('Check non-favorite drink',
    async () => {
      renderWithRouterAndStore(<App />, drinkInProgressPathName);

      expect(await screen.findByTestId(favoriteBtnTestId))
        .toHaveAttribute('src', expect.stringContaining('whiteHeartIcon'));
    });

  it('Favorite food',
    async () => {
      renderWithRouterAndStore(<App />, foodInProgressPathName);

      expect(await screen.findByTestId(favoriteBtnTestId))
        .toHaveAttribute('src', expect.stringContaining('whiteHeartIcon'));

      fireEvent.click(await screen.findByTestId(favoriteBtnTestId));

      expect(await screen.findByTestId(favoriteBtnTestId))
        .toHaveAttribute('src', expect.stringContaining('blackHeartIcon'));
    });

  it('Disfavor food',
    async () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteMealRecipes));

      renderWithRouterAndStore(<App />, foodInProgressPathName);

      expect(await screen.findByTestId(favoriteBtnTestId))
        .toHaveAttribute('src', expect.stringContaining('blackHeartIcon'));

      fireEvent.click(await screen.findByTestId(favoriteBtnTestId));

      expect(await screen.findByTestId(favoriteBtnTestId))
        .toHaveAttribute('src', expect.stringContaining('whiteHeartIcon'));
    });

  it('Favorite drink',
    async () => {
      renderWithRouterAndStore(<App />, drinkInProgressPathName);

      expect(await screen.findByTestId(favoriteBtnTestId))
        .toHaveAttribute('src', expect.stringContaining('whiteHeartIcon'));

      fireEvent.click(await screen.findByTestId(favoriteBtnTestId));

      expect(await screen.findByTestId(favoriteBtnTestId))
        .toHaveAttribute('src', expect.stringContaining('blackHeartIcon'));
    });

  it('Disfavor drink',
    async () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavoriteDrinkRecipes));

      renderWithRouterAndStore(<App />, drinkInProgressPathName);

      expect(await screen.findByTestId(favoriteBtnTestId))
        .toHaveAttribute('src', expect.stringContaining('blackHeartIcon'));

      fireEvent.click(await screen.findByTestId(favoriteBtnTestId));

      expect(await screen.findByTestId(favoriteBtnTestId))
        .toHaveAttribute('src', expect.stringContaining('whiteHeartIcon'));
    });

  it('Favorite food recipe',
    async () => {
      renderWithRouterAndStore(<App />, foodInProgressPathName);

      fireEvent.click(await screen.findByTestId(favoriteBtnTestId));

      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const expectedFavoriteRecipes = mockFavoriteMealRecipes;

      await wait(() => expect(favoriteRecipes).toStrictEqual(expectedFavoriteRecipes));
      localStorage.clear();
    });

  it('Favorite drink recipe',
    async () => {
      renderWithRouterAndStore(<App />, drinkInProgressPathName);

      fireEvent.click(await screen.findByTestId(favoriteBtnTestId));

      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const expectedFavoriteRecipes = mockFavoriteDrinkRecipes;

      await wait(() => expect(favoriteRecipes).toStrictEqual(expectedFavoriteRecipes));
      localStorage.clear();
    });
});
