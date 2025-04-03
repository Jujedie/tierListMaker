import Item from '../models/Item';

export const createItem = async (itemData: { text: string }) => {
  const item = new Item(itemData);
  await item.save();
  return item;
};

export const getItems = async () => {
  return Item.find();
};

export const updateItem = async (id: string, updateData: { text?: string }) => {
  const item = await Item.findByIdAndUpdate(id, updateData, { new: true });
  if (!item) {
    throw new Error('Item non trouvé');
  }
  return item;
};

export const deleteItem = async (id: string) => {
  const item = await Item.findByIdAndDelete(id);
  if (!item) {
    throw new Error('Item non trouvé');
  }
  return item;
};
