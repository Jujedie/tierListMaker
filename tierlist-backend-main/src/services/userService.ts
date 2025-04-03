import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/User';
import { comparePasswords, hashPassword } from '../utils/argon2';

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("L'utilisateur existe déjà");

  const hashedPassword = await hashPassword(password);
  const newUser = new User({ email, name, password: hashedPassword });
  await newUser.save();

  return generateToken(newUser);
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("l'utilisateur " + email + " n'existe pas");
  }

  if (!(await comparePasswords(password, user.password))) {
    throw new Error('Identifiants incorrects');
  }

  return generateToken(user);
};

const generateToken = (user: IUser) => {
  if (!process.env.JWT_SECRET) throw new Error('Token manquant');

  return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};
