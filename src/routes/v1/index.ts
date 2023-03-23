import express from 'express';
import userApi from './user.route';
import pokemonApi from './pokemon.route';

const v1 = express.Router();

v1.use('/users', userApi);
v1.use('/pokemons', pokemonApi);

export default v1;
