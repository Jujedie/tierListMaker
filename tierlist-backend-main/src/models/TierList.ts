import mongoose, { Document, Schema, Types } from 'mongoose';

interface ITierList extends Document {
  items: Types.ObjectId[];
  name: string;
  tiers: Types.ObjectId[];
  user: Types.ObjectId;
}

const tierListSchema: Schema = new Schema({
  items: [
    {
      ref: 'Item',
      type: Types.ObjectId,
    },
  ],
  name: {
    required: true,
    type: String,
  },
  tiers: [
    {
      ref: 'Tier',
      type: Types.ObjectId,
    },
  ],
  user: {
    ref: 'User',
    required: true,
    type: Types.ObjectId,
  },
});

const TierList = mongoose.model<ITierList>('TierList', tierListSchema);

export default TierList;
