import { Schema, model } from 'mongoose';
import { IPokemonCategory } from './pokemonCategory.model';

export interface IPokemon {
  name: string;
  image: string;
  description: string;
}

export interface PokemonRequest {
  id: string;
}

export const PokemonSchema = new Schema<IPokemon>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'pokemon',
  }
);

export const Pokemon = model<IPokemon>('Pokemon', PokemonSchema);
