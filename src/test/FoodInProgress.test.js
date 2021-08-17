import React from 'react';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FoodInProgress from '../pages/comidas/recipeId/in-progress';

const PHOTO_TEST_ID = 'recipe-photo';
const RECIPE_TITLE = 'recipe-title';
const SHARE_BTN = 'share-btn';
const FAV_BTN = 'favorite-btn';
const RECIPE_CATEGORY = 'recipe-category';
const INSTRUCTIONS = 'instructions';
const FINISH_RECIPE_BTN = 'finish-recipe-btn';
const INGREDIENT0 = '0-ingredient-step';
const INGREDIENT1 = '1-ingredient-step';
const INGREDIENT2 = '2-ingredient-step';
const INGREDIENT3 = '3-ingredient-step';
const INGREDIENT4 = '4-ingredient-step';
const INGREDIENT5 = '5-ingredient-step';
const INGREDIENT6 = '6-ingredient-step';
const INGREDIENT7 = '7-ingredient-step';
const CHECKBOX0 = '0-checkbox';
const CHECKBOX1 = '1-checkbox';
const CHECKBOX2 = '2-checkbox';
const CHECKBOX3 = '3-checkbox';
const CHECKBOX4 = '4-checkbox';
const CHECKBOX5 = '5-checkbox';
const CHECKBOX6 = '6-checkbox';
const CHECKBOX7 = '7-checkbox';

const match = {
  params: {
    recipeId: '52771',
  },
};

const testHistory = createMemoryHistory(
  { initialEntries: ['/comidas/52771/in-progress'] },
);

afterEach(() => jest.clearAllMocks());

describe('Testa a página de detalhes da receita', () => {
  it('Testa se o elemento de loading está na tela', () => {
    renderWithRouter(<FoodInProgress match={ match } />, testHistory);
    const loading = screen.getByText(/Loading/i);

    expect(loading).toBeInTheDocument();
  });

  it('Testa se os elementos corretos estão todos na tela', async () => {
    await act(async () => {
      renderWithRouter(<FoodInProgress match={ match } />, testHistory);
    });
    const ingredientsString = await screen.findByText(/Ingredientes/i);
    const img = await screen.findByTestId(PHOTO_TEST_ID);
    const title = await screen.findByTestId(RECIPE_TITLE);
    const shareBtn = await screen.findByTestId(SHARE_BTN);
    const favBtn = await screen.findByTestId(FAV_BTN);
    const category = await screen.findByTestId(RECIPE_CATEGORY);
    const instructions = await screen.findByTestId(INSTRUCTIONS);
    const finishBtn = await screen.findByTestId(FINISH_RECIPE_BTN);
    const ing0 = await screen.findByTestId(INGREDIENT0);
    const ing1 = await screen.findByTestId(INGREDIENT1);
    const ing2 = await screen.findByTestId(INGREDIENT2);
    const ing3 = await screen.findByTestId(INGREDIENT3);
    const ing4 = await screen.findByTestId(INGREDIENT4);
    const ing5 = await screen.findByTestId(INGREDIENT5);
    const ing6 = await screen.findByTestId(INGREDIENT6);
    const ing7 = await screen.findByTestId(INGREDIENT7);

    expect(ingredientsString).toBeInTheDocument();
    expect(ingredientsString).toHaveTextContent('Ingredientes');
    expect(img).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(ing0).toBeInTheDocument();
    expect(ing0).toHaveTextContent('penne rigate : 1 pound');
    expect(ing1).toBeInTheDocument();
    expect(ing2).toBeInTheDocument();
    expect(ing3).toBeInTheDocument();
    expect(ing4).toBeInTheDocument();
    expect(ing5).toBeInTheDocument();
    expect(ing6).toBeInTheDocument();
    expect(ing7).toBeInTheDocument();
    expect(title).toHaveTextContent('Spicy Arrabiata Penne');
    expect(shareBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(finishBtn).toBeInTheDocument();
  });

  it('Testa se o ingrediente é marcado com check ao clicar nele', async () => {
    await act(async () => {
      renderWithRouter(<FoodInProgress match={ match } />, testHistory);
    });
    const ing0Before = await screen.findByTestId(CHECKBOX0);
    const ing1 = await screen.findByTestId(CHECKBOX1);

    expect(ing0Before).toBeInTheDocument();
    expect(ing0Before.attributes).not.toHaveProperty('checked');
    fireEvent.click(ing0Before);
    expect(ing0Before.attributes).toHaveProperty('checked');

    const ing0After = await screen.findByTestId(CHECKBOX0);
    expect(ing0After.attributes).toHaveProperty('checked');
    fireEvent.click(ing0After);
    expect(ing0After.attributes).not.toHaveProperty('checked');

    expect(ing1).toBeInTheDocument();
    expect(ing1.attributes).not.toHaveProperty('checked');
    fireEvent.click(ing1);
    expect(ing1.attributes).toHaveProperty('checked');
  });

  it(
    'O botão de finalizar tarefa está desativado até todos itens estarem marcados',
    async () => {
      const {
        findByTestId,
      } = renderWithRouter(<FoodInProgress match={ match } />, testHistory);
      const finishBtnBeforeCheck = await findByTestId(FINISH_RECIPE_BTN);
      const ing0 = await screen.findByTestId(CHECKBOX0);
      const ing2 = await findByTestId(CHECKBOX2);
      const ing3 = await findByTestId(CHECKBOX3);
      const ing4 = await findByTestId(CHECKBOX4);
      const ing5 = await findByTestId(CHECKBOX5);
      const ing6 = await findByTestId(CHECKBOX6);
      const ing7 = await findByTestId(CHECKBOX7);
      expect(finishBtnBeforeCheck).toBeDisabled();
      fireEvent.click(ing0);
      fireEvent.click(ing2);
      fireEvent.click(ing3);
      fireEvent.click(ing4);
      fireEvent.click(ing5);
      fireEvent.click(ing6);
      fireEvent.click(ing7);
      const finishAfterCheck = await findByTestId(FINISH_RECIPE_BTN);
      expect(finishAfterCheck).not.toBeDisabled();
    },
  );

  it('O botão de finalizar tarefa redireciona para receitas feitas', async () => {
    const {
      findByTestId,
      history,
    } = renderWithRouter(<FoodInProgress match={ match } />, testHistory);
    const finishBtn = await findByTestId(FINISH_RECIPE_BTN);
    fireEvent.click(finishBtn);
    expect(history.location.pathname).toEqual('/receitas-feitas');
  });
});
