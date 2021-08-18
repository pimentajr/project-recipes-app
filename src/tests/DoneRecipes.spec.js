import React from 'react';
import { fireEvent } from '@testing-library/react';
import fetchData from './mocks/fetch';
import { renderWithRouterAndBothContext } from './helpers/renders';
import DoneRecipes from '../pages/DoneRecipes';
import clearAndSetLsTests from './helpers/clearAndSetLSTests';

describe('Teste', () => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => fetchData(url));
  clearAndSetLsTests();

  it('1', () => {
    const {
      getByText,
      history,
    } = renderWithRouterAndBothContext(<DoneRecipes />, '/receitas-feitas');
    const aquamarine = getByText('Aquamarine');
    expect(aquamarine).toBeInTheDocument();
    fireEvent.click(aquamarine);
    console.log(window.history);
  });
});
