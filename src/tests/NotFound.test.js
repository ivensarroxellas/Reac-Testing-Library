import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../pages/NotFound';

describe('NotFound', () => {
  test('Teste mensagem No favorite, caso a pessoa não tenha pokémons favoritos',
    () => {
      renderWithRouter(<NotFound />);
      const checkNotFound = screen.getByRole('heading', {
        name: /Page requested not found/i, level: 2 });

      expect(checkNotFound).toBeInTheDocument();
    });

  test('Teste se a página mostra a imagem',
    () => {
      renderWithRouter(<NotFound />);
      const checkImage = screen.getByAltText(/Pikachu crying/i);

      expect(checkImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
