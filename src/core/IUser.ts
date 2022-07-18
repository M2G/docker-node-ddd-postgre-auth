import type { Document, Types } from 'mongoose';

interface IUser extends Document {
  _id?: Types.ObjectId | string;
  email?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  created_at?: Number;
  modified_at?: Number;
  reset_password_token?: string;
  reset_password_expires?: Number;
  token?: string;
  is_deleted?: boolean;
  last_connected_at: Number;
}

export default IUser;
