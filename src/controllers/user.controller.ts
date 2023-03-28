import { Request, Response } from 'express';
import { IUser, User } from '../models/user.model';
import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function register(
  req: Request<unknown, unknown, IUser>,
  res: Response
) {
  try {
    const { email, password } = req.body;

    // Check if the email is already in use
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(401).json({ message: 'Email is already in use' });
    }

    // Define salt rounds
    const saltRounds = 10;

    hash(password, saltRounds, async (err, hash) => {
      if (err) throw new Error('Internal Server Error');

      // Create a new user
      const user = await User.create({
        email,
        password: hash,
      });

      const JWT_SECRET = 'secret-key';
      jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' },
        (error, token) => {
          if (token) {
            const { password, ...data } = user.toJSON();

            return res.status(201).json({ ...data, token });
          }

          return res.status(401).json({ message: 'Invalid Credentials' });
        }
      );
    });
  } catch (err) {
    res.status(401).json(err);
  }
}

export async function login(
  req: Request<unknown, unknown, IUser>,
  res: Response
) {
  try {
    // Extract email and password from the req.body object
    const { email, password } = req.body;

    // Check if user exists in database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    // Compare passwords
    compare(password, user.password, (err, success) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid Credentials' });
      }

      const JWT_SECRET = 'secret-key';

      jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' },
        (error, token) => {
          if (token) {
            const { password, ...data } = user.toJSON();

            return res.status(201).json({ ...data, token });
          }

          return res.status(401).json({ message: 'Invalid authentication' });
        }
      );
    });
  } catch (err) {
    res.status(401).json(err);
  }
}
