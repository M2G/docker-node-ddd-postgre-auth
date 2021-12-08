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
  oldPassword?: string;
  newPassword?: string;
}

export default IUser;
