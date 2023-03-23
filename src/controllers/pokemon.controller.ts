import { Request, Response } from 'express';
import { IPokemonCategory, PokemonCategory } from '../models/pokemon.model';

// Create pokemon category
export async function createPokemon(
  req: Request<unknown, unknown, IPokemonCategory>,
  res: Response<IPokemonCategory | unknown>
) {
  try {
    const categoryName = req.body.name;
    const categoryImage = req.body.image;

    const pokemonCategory = new PokemonCategory({
      name: categoryName,
      image: categoryImage,
    });

    const result = await pokemonCategory.save();
    const { _id: id, name, image } = result;

    const pokemonCat: IPokemonCategory = {
      id,
      name,
      image,
    };

    res.status(200).json(pokemonCat);
  } catch (err) {
    res.status(401).json({ message: 'Cannot create pokemon' });
  }
}

// Get pokemon Categories
export async function getPokemonList(req: Request, res: Response) {
  try {
    const pokemonCatList = await PokemonCategory.find();

    const cats: IPokemonCategory[] = pokemonCatList.map(function (cat) {
      const { _id: id, name, image } = cat;

      return {
        id,
        name,
        image,
      };
    });

    res.status(200).json(cats);
  } catch (err) {
    res.status(401).json({ message: 'Cannot get pokemon list' });
  }
}
