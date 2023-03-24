import { Request, Response } from 'express';
import { IPokemon, Pokemon, PokemonRequest } from '../models/pokemon.model';

export async function getPokemonList(req: Request, res: Response) {
  try {
    const pokemonList = await Pokemon.find();

    res.status(200).json(pokemonList);
  } catch (err) {
    res.status(400).json({ message: 'Cannot get pokemon list' });
  }
}

export async function createPokemon(
  req: Request<unknown, unknown, IPokemon>,
  res: Response
) {
  try {
    const { name, image, description } = req.body;

    const pokemon = await Pokemon.create({
      name,
      image,
      description,
    });

    res.status(200).json(pokemon);
  } catch (err) {
    res.status(400).json({ message: 'Cannot create pokemon' });
  }
}

export async function getPokemon(req: Request<PokemonRequest>, res: Response) {
  try {
    const { id } = req.params;

    const pokemon = await Pokemon.findById(id);

    res.status(200).json(pokemon);
  } catch (err) {
    res.status(400).json({ message: 'Pokemon not foundn' });
  }
}

export async function updatePokemon(
  req: Request<PokemonRequest, unknown, IPokemon>,
  res: Response
) {
  try {
    const { id } = req.params;
    const { name, image, description } = req.body;

    const updateFields: IPokemon = {
      name,
      image,
      description,
    };

    const pokemon = await Pokemon.findOneAndUpdate({ _id: id }, updateFields, {
      new: true,
    });

    res.status(200).json(pokemon);
  } catch (err) {
    res.status(400).json({ message: 'Cannot update pokemon' });
  }
}

export async function deletePokemon(
  req: Request<PokemonRequest>,
  res: Response
) {
  try {
    const { id } = req.params;

    await Pokemon.findByIdAndRemove(id);

    res.status(204).json();
  } catch (err) {
    res.status(400).json({ message: 'Cannot delete pokemon' });
  }
}
