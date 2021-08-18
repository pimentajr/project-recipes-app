import React from 'react';
import { createMemoryHistory } from 'history';
import renderWithRouter from './renderWithRouter';
import NotFound from '../pages/not-found';

const testHistory = createMemoryHistory({ initialEntries: ['/explorar/bebidas/area'] });

describe('Testa a página not found', () => {
  it('Testa se o texto Not Found existe', () => {
    const {
      getByText,
    } = renderWithRouter(<NotFound />, testHistory);
    const notFoundText = getByText(/Not Found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
