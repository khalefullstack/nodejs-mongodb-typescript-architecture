import express from 'express';
import {
  createPokemonCategory,
  getPokemonCategories,
  updatePokemonCategory,
  getPokemonCategory,
  deletePokemonCategory,
} from '../../controllers/pokemonCategory.controller';

const pokemonCategoryApi = express.Router();

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

// Get a pokemon list
pokemonCategoryApi.get('/', getPokemonCategories);

// Get a pokemon details
pokemonCategoryApi.get('/:id', getPokemonCategory);

// Create a pokemon
pokemonCategoryApi.post('/create', createPokemonCategory);

// Update a pokemon
pokemonCategoryApi.put('/:id', updatePokemonCategory);

// Delete a pokemon
pokemonCategoryApi.delete('/:id', deletePokemonCategory);

// pokemonApi.get('/:id', loadPokemon, function (req: Request, res: Response) {
//   res.send('Viewing user ' + req.pokemon.name);
// });

export default pokemonCategoryApi;
