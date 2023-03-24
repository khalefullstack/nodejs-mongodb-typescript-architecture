import { NextFunction, Request, Response } from 'express';
import { IPokemonCategory } from '../models/pokemonCategory.model';

export function isBulbasaur(
  req: Request<unknown, unknown, IPokemonCategory>,
  res: Response,
  next: NextFunction
) {
  const name = req.body.name;

  if (name.toLowerCase() !== 'bulbasaur') {
    res.status(401).json({ message: 'Must be bulbasaur' });
  }

  next();
}

export const myLogger = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('LOGGED');
  next();
};
