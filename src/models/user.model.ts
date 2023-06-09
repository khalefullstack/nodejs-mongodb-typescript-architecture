import { Schema, model } from 'mongoose';
import validator from 'validator';

export interface IUser {
  email: string;
  password: string;
}

export interface UserRequest {
  id: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: () => validator.isEmail,
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => value.length >= 6,
        message: () => 'Password must be at least six characters long',
      },
    },
  },
  { timestamps: true, versionKey: false, collection: 'user' }
);

userSchema.method('toJSON', function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id: id, ...data } = this.toObject();

  return { id, ...data };
});

export const User = model<IUser>('User', userSchema);
