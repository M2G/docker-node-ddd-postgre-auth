/*eslint-disable*/
// import IUser from '../../../core/IUser';

export default ({ model, Schema }) => {
  const emailMatch = [/([a-z0-9_\-\.])+@([a-z0-9_\-\.])+\.([a-z0-9])+/i, "No email found ({VALUE})"];

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

  const userSchemaModel = model('User', User);

  return userSchemaModel;
};
