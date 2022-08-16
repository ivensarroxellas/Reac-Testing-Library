import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

function renderWithRouter(Component) {
  const history = createMemoryHistory();
  const renderProps = render(
    <Router history={ history }>
      {Component}
    </Router>,
  );
  return {
    ...renderProps,
    history,
  };
}

export default renderWithRouter;
