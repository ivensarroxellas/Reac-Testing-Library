import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Pokedex', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<App />);
      const checkTitle = screen.getByRole('heading', {
        name: /Encountered pokémons/i, level: 2 });

      expect(checkTitle).toBeInTheDocument();
    });
  test('Teste se é exibido o próximo pokémon quando o botão Próximo pokémon é clicado',
    () => {
      renderWithRouter(<App />);
      const checkFire = screen.getByRole('button', { name: /Fire/i });
      userEvent.click(checkFire);
      const charmander = screen.getByText('Charmander');
      expect(charmander).toBeInTheDocument();
      const checkNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(checkNextPokemon);
      const rapidash = screen.getByText('Rapidash');
      expect(rapidash).toBeInTheDocument();
      userEvent.click(checkFire);
      expect(charmander).toBeInTheDocument();
    });
  test('Teste se é mostrado apenas um pokémon por vez',
    () => {
      const tres = 3;
      const { container } = renderWithRouter(<App />);
      const paragraphs = container.querySelectorAll('p');
      expect(paragraphs).toHaveLength(tres);
    });
  test('Teste se a Pokédex tem os botões de filtro',
    () => {
      renderWithRouter(<App />);
      const sete = 7;
      const all = screen.getByRole('button', { name: /All/i });
      const pokemonButtonFilter = screen.getAllByTestId('pokemon-type-button');
      const electric = screen.getByRole('button', { name: /Electric/i });
      const fire = screen.getByRole('button', { name: /Fire/i });
      const bug = screen.getByRole('button', { name: /Bug/i });
      const poison = screen.getByRole('button', { name: /Poison/i });
      const psychic = screen.getByRole('button', { name: /Psychic/i });
      const normal = screen.getByRole('button', { name: /Normal/i });
      const dragon = screen.getByRole('button', { name: /Dragon/i });
      expect(pokemonButtonFilter).toHaveLength(sete);
      expect(all).toBeInTheDocument();
      expect(electric).toBeInTheDocument();
      expect(fire).toBeInTheDocument();
      expect(bug).toBeInTheDocument();
      expect(poison).toBeInTheDocument();
      expect(psychic).toBeInTheDocument();
      expect(normal).toBeInTheDocument();
      expect(dragon).toBeInTheDocument();
      userEvent.click(fire);
      const { getByText } = within(screen.getByTestId('pokemon-type'));
      expect(getByText('Fire')).toBeInTheDocument();
    });
  test('Teste se a Pokédex tem os botões de filtro',
    () => {
      renderWithRouter(<App />);
      const all = screen.getByRole('button', { name: /All/i });
      const { getByText } = within(screen.getByRole('button', { name: /All/i }));
      expect(getByText('All')).toBeInTheDocument();
      userEvent.click(all);
      const firstPokemon = screen.getByText('Pikachu');
      expect(firstPokemon).toBeInTheDocument();
    });
});
