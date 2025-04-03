import express from 'express';

import {
  createTierController,
  deleteTierController,
  getTierController,
  updateTierController,
} from '../controllers/tierController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: "Tier"
 *     description: "Gestion d'un tier"
 */
/**
 * @swagger
 * /api/tier:
 *  post:
 *     tags:
 *       - "Tier"
 *     summary: Créer un nouveau tier
 *     description: Permet de créer un nouveau tier.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom du tier.
 *               color:
 *                 type: string
 *                 description: La couleur associée au tier.
 *     responses:
 *       201:
 *         description: Tier créé avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/', authMiddleware, createTierController);

/**
 * @swagger
 * /api/tier/{id}:
 *  put:
 *     tags:
 *       - "Tier"
 *     summary: Mettre à jour un tier
 *     description: Permet de mettre à jour un tier spécifique en fournissant un ID et des données de mise à jour.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du tier à mettre à jour.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom du tier.
 *               color:
 *                 type: string
 *                 description: La couleur associée au tier.
 *     responses:
 *       200:
 *         description: Tier mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Tier non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', authMiddleware, updateTierController);

/**
 * @swagger
 * /api/tier/{id}:
 *   get:
 *     tags:
 *        - "Tier"
 *     summary: Récupérer un tier spécifique
 *     description: Permet de récupérer les informations d'un tier spécifique en fournissant son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du tier à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tier récupéré avec succès
 *       404:
 *         description: Tier non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', authMiddleware, getTierController);

/**
 * @swagger
 * /api/tier/{id}:
 *   delete:
 *     tags:
 *        - "Tier"
 *     summary: Delete a specific tier
 *     description: Allows to delete a specific tier by providing its ID.
 *     parameters:
 *       - in: path
 *       - name: id
 *       - required: true
 *       - description: The ID of the tier to delete.
 *       - schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tier deleted successfully
 *       404:
 *         description: Tier not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, deleteTierController);

export default router;
