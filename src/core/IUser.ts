import type { Document } from 'mongoose';

interface IUser extends Document {
  _id?: object;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string | undefined;
  createdAt?: string;
  modifiedAt?: string;
}

export default IUser;
