import { Schema, model } from 'mongoose';

export interface IKata {
  title: string;
  type: string;
}

export interface KataRequest {
  id: string;
}

const KataSchema = new Schema<IKata>(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false, collection: 'kata' }
);

export const Kata = model<IKata>('Kata', KataSchema);
