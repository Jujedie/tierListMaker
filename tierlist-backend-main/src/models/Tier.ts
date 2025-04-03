import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITier extends Document {
  color: string;
  items: Types.ObjectId[];
  name: string;
}

const tierSchema: Schema = new Schema({
  color: {
    required: true,
    type: String,
  },
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
});

const Tier = mongoose.model<ITier>('Tier', tierSchema);

export default Tier;
