import express from 'express';

const pokemonApi = express.Router();

// Get pokemon list
pokemonApi.get('/', function (req, res, next) {
  res.send('response pokemon list');
});

export default pokemonApi;
