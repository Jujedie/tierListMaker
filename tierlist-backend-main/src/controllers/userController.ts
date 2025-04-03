import { Request, Response } from 'express';

import { loginUser, registerUser } from '../services/userService';

export const registerController = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const token = await registerUser(name, email, password);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: (err as Error).message });
  }
};
