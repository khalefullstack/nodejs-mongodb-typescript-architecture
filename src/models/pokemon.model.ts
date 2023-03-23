import { Schema, model, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IPokemonCategory {
  id: Types.ObjectId;
  name: string;
  image: string;
}

// 2. Create a Schema corresponding to the document interface.
export const PokemonCategorySchema = new Schema<IPokemonCategory>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// 3. Create a Model.
export const PokemonCategory = model<IPokemonCategory>(
  'PokemonCategory',
  PokemonCategorySchema
);
