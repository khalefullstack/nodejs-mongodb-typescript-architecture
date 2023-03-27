import express from 'express';
import {
  createKata,
  deleteKataById,
  getKata,
  getKataList,
  updateKata,
} from '../../controllers/kata.controller';

const kataApi = express.Router();

kataApi.get('/', getKataList);
kataApi.get('/:id', getKata);
kataApi.post('/create', createKata);
kataApi.put('/:id', updateKata);
kataApi.delete('/:id', deleteKataById);

export default kataApi;
