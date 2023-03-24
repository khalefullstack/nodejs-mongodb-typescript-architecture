import express from 'express';
import {
  getPokemonList,
  getPokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
} from '../../controllers/pokemon.controller';

const pokemonApi = express.Router();

// Get a pokemon details
pokemonApi.get('/', getPokemonList);

// Get a pokemon details
pokemonApi.get('/:id', getPokemon);

// Create a pokemon
pokemonApi.post('/create', createPokemon);

// Update a pokemon
pokemonApi.put('/:id', updatePokemon);

// Delete a pokemon
pokemonApi.delete('/:id', deletePokemon);

export default pokemonApi;
