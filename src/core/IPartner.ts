import type { Document } from 'mongoose';

interface IParner extends Document {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  createdAt?: string;
  modifiedAt?: string;
}

export default IParner;
