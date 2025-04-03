import express from 'express';

import {
  addItemToListController,
  addTierToListController,
  createTierListController,
  deleteTierListController,
  getTierListController,
  moveItemToTierController,
  reorderTiersInListController,
} from '../controllers/tierListController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: "TierList"
 *     description: "Gestion d'une tierlist"
 */

/**
 * @swagger
 * /api/tierlist:
 *   post:
 *     tags:
 *       - "TierList"
 *     summary: Créer une nouvelle tierlist
 *     description: Permet de créer une nouvelle tierlist pour un utilisateur authentifié.

 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               tiers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     color:
 *                       type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *             required:
 *               - name
 *               - tiers
 *               - items
 *     responses:
 *       201:
 *         description: Tierlist créée avec succès
 *       401:
 *         description: Non authentifié ou token invalide
 *       500:
 *         description: Erreur serveur
 */
router.post('/', authMiddleware, createTierListController);

/**
 * @swagger
 * /api/tierlist/{id}:
 *   get:
 *     tags:
 *       - "TierList"
 *     summary: Récupérer une tierlist spécifique
 *     description: Permet de récupérer une tierlist par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tierlist
 *         schema:
 *           type: string

 *     responses:
 *       200:
 *         description: Tierlist récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TierList'
 *       401:
 *         description: Non authentifié ou token invalide
 *       404:
 *         description: Tierlist non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', authMiddleware, getTierListController);

/**
 * @swagger
 * /api/tierlist/{id}/add-tier:
 *   post:
 *     tags:
 *       - "TierList"

 *     summary: Ajouter un tier à une tierlist
 *     description: Permet d'ajouter un tier à une tierlist existante.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tierlist
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
 *               color:
 *                 type: string
 *             required:
 *               - name
 *               - color
 *     responses:
 *       201:
 *         description: Tier ajouté à la tierlist
 *       400:
 *         description: Requête mal formulée
 *       401:
 *         description: Non authentifié ou token invalide
 *       500:
 *         description: Erreur serveur
 */
router.post('/:id/add-tier', authMiddleware, addTierToListController);

/**
 * @swagger
 * /api/tierlist/{id}/add-item:
 *   post:
 *     tags:
 *       - "TierList"
 *     summary: Ajouter un item à une tierlist
 *     description: Permet d'ajouter un item à une tierlist existante.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tierlist
 *         schema:
 *           type: string

 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *             required:
 *               - text
 *     responses:
 *       201:
 *         description: Item ajouté à la tierlist
 *       400:
 *         description: Requête mal formulée
 *       401:
 *         description: Non authentifié ou token invalide
 *       500:
 *         description: Erreur serveur
 */
router.post('/:id/add-item', authMiddleware, addItemToListController);

/**
 * @swagger
 * /api/tierlist/{id}/move-item-to-tier:
 *   put:
 *     tags:
 *       - "TierList"
 *     summary: Déplacer un item vers un autre tier
 *     description: Permet de déplacer un item d'une tierlist vers un autre tier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tierlist
 *         schema:
 *           type: string

 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *               tierId:
 *                 type: string
 *             required:
 *               - itemId
 *               - tierId
 *     responses:
 *       200:
 *         description: Item déplacé vers le tier
 *       400:
 *         description: Requête mal formulée
 *       401:
 *         description: Non authentifié ou token invalide
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id/move-item-to-tier', authMiddleware, moveItemToTierController);

/**
 * @swagger
 * /api/tierlist/{id}/reorder-tiers:
 *   put:
 *     tags:
 *       - "TierList"
 *     summary: Reorder tiers in a tierlist
 *     description: Allows a user to reorder the tiers in a particular tierlist.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tierlist
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tierOrder:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - tierOrder
 *     responses:
 *       200:
 *         description: Tiers reordered successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authenticated or invalid token
 *       500:
 *         description: Server error
 */
router.put('/:id/reorder-tiers', authMiddleware, reorderTiersInListController);
/**
 * @swagger
 * /api/tierlist/{id}:
 *   delete:
 *     tags:
 *       - "TierList"
 *     summary: Delete a specific tierlist
 *     description: Allows a user to delete a specific tierlist by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tierlist
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Tierlist deleted successfully
 *       401:
 *         description: Not authenticated or invalid token
 *       404:
 *         description: Tierlist not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, deleteTierListController);

export default router;
