import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, default: 'user' },
  },
  {
    timestamps: true,
  }
);

const UserModel = model('user', UserSchema);
export default UserModel;
