import type { Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
}

export default IUser;
