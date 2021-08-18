import React from 'react';
import { fireEvent } from '@testing-library/react';
import ExplorarBebidas from '../pages/explorar/bebidas';
import renderWithRouterAndStore from './testConfig';
import oneDrink from '../../cypress/mocks/oneDrink';

describe('Testa a página ExplorarBebidas', () => {
  const drinkResponse = {
    json: jest.fn().mockResolvedValue(oneDrink),
  };
  const mockOneDrink = jest.spyOn(global, 'fetch');
  mockOneDrink.mockResolvedValueOnce(drinkResponse);

  it('Tem o botão Por Ingredientes', () => {
    const { getByTestId } = renderWithRouterAndStore(<ExplorarBebidas />);
    const btnByIngredients = getByTestId('explore-by-ingredient');
    expect(btnByIngredients).toBeInTheDocument();
  });

  it('Tem o botão Me Surpreenda!', () => {
    const { getByTestId } = renderWithRouterAndStore(<ExplorarBebidas />);
    const btnSurpriseMe = getByTestId('explore-surprise');
    expect(btnSurpriseMe).toBeInTheDocument();
  });

  it('Tem apenas dois botões na página', () => {
    const { getAllByRole } = renderWithRouterAndStore(<ExplorarBebidas />);
    const buttons = getAllByRole('button');
    expect(buttons[0].innerHTML).toBe('Por Ingredientes');
    expect(buttons[1].innerHTML).toBe('Me Surpreenda!');
  });

  it('Testa o mock', () => {
    const { getByTestId } = renderWithRouterAndStore(<ExplorarBebidas />);
    const btn = getByTestId('explore-surprise');
    fireEvent.click(btn);
    expect(mockOneDrink).toBeCalled();
  });
});
