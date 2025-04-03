import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../src/models/User';
import { server } from '../src/server';

let mongoServer: MongoMemoryServer;

export const connectTestDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.disconnect(); // Assure-toi que toute connexion précédente est fermée
  await mongoose.connect(mongoUri);
};

export const disconnectTestDB = async () => {
  await mongoose.connection.dropDatabase(); // Supprime les données avant la fermeture
  await mongoose.disconnect();
  await mongoServer.stop();
  if (server) server.close();
};

export const generateTestToken = async (): Promise<string> => {
  let user = await User.findOne({ email: 'test@example.com' });

  if (!user) {
    user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
  }
  const secret = process.env.JWT_SECRET || 'secretTestKey';
  return jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: '1h',
  });
};
