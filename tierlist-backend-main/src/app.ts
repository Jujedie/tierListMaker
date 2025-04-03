import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import itemRoutes from './routes/itemRoutes';
import tierListRoutes from './routes/tierlistRoutes';
import tierListsRoutes from './routes/tierListsRoutes';
import tierRoutes from './routes/tierRoutes';
import userRoutes from './routes/userRoutes';
import swaggerDocs from './swagger';

const app = express();

// Utilisation du .env
dotenv.config();

// Middleware
app.use(express.json());

// Configurer CORS
app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTION'],
    origin: '*', // /!\ DANGEREUX, À RENDRE PLUS STRICT EN PROD /!\
  })
);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tierlists', tierListsRoutes);
app.use('/api/tierlist', tierListRoutes);
app.use('/api/tier', tierRoutes);
app.use('/api/item', itemRoutes);

// Génération de la documentation Swagger
swaggerDocs(app);

export default app; // 🚀 Exporter uniquement l'app, pas le serveur
