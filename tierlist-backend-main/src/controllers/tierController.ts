import { Request, Response } from 'express';

import {
  createTier,
  deleteTier,
  getTierById,
  updateTier,
} from '../services/tierService';

export const getTierController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tier = await getTierById(id);

    if (!tier) {
      res.status(404).send({ error: 'Tier not found' });
    } else {
      res.status(200).send(tier);
    }
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
};

export const updateTierController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { color, name } = req.body;
    const tier = await updateTier(id, { color, name });
    if (!tier) {
      res.status(404).send({ error: 'Tier not found' });
    } else {
      res.status(200).send(tier);
    }
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
};

export const createTierController = async (req: Request, res: Response) => {
  try {
    const tier = await createTier(req.body);
    res.status(201).send(tier);
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
};

export const deleteTierController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteTier(id);

    if (!result) {
      res.status(404).send({ error: 'Tier not found' });
    } else {
      res.status(200).send({ message: result });
    }
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
};
