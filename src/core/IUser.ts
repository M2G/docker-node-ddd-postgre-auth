import type { Document } from 'mongoose';

interface IUser extends Document {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  createdAt?: string;
  modifiedAt?: string;
  partnerId?: string;
}

export default IUser;
