import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Token manquant' }); // Add return to prevent next() execution
    } else if (!process.env.JWT_SECRET) {
      res.status(500).json({ error: 'JWT_SECRET non défini' }); // Handle missing secret safely
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        id: string;
      };

      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        res.status(401).json({ error: 'Utilisateur introuvable' });
      } else {
        req.user = user; // Assuming `req.user` exists in your custom request type

        next();
      }
    }
  } catch {
    res.status(401).json({ error: 'Authentification invalide' });
  }
};
