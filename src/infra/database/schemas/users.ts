/*eslint-disable*/
import type { Model } from 'mongoose';
import { Schema, model } from 'mongoose';
import type { IUser } from '../../../core/user';

export default ({ mongoose }: any) => {
   // Validation match
   //  let phone_match = [/[\+0-9]+/, "No phone number found ({VALUE})"];
  const emailMatch = [/([a-z0-9_\-\.])+@([a-z0-9_\-\.])+\.([a-z0-9])+/i, "No email found ({VALUE})"] as [RegExp, string];
  // const { Schema } = mongoose;

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

  const userSchemaModel: Model<IUser> = model<IUser>('User', User);

  return userSchemaModel;
};
