import Tier from '../models/Tier';

export const updateTier = async (
  id: string,
  updateData: { color?: string; name?: string }
) => {
  const tier = await Tier.findByIdAndUpdate(id, updateData, { new: true });
  if (!tier) {
    throw new Error('Tier not found'); // Erreur explicite
  }
  return tier;
};

export const deleteTier = async (id: string) => {
  return Tier.findByIdAndDelete(id);
};

export const getTierById = async (id: string) => {
  return Tier.findById(id).populate('items');
};

export const createTier = async (tierData: { color: string; name: string }) => {
  const tier = new Tier(tierData);
  await tier.save();
  return tier;
};
