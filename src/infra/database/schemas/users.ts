/*eslint-disable*/
import type { Model } from 'mongoose';
import type IUser from '../../../core/IUser';

export default ({ model, Schema }: any) => {
  const emailMatch = [/([a-z0-9_\-\.])+@([a-z0-9_\-\.])+\.([a-z0-9])+/i, "No email found ({VALUE})"] as [RegExp, string];

  /**
   * User schema for mangoose
   * @type {Schema}
   */
  const User = new Schema({
    email: {
      lowercase: true,
      match: emailMatch,
      maxlength: 255,
      minlength: 5,
      required: false,
      trim: true,
      type: String,
      unique: true
    },
    username: {
      maxlength: 100,
      minlength: 2,
      required: true,
      trim: true,
      type: String
    },
    password: {
      required: true,
      type: String
    }
  });

  // @ts-ignore
  const userSchemaModel: Model<IUser> = model<IUser>('User', User);

  return userSchemaModel;
};
