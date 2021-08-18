import React from 'react';
import { fireEvent } from '@testing-library/react';
import ExplorarComidas from '../pages/explorar/comidas';
import renderWithRouterAndStore from './testConfig';
import oneMeal from '../../cypress/mocks/oneMeal';

describe('Testa a página ExplorarComidas', () => {
  const mealResponse = {
    json: jest.fn().mockResolvedValue(oneMeal),
  };
  const mockOneMeal = jest.spyOn(global, 'fetch');
  mockOneMeal.mockResolvedValueOnce(mealResponse);

  it('Tem o botão Por Ingredientes', () => {
    const { getByTestId } = renderWithRouterAndStore(<ExplorarComidas />);
    const btnByIngredients = getByTestId('explore-by-ingredient');
    expect(btnByIngredients).toBeInTheDocument();
  });

  it('Tem o botão Por Local de Origem', () => {
    const { getByTestId } = renderWithRouterAndStore(<ExplorarComidas />);
    const btnByArea = getByTestId('explore-by-area');
    expect(btnByArea).toBeInTheDocument();
  });

  it('Tem o botão Me Surpreenda!', () => {
    const { getByTestId } = renderWithRouterAndStore(<ExplorarComidas />);
    const btnSurpriseMe = getByTestId('explore-surprise');
    expect(btnSurpriseMe).toBeInTheDocument();
  });

  it('Tem três botões na página', () => {
    const { getAllByRole } = renderWithRouterAndStore(<ExplorarComidas />);
    const buttons = getAllByRole('button');
    expect(buttons[0].innerHTML).toBe('Por Ingredientes');
    expect(buttons[1].innerHTML).toBe('Por Local de Origem');
    expect(buttons[2].innerHTML).toBe('Me Surpreenda!');
  });

  it('Testa o mock', () => {
    const { getByTestId } = renderWithRouterAndStore(<ExplorarComidas />);
    const btn = getByTestId('explore-surprise');
    fireEvent.click(btn);
    expect(mockOneMeal).toBeCalled();
  });
});
