import { Request, Response } from 'express';

import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from '../services/itemService';

export const createItemController = async (req: Request, res: Response) => {
  try {
    const item = await createItem(req.body);
    res.status(201).send(item);
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
};

export const updateItemController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const item = await updateItem(id, { text });
    res.status(200).send(item);
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
};

export const deleteItemController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await deleteItem(id);
    res.status(200).send(item);
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
};

export const getItemsController = async (req: Request, res: Response) => {
  try {
    const items = await getItems();
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send({ error: (err as Error).message });
  }
};
