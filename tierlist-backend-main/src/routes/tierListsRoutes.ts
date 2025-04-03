import express from 'express';

import { getTierListsController } from '../controllers/tierListController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: "TierLists"
 *     description: "Gestion des tierlists"
 */
/**
 * @swagger
 * /api/tierlists:
 *  get:
 *     tags:
 *       - "TierLists"
 *     summary: Récupérer toutes les tierlists de l'utilisateur
 *     description: Permet de récupérer toutes les tierlists associées à un utilisateur authentifié.

 *     responses:
 *       200:
 *         description: Liste des tierlists récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TierList'
 *       401:
 *         description: Non authentifié ou token invalide
 *       500:
 *         description: Erreur serveur
 */
router.get('/', authMiddleware, getTierListsController);

export default router;
