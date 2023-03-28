import express from 'express';
import userApi from './user.route';
import pokemonCategoryApi from './pokemonCategory.route';
import pokemonApi from './pokemon.route';
import kataApi from './kata.route';

const v1 = express.Router();

v1.use('/user', userApi);
v1.use('/pokemon-categories', pokemonCategoryApi);
v1.use('/pokemon', pokemonApi);
v1.use('/kata', kataApi);

export default v1;
