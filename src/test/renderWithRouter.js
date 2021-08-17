import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

const renderWithRouter = (Component, history) => ({
  ...render(
    <Router history={ history }>
      {Component}
    </Router>,
  ),
  history,
});

export default renderWithRouter;
