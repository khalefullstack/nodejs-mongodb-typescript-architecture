import express, { NextFunction, Request, Response } from 'express';
import {
  createPokemon,
  getPokemonList,
} from '../../controllers/pokemon.controller';

const pokemonApi = express.Router();

// Dummy pokemon
// const pokemons = [
//   { id: 0, name: 'tj' },
//   { id: 1, name: 'ciaran' },
//   {
//     id: 2,
//     name: 'aaron',
//   },
// ];

// function loadPokemon(req: Request, res: Response, next: NextFunction) {
//   // You would fetch your user from the db
//   const pokemon = pokemons[req.params.id];
//
//   if (pokemon) {
//     req.pokemon = pokemon;
//
//     next();
//   } else {
//     next(new Error('Failed to load user ' + req.params.id));
//   }
// }

// Get pokemon list
pokemonApi.get('/', getPokemonList);

// Create pokemon
pokemonApi.post('/create', createPokemon);

// pokemonApi.get('/:id', loadPokemon, function (req: Request, res: Response) {
//   res.send('Viewing user ' + req.pokemon.name);
// });

export default pokemonApi;
