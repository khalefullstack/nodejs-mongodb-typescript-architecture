import { Request, Response } from 'express';
import {
  IPokemonCategory,
  PokemonCategory,
  PokemonCategoryInput,
  PokemonCategoryRequest,
} from '../models/pokemonCategory.model';

// Create pokemon category
export async function createPokemonCategory(
  req: Request<unknown, unknown, IPokemonCategory>,
  res: Response<IPokemonCategory | unknown>
) {
  try {
    const { name } = req.body;

    const result = await PokemonCategory.create({
      name,
    });

    res.status(200).json(result.toJSON());
  } catch (err) {
    res.status(400).json({ message: 'Cannot create pokemon' });
  }
}

// Get pokemon Categories
export async function getPokemonCategories(req: Request, res: Response) {
  try {
    const pokemonCatList = await PokemonCategory.find().lean();

    res.status(200).json(pokemonCatList);
  } catch (err) {
    res.status(400).json({ message: 'Cannot get pokemon list' });
  }
}

export async function getPokemonCategory(
  req: Request<PokemonCategoryRequest>,
  res: Response
) {
  try {
    const pokemonCategoryId = req.params.id;

    const pokemonCategory = await PokemonCategory.findById(
      pokemonCategoryId
    ).lean();

    if (pokemonCategory) {
      return res.status(200).json(pokemonCategory);
    }

    return res.status(404).json({ message: 'Cannot found pokemon' });
  } catch (err) {
    res.status(400).json({ message: 'Cannot get pokemon details' });
  }
}

export async function updatePokemonCategory(
  req: Request<PokemonCategoryRequest, unknown, PokemonCategoryInput>,
  res: Response
) {
  try {
    const pokemonCategoryId = req.params.id;

    const updateFields: PokemonCategoryInput = {
      name: req.body.name,
    };

    const pokemonCategory = await PokemonCategory.findOneAndUpdate(
      { _id: pokemonCategoryId },
      updateFields,
      { new: true }
    );

    if (pokemonCategory) {
      return res.status(200).json(pokemonCategory);
    }

    return res.status(404).json({ message: 'Cannot update pokemon' });
  } catch (err) {
    res.status(400).json({ message: 'Cannot update pokemon' });
  }
}

export async function deletePokemonCategory(req: Request, res: Response) {
  try {
    const pokemonCategoryId = req.params.id;

    const pokemonCategory = await PokemonCategory.findByIdAndRemove(
      pokemonCategoryId
    );

    if (pokemonCategory) {
      return res.status(204).json(pokemonCategory);
    }

    return res.status(404).json({ message: 'Cannot found pokemon to delete' });
  } catch (err) {
    res.status(400).json({ message: 'Cannot delete pokemon' });
  }
}
