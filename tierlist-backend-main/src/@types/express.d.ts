import { IUser } from '../models/User'; // 🔥 Vérifie le chemin de ton modèle User

declare module 'express' {
  export interface Request {
    user?: IUser;
  }
}
