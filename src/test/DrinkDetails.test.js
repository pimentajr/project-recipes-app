import React from 'react';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import oneDrink from '../../cypress/mocks/oneDrink';
import renderWithRouter from './renderWithRouter';
import DrinkDetails from '../pages/bebidas/recipeId';

const match = {
  params: {
    recipeId: '178319',
  },
};

const PHOTO_TEST_ID = 'recipe-photo';
const RECIPE_TITLE = 'recipe-title';
const SHARE_BTN = 'share-btn';
const FAV_BTN = 'favorite-btn';
const RECIPE_CATEGORY = 'recipe-category';
const INSTRUCTIONS = 'instructions';
const START_RECIPE_BTN = 'start-recipe-btn';
const INGREDIENTS = ['0', '1', '2'];
const RECOMENDATION0 = '0-recomendation-card';
const RECOMENDATION1 = '1-recomendation-card';
const RECOMENDATION2 = '2-recomendation-card';
const RECOMENDATION3 = '3-recomendation-card';
const RECOMENDATION4 = '4-recomendation-card';
const RECOMENDATION5 = '5-recomendation-card';
const IN_PROGRESS_PATH = '/bebidas/178319/in-progress';
const API_MAX_CALLS = 3;

const testHistory = createMemoryHistory({ initialEntries: ['/bebidas/178319'] });

// afterEach(() => jest.clearAllMocks());

describe('Testa a página de detalhes da receita', () => {
  const inProgressDrink = {
    cocktails: {
      178319: [0],
    },
    meals: {},
  };

  const doneDrink = [{
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https: //www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '8/16/2021',
    tags: [],
  }];

  const mealResponse = {
    json: jest.fn().mockResolvedValue(oneDrink),
  };
  const mockOneMeal = jest.spyOn(global, 'fetch');
  mockOneMeal.mockResolvedValueOnce(mealResponse);

  afterEach(cleanup);

  it('Testa se o elemento de loading está na tela', () => {
    const {
      getByText,
    } = renderWithRouter(<DrinkDetails match={ match } />, testHistory);
    const loading = getByText(/Loading/i);

    expect(loading).toBeInTheDocument();
  });

  it('Testa se os elementos corretos estão todos na tela', async () => {
    const {
      findByTestId,
      findByText,
    } = renderWithRouter(<DrinkDetails match={ match } />, testHistory);

    const ingredientsString = await findByText(/Ingredientes/i);
    const img = await findByTestId(PHOTO_TEST_ID);
    const title = await findByTestId(RECIPE_TITLE);
    const shareBtn = await findByTestId(SHARE_BTN);
    const favBtn = await findByTestId(FAV_BTN);
    const category = await findByTestId(RECIPE_CATEGORY);
    const instructions = await findByTestId(INSTRUCTIONS);
    const startBtn = await findByTestId(START_RECIPE_BTN);
    const recomendation0 = await findByTestId(RECOMENDATION0);
    const recomendation1 = await findByTestId(RECOMENDATION1);
    const recomendation2 = await findByTestId(RECOMENDATION2);
    const recomendation3 = await findByTestId(RECOMENDATION3);
    const recomendation4 = await findByTestId(RECOMENDATION4);
    const recomendation5 = await findByTestId(RECOMENDATION5);

    await act(async () => {
      INGREDIENTS.forEach(async (el) => {
        const ingredient = await findByTestId(`${el}-ingredient-name-and-measure`);
        expect(ingredient).toBeInTheDocument();
      });
    });

    expect(ingredientsString).toBeInTheDocument();
    expect(ingredientsString).toHaveTextContent('Ingredientes');
    expect(img).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Aquamarine');
    expect(shareBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
    expect(recomendation0).toBeInTheDocument();
    expect(recomendation1).toBeInTheDocument();
    expect(recomendation2).toBeInTheDocument();
    expect(recomendation3).toBeInTheDocument();
    expect(recomendation4).toBeInTheDocument();
    expect(recomendation5).toBeInTheDocument();
    expect(mockOneMeal).toBeCalled();
    expect(mockOneMeal).toBeCalledTimes(API_MAX_CALLS);
  });

  it('Botão deve iniciar como iniciar receita e após o click, continuar receita',
    async () => {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressDrink));
      const {
        findByTestId,
      } = renderWithRouter(<DrinkDetails match={ match } />, testHistory);
      const startBtnBefore = await findByTestId(START_RECIPE_BTN);
      expect(startBtnBefore).toHaveTextContent('Continuar Receita');
    });

  it('Espera que o botão de iniciar ou continuar receita não exista', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneDrink));
    const {
      queryByTestId,
    } = renderWithRouter(<DrinkDetails match={ match } />, testHistory);
    await wait(() => {
      const startBtn = queryByTestId(START_RECIPE_BTN);
      expect(startBtn).not.toBeInTheDocument();
    });
  });

  it('Espera que a página seja redirecionada corretamente', async () => {
    localStorage.clear();
    const {
      findByTestId,
      history,
    } = renderWithRouter(<DrinkDetails match={ match } />, testHistory);
    const startBtn = await findByTestId(START_RECIPE_BTN);
    fireEvent.click(startBtn);
    expect(history.location.pathname).toEqual(IN_PROGRESS_PATH);
  });
});
