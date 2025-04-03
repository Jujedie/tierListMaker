import mongoose, { Document, Schema } from 'mongoose';

interface IItem extends Document {
  text: string;
}

const itemSchema: Schema = new Schema({
  text: {
    required: true,
    type: String,
  },
});

const Item = mongoose.model<IItem>('Item', itemSchema);

export default Item;
