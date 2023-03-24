/*eslint-disable @typescript-eslint/no-unused-vars*/
import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IPokemonCategory {
  name: string;
}

export interface PokemonCategoryRequest {
  id: string;
}
export type PokemonCategoryInput = Partial<IPokemonCategory>;

// 2. Create a Schema corresponding to the document interface.
export const PokemonCategorySchema = new Schema<IPokemonCategory>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'pokemon_categories',
  }
);

// 3. Create a Model.
export const PokemonCategory = model<IPokemonCategory>(
  'PokemonCategory',
  PokemonCategorySchema
);
