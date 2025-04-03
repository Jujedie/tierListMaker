import express from 'express';

import {
  loginController,
  registerController,
} from '../controllers/userController';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: "User"
 *     description: "Gestion des users"
 */
/**
 * @swagger
 * /api/users/register:
 *  post:
 *     tags:
 *       - "User"
 *     summary: Inscrire un nouvel utilisateur
 *     description: Permet à un utilisateur de s'inscrire en fournissant un nom d'utilisateur, un e-mail et un mot de passe.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom d'utilisateur de l'utilisateur.
 *               email:
 *                 type: string
 *                 description: L'adresse e-mail de l'utilisateur.
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur.
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Requête incorrecte, données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/register', registerController);

/**
 * @swagger
 * /api/users/login:
 *  post:
 *     tags:
 *       - "User"
 *     summary: Connexion d'un utilisateur existant
 *     description: Permet à un utilisateur existant de se connecter en fournissant un e-mail et un mot de passe.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'adresse e-mail de l'utilisateur.
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur.
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Non autorisé, identifiants invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/login', loginController);

export default router;
