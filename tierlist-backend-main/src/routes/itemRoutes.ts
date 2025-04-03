import express from 'express';

import {
  createItemController,
  deleteItemController,
  getItemsController,
  updateItemController,
} from '../controllers/itemController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: "Item"
 *     description: "Gestion d'un Item"
 */
/**
 * @swagger
 * /api/item:
 *  post:
 *     tags:
 *       - "Item"
 *     summary: Créer un nouvel item
 *     description: Permet de créer un nouvel item en fournissant les informations nécessaires.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Le texte de l'item.
 *     responses:
 *       201:
 *         description: Item créé avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/', authMiddleware, createItemController);

/**
 * @swagger
 * /api/item/{id}:
 *  put:
 *     tags:
 *       - "Item"
 *     summary: Mettre à jour un item

 *     description: Permet de mettre à jour un item spécifique en fournissant son ID et des données de mise à jour.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID de l'item à mettre à jour.
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
 *                 description: Le texte de l'item à mettre à jour.
 *     responses:
 *       200:
 *         description: Item mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Item non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', authMiddleware, updateItemController);

/**
 * @swagger
 * /api/item/{id}:
 *  get:
 *     tags:
 *       - "Item"
 *     summary: Récupérer tous les items
 *     description: Permet de récupérer un Item par son ID.
 *     responses:
 *       200:
 *         description: Liste des items récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/', authMiddleware, getItemsController);
/**
 * @swagger
 * /api/item/{id}:
 *  delete:
 *     tags:
 *       - "Item"
 *     summary: Supprimer un item
 *     description: Permet de supprimer un item spécifique en fournissant son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID de l'item à supprimer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item supprimé avec succès
 *       404:
 *         description: Item non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', authMiddleware, deleteItemController);

export default router;
