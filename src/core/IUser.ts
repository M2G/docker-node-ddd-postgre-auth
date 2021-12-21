import type { Document, Types} from 'mongoose';

interface IUser extends Document {
  _id?: Types.ObjectId | string;
  email?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  password?: string | undefined;
  created_at?: string;
  modified_at?: string;
  reset_password_token?: string;
  reset_password_expires?: Date;
  new_password?: string;
  verify_password?: string;
  token?: string;
}

export default IUser;
