import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../pages/About';

describe('About', () => {
  test('Teste se a página contém as informações sobre a Pokédex',
    () => {
      renderWithRouter(<About />);
      const checkAbout = screen.getByText(/This application simulates/i);

      expect(checkAbout).toBeInTheDocument();
    });

  test('Teste se a página contém as informações sobre a Pokédex',
    () => {
      renderWithRouter(<About />);
      const checkAbout = screen.getByRole('heading', {
        name: /About Pokédex/i, level: 2 });

      expect(checkAbout).toBeInTheDocument();
    });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex',
    () => {
      const { container } = renderWithRouter(<About />);
      const paragraphs = container.querySelectorAll('p'); // sugestão do Levy
      const checkAbout1 = screen.getByText(/This application simulates/i);
      const checkAbout2 = screen.getByText(/One can filter Pokémons/i);

      expect(paragraphs).toHaveLength(2);
      expect(checkAbout1).toBeInTheDocument();
      expect(checkAbout2).toBeInTheDocument();
    });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex',
    () => {
      renderWithRouter(<About />);
      const checkImage = screen.getByAltText('Pokédex');

      expect(checkImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
});
