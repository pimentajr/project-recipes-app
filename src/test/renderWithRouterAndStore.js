import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { render } from '@testing-library/react';
import reducer from '../reducers';

// const myStore = createStore(store, applyMiddleware(thunk));

export const getStore = (initialState) => {
  if (!initialState) return createStore(reducer, applyMiddleware(thunk));
  return createStore(reducer, initialState, applyMiddleware(thunk));
};

const renderWithRouterAndStore = (Component, history, initialState) => {
  const store = getStore(initialState);
  return {
    ...render(
      <Provider store={ store }>
        <Router history={ history }>
          {Component}
        </Router>
      </Provider>,
    ),
    history,
    store,
  };
};

export default renderWithRouterAndStore;
