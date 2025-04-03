import mongoose from 'mongoose';

import app from './app';

const PORT = Number(process.env.PORT) || 5000; // Ensure PORT is a number

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error(
    '❌ MONGO_URI is not defined. Please set it in your environment variables.'
  );
  process.exit(1);
}

let server: ReturnType<typeof app.listen>;

// Connexion à MongoDB et démarrage du serveur
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connexion à MongoDB réussie');

    server = app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error('❌ Erreur de connexion à MongoDB', err.message);
    } else {
      console.error('❌ Erreur inconnue de connexion à MongoDB', err);
    }
    process.exit(1); // Stop the process if MongoDB connection fails
  });

// Fermeture propre du serveur en cas d'arrêt
process.on('SIGINT', async () => {
  console.log('🛑 Fermeture du serveur...');
  await mongoose.connection.close();
  server.close(() => {
    console.log('✅ Serveur fermé proprement.');
    process.exit(0);
  });
});

export { server };
