import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('App', () => {
  test('Testa se o topo da aplicação possui conjuto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);
      const Navegation = screen.getAllByRole('link');
      const checkHome = screen.getByRole('link', { name: /Home/i });
      const checkAbout = screen.getByRole('link', { name: /About/i });
      const checkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

      expect(Navegation[0]).toBe(checkHome);
      expect(Navegation[1]).toBe(checkAbout);
      expect(Navegation[2]).toBe(checkFavorite);
    });
  test('Teste se a aplicação é redirecionada para a página inicial',
    () => {
      renderWithRouter(<App />);
      const checkHome = screen.getByRole('link', { name: /Home/i });
      userEvent.click(checkHome);
      const title = screen.getByRole('heading', {
        name: /Encountered pokémons/i, level: 2 });
      expect(title).toBeInTheDocument();
    });
  test('Teste se a aplicação é redirecionada para a página de About',
    () => {
      renderWithRouter(<App />);
      const checkAbout = screen.getByRole('link', { name: /About/i });
      userEvent.click(checkAbout);
      const title = screen.getByRole('heading', {
        name: /About Pokédex/i, level: 2 });
      expect(title).toBeInTheDocument();
    });
  test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados',
    () => {
      renderWithRouter(<App />);
      const checkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
      userEvent.click(checkFavorite);
      const title = screen.getByRole('heading', {
        name: /Favorite pokémons/i, level: 2 });
      expect(title).toBeInTheDocument();
    });
  test('Ao entrar com URL desconhecida carrega Not Found',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pikahu');

      const checkNotFound = screen.getByRole('heading', {
        name: /Page requested not found/i, level: 2 });
      expect(checkNotFound).toBeInTheDocument();
    });
});
