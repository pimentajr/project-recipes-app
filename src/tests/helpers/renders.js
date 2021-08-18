import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import LSProvider from '../../context/LSProvider';
import MainProvider from '../../context/MainProvider';

export function renderWithRouter(component, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);
  return render(component, { wrapper: BrowserRouter });
}

export function renderWithLSContext(component, { ...renderOptions }) {
  return render(
    <LSProvider>{ component }</LSProvider>,
    renderOptions,
  );
}

export function renderWithMainContext(component, { ...renderOptions }) {
  return render(
    <MainProvider>{ component }</MainProvider>,
    renderOptions,
  );
}

export function renderWithRouterAndBothContext(
  component,
  { route = '/' } = {},
) {
  let testLocation;
  return {
    ...render(
      <LSProvider>
        <MainProvider>
          <MemoryRouter initialEntries={ [route] }>
            { component }
            <Route
              path="*"
              render={ ({ location }) => {
                testLocation = location;
                return null;
              } }
            />
          </MemoryRouter>
        </MainProvider>
      </LSProvider>,
    ),
    location: testLocation,
  };
}
