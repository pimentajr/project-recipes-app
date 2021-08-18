import { fireEvent } from '@testing-library/react';
import fetchData from './mocks/fetch';
import { renderWithRouterAndBothContext } from './helpers/renders';
import clearAndSetLsTests from './helpers/clearAndSetLSTests';

describe('Teste', () => {
  // jest.spyOn(global, 'fetch').mockImplementation((url) => fetchData(url));
  clearAndSetLsTests();

  it('1', () => {
    const {
      getByText,
      location,
    } = renderWithRouterAndBothContext('/receitas-feitas');
    const aquamarine = getByText('Aquamarine');
    console.log(location());
    expect(aquamarine).toBeInTheDocument();
    fireEvent.click(aquamarine);
    console.log(location());
  });
});
