import { Types } from 'mongoose';

import Item from '../models/Item';
import Tier from '../models/Tier';
import TierList from '../models/TierList';

export const createTierList = async (tierListData: any, userId: string) => {
  const { items = [], name, tiers = [] } = tierListData;

  // Créer les items
  const createdItems = await Item.insertMany(items);

  // Créer les tiers avec les références aux items
  const createdTiers = await Tier.insertMany(
    tiers.map((tier: any) => ({
      ...tier,
      items: tier.items.map(
        (itemId: string) =>
          createdItems.find((item) => item.text === itemId)!._id
      ),
    }))
  );

  // Créer la tier list avec les références aux tiers et items
  const tierList = new TierList({
    items: createdItems.map((item) => item._id),
    name,
    tiers: createdTiers.map((tier) => tier._id),
    user: userId,
  });

  await tierList.save();
  await tierList.populate({
    path: 'tiers',
    populate: { path: 'items' }, // Peuple les items dans chaque tier
  });
  await tierList.populate('items');
  return tierList;
};

export const getTierListsByUser = async (userId: string) => {
  return TierList.find({ user: userId })
    .populate({
      path: 'tiers',
      populate: { path: 'items' }, // Peuple les items dans chaque tier
    })
    .populate('items');
};

export const getTierListById = async (userId: string, id: string) => {
  return TierList.findOne({ _id: id, user: userId })
    .populate({
      path: 'tiers',
      populate: { path: 'items' }, // Peuple les items dans chaque tier
    })
    .populate('items');
};

export const addTierToList = async (
  userId: string,
  id: string,
  tierId: string
) => {
  // Vérifie que la tier list existe
  const tierList = await TierList.findOne({ _id: id, user: userId });
  if (!tierList) {
    throw new Error('Tier list non trouvée');
  }

  // Convertit tierId en ObjectId pour la comparaison
  const tierObjectId = new Types.ObjectId(tierId);

  // Vérifie si le tier est déjà dans la tier list en comparant les ObjectId
  if (
    !tierList.tiers.some((existingTier) => existingTier.equals(tierObjectId))
  ) {
    // Ajoute le tier à la liste
    tierList.tiers.push(tierObjectId);
    await tierList.save();
  }

  // Peupler les tiers après avoir ajouté le tier
  await tierList.populate({
    path: 'tiers',
    populate: { path: 'items' }, // Peuple les items dans chaque tier
  });
  await tierList.populate('items');

  return tierList;
};

// Ajoute un item à la tierList
export const addItemToList = async (tierListId: string, text: string) => {
  // Vérifie si la tierList existe
  const tierList = await TierList.findById(tierListId);
  if (!tierList) {
    throw new Error('Tier list non trouvée');
  }

  // Vérifie si l'item existe déjà dans la tierList
  const existingItem = await Item.findOne({ text });
  if (!existingItem) {
    // Si l'item n'existe pas, on le crée
    const newItem = new Item({ text });
    await newItem.save();

    const ItemId = new Types.ObjectId(newItem._id as string);

    // Ajoute l'item à la tierList
    tierList.items.push(ItemId);
    await tierList.save();

    await tierList.populate({
      path: 'tiers',
      populate: { path: 'items' }, // Peuple les items dans chaque tier
    });
    await tierList.populate('items');
    return tierList;
  }

  const ItemId = new Types.ObjectId(existingItem._id as string);

  // Si l'item existe déjà, on le rajoute à la tierList
  if (!tierList.items.includes(ItemId)) {
    tierList.items.push(ItemId);
    await tierList.save();
  }

  await tierList.populate({
    path: 'tiers',
    populate: { path: 'items' }, // Peuple les items dans chaque tier
  });
  await tierList.populate('items');

  return tierList;
};

// Déplacer un item de la liste générale vers un tier spécifique
export const moveItemToTier = async (
  tierListId: string,
  itemId: string,
  tierId: string
) => {
  // Vérifie que la tier list existe
  const tierList = await TierList.findById(tierListId)
    .populate({
      path: 'tiers',
      populate: { path: 'items' },
    }) // Peupler les tiers
    .populate('items'); // Peupler les items;
  if (!tierList) {
    throw new Error('Tier list non trouvée');
  }

  // Vérifie que le tier existe
  const tier = await Tier.findById(tierId);
  if (!tier) {
    throw new Error('Tier non trouvé');
  }

  // Vérifie si l'item existe
  const item = await Item.findById(itemId);
  if (!item) {
    throw new Error('Item non trouvé');
  }

  // Vérifie si l'item est dans la liste générale de la tierlist
  if (tierList.items.some((id) => id.equals(item._id as string))) {
    tierList.items = tierList.items.filter(
      (id) => id._id.toString() !== (item._id as Types.ObjectId).toString()
    );

    // Ajouter l'item au tier si pas déjà présent
    if (!tier.items.some((id) => id.equals(item._id as Types.ObjectId))) {
      tier.items.push(item._id as Types.ObjectId);
      await tierList.save();
      await tier.save();
    }

    await tierList.populate({
      path: 'tiers',
      populate: { path: 'items' }, // Peuple les items dans chaque tier
    });
    await tierList.populate('items');

    return tierList; // Retourne la tierlist mise à jour
  }

  throw new Error("L'item n'est pas dans la liste générale de la tierlist");
};

export const deleteTierList = async (tierListId: string) => {
  const deletedTierList = await TierList.findByIdAndDelete(tierListId);
  if (!deletedTierList) {
    throw new Error('Tier list not found');
  }
  return deletedTierList;
};

export const reorderTiersInList = async (
  tierListId: string,
  newOrderOfTierIds: string[]
) => {
  // Check if the tier list exists
  const tierList = await TierList.findById(tierListId);
  if (!tierList) {
    throw new Error('Tier list not found');
  }

  // Check if all tier IDs exist in the tier list
  for (const tierId of newOrderOfTierIds) {
    if (!tierList.tiers.some((tier) => tier._id.toString() === tierId)) {
      throw new Error(`Tier with id ${tierId} does not exist in the tier list`);
    }
  }

  // Set the new order of tiers
  tierList.tiers = newOrderOfTierIds.map(
    (tierId) => new Types.ObjectId(tierId)
  );
  // Save the tier list
  await tierList.save();

  // Populate tiers
  await tierList.populate({
    path: 'tiers',
    populate: { path: 'items' }, // Populate the items in each tier
  });
  await tierList.populate('items');

  return tierList;
};
