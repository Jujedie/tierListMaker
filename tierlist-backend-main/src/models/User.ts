import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  comparePassword: (password: string) => Promise<boolean>;
  email: string;
  name: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: {
    match: [/^\S+@\S+\.\S+$/, 'Veuillez entrer un email valide'],
    required: true,
    type: String,
    unique: true,
  },
  name: { required: true, type: String },
  password: { required: true, type: String },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
