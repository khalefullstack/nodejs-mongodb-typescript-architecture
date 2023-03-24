import express from 'express';
import userApi from './user.route';
import pokemonCategoryApi from './pokemonCategory.route';
import pokemonApi from './pokemon.route';

const v1 = express.Router();

v1.use('/users', userApi);
v1.use('/pokemon-categories', pokemonCategoryApi);
v1.use('/pokemon', pokemonApi);

export default v1;
