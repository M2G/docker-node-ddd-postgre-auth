import type { Document } from 'mongoose';

interface IUser extends Document {
  _id?: number;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string | undefined;
  createdAt?: string;
  modifiedAt?: string;
}

export default IUser;
