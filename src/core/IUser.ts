import type { Document, Types} from 'mongoose';

interface IUser extends Document {
  _id?: Types.ObjectId | string;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string | undefined;
  createdAt?: string;
  modifiedAt?: string;
  reset_password_token?: string;
  reset_password_expires?: Date;
}

export default IUser;
