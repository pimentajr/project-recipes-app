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

const firstirstIngredientNameAndMeasure = '0-ingredient-name-and-measure';
const secondIngredientNameAndMeasure = '1-ingredient-name-and-measure';
const thirdIngredientNameAndMeasure = '2-ingredient-name-and-measure';
const fourthIngredientNameAndMeasure = '3-ingredient-name-and-measure';
const fifthIngredientNameAndMeasure = '4-ingredient-name-and-measure';
const sixthIngredientNameAndMeasure = '5-ingredient-name-and-measure';
const seventhIngredientNameAndMeasure = '6-ingredient-name-and-measure';
const eighthIngredientNameAndMeasure = '7-ingredient-name-and-measure';
const ninthIngredientNameAndMeasure = '8-ingredient-name-and-measure';
const tenthIngredientNameAndMeasure = '9-ingredient-name-and-measure';
const eleventhIngredientNameAndMeasure = '10-ingredient-name-and-measure';
const twelfthIngredientNameAndMeasure = '11-ingredient-name-and-measure';
const thirteenthIngredientNameAndMeasure = '12-ingredient-name-and-measure';

describe(`35 - Design the screen so that it contains an image of the recipe, the title,
the category (or whether or not you are alcoholic), a list of ingredients followed by the
quantities, instructions, a "drunk" youtube video, and recommendations`, () => {
  it('Check if the elements described in the prototype exist in the food details screen',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas/52977' });

      expect((await screen.findByTestId('recipe-photo')).tagName).toBe('IMG');
      expect(await screen.findByTestId('recipe-title')).toHaveTextContent('Corba');
      expect(await screen.findByTestId('recipe-category')).toHaveTextContent('Side');
      expect(await screen.findByTestId(firstirstIngredientNameAndMeasure))
        .toHaveTextContent('Lentils');
      expect(await screen.findByTestId(firstirstIngredientNameAndMeasure))
        .toHaveTextContent('1 cup');
      expect(await screen.findByTestId(secondIngredientNameAndMeasure))
        .toHaveTextContent('Onion');
      expect(await screen.findByTestId(secondIngredientNameAndMeasure))
        .toHaveTextContent('1 large');
      expect(await screen.findByTestId(thirdIngredientNameAndMeasure))
        .toHaveTextContent('Carrots');
      expect(await screen.findByTestId(thirdIngredientNameAndMeasure))
        .toHaveTextContent('1 large');
      expect(await screen.findByTestId(fourthIngredientNameAndMeasure))
        .toHaveTextContent('Tomato Puree');
      expect(await screen.findByTestId(fourthIngredientNameAndMeasure))
        .toHaveTextContent('1 tbs');
      expect(await screen.findByTestId(fifthIngredientNameAndMeasure))
        .toHaveTextContent('Cumin');
      expect(await screen.findByTestId(fifthIngredientNameAndMeasure))
        .toHaveTextContent('2 tsp');
      expect(await screen.findByTestId(sixthIngredientNameAndMeasure))
        .toHaveTextContent('Paprika');
      expect(await screen.findByTestId(sixthIngredientNameAndMeasure))
        .toHaveTextContent('1 tsp');
      expect(await screen.findByTestId(seventhIngredientNameAndMeasure))
        .toHaveTextContent('Mint');
      expect(await screen.findByTestId(seventhIngredientNameAndMeasure))
        .toHaveTextContent('1/2 tsp');
      expect(await screen.findByTestId(eighthIngredientNameAndMeasure))
        .toHaveTextContent('Thyme');
      expect(await screen.findByTestId(eighthIngredientNameAndMeasure))
        .toHaveTextContent('1/2 tsp');
      expect(await screen.findByTestId(ninthIngredientNameAndMeasure))
        .toHaveTextContent('Black Pepper');
      expect(await screen.findByTestId(ninthIngredientNameAndMeasure))
        .toHaveTextContent('1/4 tsp');
      expect(await screen.findByTestId(tenthIngredientNameAndMeasure))
        .toHaveTextContent('Red Pepper Flakes');
      expect(await screen.findByTestId(tenthIngredientNameAndMeasure))
        .toHaveTextContent('1/4 tsp');
      expect(await screen.findByTestId(eleventhIngredientNameAndMeasure))
        .toHaveTextContent('Vegetable Stock');
      expect(await screen.findByTestId(eleventhIngredientNameAndMeasure))
        .toHaveTextContent('4 cups');
      expect(await screen.findByTestId(twelfthIngredientNameAndMeasure))
        .toHaveTextContent('Water');
      expect(await screen.findByTestId(twelfthIngredientNameAndMeasure))
        .toHaveTextContent('1 cup');
      expect(await screen.findByTestId(thirteenthIngredientNameAndMeasure))
        .toHaveTextContent('Sea Salt');
      expect(await screen.findByTestId(thirteenthIngredientNameAndMeasure))
        .toHaveTextContent('Pinch');
      expect(await screen.findByTestId('instructions'))
        .toHaveTextContent(mealRecipeDetails.meals[0].strInstructions);
      expect(await screen.findByTestId('video')).toBeInTheDocument();
      expect(await screen.findByTestId('video')).toHaveAttribute('src', 'https://www.youtube.com/embed/VVnZd8A84z4');
      expect(await screen.findByTestId('0-recomendation-card')).toBeInTheDocument();
      expect(await screen.findByTestId('1-recomendation-card')).toBeInTheDocument();
      expect(await screen.findByTestId('2-recomendation-card')).toBeInTheDocument();
      expect(await screen.findByTestId('3-recomendation-card')).toBeInTheDocument();
      expect(await screen.findByTestId('4-recomendation-card')).toBeInTheDocument();
      expect(await screen.findByTestId('5-recomendation-card')).toBeInTheDocument();
    });

  it(`Check if the elements described in the prototype exist in the drink details
  screen`, async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas/15997' });

    expect((await screen.findByTestId('recipe-photo')).tagName).toBe('IMG');
    expect(await screen.findByTestId('recipe-title')).toHaveTextContent('GG');
    expect(await screen.findByTestId('recipe-category'))
      .toHaveTextContent('Optional alcohol');
    expect(await screen.findByTestId(firstirstIngredientNameAndMeasure))
      .toHaveTextContent('Galliano');
    expect(await screen.findByTestId(firstirstIngredientNameAndMeasure))
      .toHaveTextContent('2 1/2 shots');
    expect(await screen.findByTestId(secondIngredientNameAndMeasure))
      .toHaveTextContent('Ginger ale');
    expect(await screen.findByTestId(thirdIngredientNameAndMeasure))
      .toHaveTextContent('Ice');
    expect(await screen.findByTestId('instructions'))
      .toHaveTextContent(drinkRecipeDetails.drinks[0].strInstructions);
    expect(screen.queryByTestId('video')).not.toBeInTheDocument();
    expect(await screen.findByTestId('0-recomendation-card')).toBeInTheDocument();
    expect(await screen.findByTestId('1-recomendation-card')).toBeInTheDocument();
    expect(await screen.findByTestId('2-recomendation-card')).toBeInTheDocument();
    expect(await screen.findByTestId('3-recomendation-card')).toBeInTheDocument();
    expect(await screen.findByTestId('4-recomendation-card')).toBeInTheDocument();
    expect(await screen.findByTestId('5-recomendation-card')).toBeInTheDocument();
  });
});
