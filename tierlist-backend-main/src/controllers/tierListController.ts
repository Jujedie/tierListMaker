import { Request, Response } from 'express';

import {
  addItemToList,
  addTierToList,
  createTierList,
  deleteTierList,
  getTierListById,
  getTierListsByUser,
  moveItemToTier,
  reorderTiersInList,
} from '../services/tierListService';
import { createTier } from '../services/tierService';

export const createTierListController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).send({ error: 'Utilisateur non authentifié' });
    } else {
      const tierList = await createTierList(req.body, req.user._id as string);
      res.status(201).send(tierList);
    }
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
};

export const getTierListsController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).send({ error: 'Utilisateur non authentifié' });
    } else {
      const tierLists = await getTierListsByUser(req.user._id as string);
      res.status(200).send(tierLists);
    }
  } catch (err) {
    res.status(500).send({ error: (err as Error).message });
  }
};

export const getTierListController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).send({ error: 'Utilisateur non authentifié' });
    } else {
      const { id } = req.params;
      const tierList = await getTierListById(req.user._id as string, id);
      res.status(200).send(tierList);
    }
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
};

export const deleteTierListController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).send({ error: 'Utilisateur non authentifié' });
    } else {
      const { id } = req.params; // ID of the TierList to delete
      await deleteTierList(id);
      res.status(200).send({ message: 'Successfully deleted.' });
    }
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
};

export const addTierToListController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).send({ error: 'Utilisateur non authentifié' });
    } else {
      const { color, name } = req.body;

      // Récupère les données du nouveau tier
      const { id } = req.params; // ID de la tier list à modifier

      // Crée un nouveau tier
      const newTier = await createTier({ color, name });

      // Appelle la fonction pour ajouter le tier à la tier list
      const updatedTierList = await addTierToList(
        req.user._id as string,
        id,
        newTier._id as string
      );

      res.status(201).send(updatedTierList); // Envoie la tier list mise à jour
    }
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
};

export const addItemToListController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).send({ error: 'Utilisateur non authentifié' });
    } else {
      const { text } = req.body; // texte de l'item à ajouter
      const tierListId = req.params.id; // ID de la tier list à modifier

      // Appel au service pour ajouter l'item à la tier list
      const tierList = await addItemToList(tierListId, text);

      // Retourne la tier list mise à jour
      res.status(200).send(tierList);
    }
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
};

export const moveItemToTierController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).send({ error: 'Utilisateur non authentifié' });
    } else {
      const { itemId, tierId } = req.body; // itemId à déplacer et tierId cible
      const tierListId = req.params.id; // ID de la tier list à modifier

      // Appel au service pour déplacer l'item dans le tier
      const updatedTierList = await moveItemToTier(tierListId, itemId, tierId);

      // Retourne la tierlist mise à jour
      res.status(200).send(updatedTierList);
    }
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
};

export const reorderTiersInListController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).send({ error: 'Utilisateur non authentifié' });
    } else {
      const reorderedTierIds = req.body.tierOrder; // Reordered list of tier IDs from the client
      const tierListId = req.params.id; // ID of the tier list to modify

      // Call to the service to reorder the tiers in the list
      const updatedTierList = await reorderTiersInList(
        tierListId,
        reorderedTierIds
      );

      // Return the updated tier list
      res.status(200).send(updatedTierList);
    }
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
};
