import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const link = '/pokemons/4';

describe('App', () => {
  test('Testa se o card Pokemon é renderizado',
    () => {
      renderWithRouter(<App />);
      const fire = screen.getByRole('button', { name: /Fire/i });
      userEvent.click(fire);
      const { getByText } = within(screen.getByTestId('pokemon-name'));
      const checkType = screen.getByTestId('pokemon-type');
      const checkWeight = screen.getByText(/Average weight: 8.5 kg/i);
      const checkImg = screen.getByAltText('Charmander sprite');

      expect(getByText('Charmander')).toBeInTheDocument();
      expect(checkType.textContent).toBe('Fire');
      expect(checkWeight).toBeInTheDocument();
      expect(checkImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
    });
  test('Teste se o card do pokémon contém um link de navegação', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    const fire = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(fire);
    expect(moreDetails).toHaveAttribute('href', link);
  });
  test('Teste se é feito o redirecionamento para a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const fire = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(fire);
    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    const charmanderDetails = screen.getByRole('heading', {
      name: /Charmander Detail/i, level: 2 });
    expect(charmanderDetails).toBeInTheDocument();
    expect(history.location.pathname).toBe(link);
  });
  test('Teste se é feito o redirecionamento para a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(link);

    const favoriteCheck = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(favoriteCheck);

    const favorited = screen.getByAltText(/Charmander is marked as favorite/i);
    expect(favorited).toHaveAttribute('alt', 'Charmander is marked as favorite');
    expect(favorited).toHaveAttribute('src', '/star-icon.svg');
  });
});
