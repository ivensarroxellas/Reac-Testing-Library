import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('FavoritePokemons', () => {
  test('Teste mensagem No favorite, caso a pessoa não tenha pokémons favoritos',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const checkMessage = screen.getByText(/No favorite pokemon found/i);

      expect(checkMessage).toBeInTheDocument();
    });
});
