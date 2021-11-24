/*eslint-disable*/
import { encryptPassword } from '../../encryption';

// @ts-ignore
export default ({ model, Schema }) => {
  const emailMatch = [
    /([a-z0-9_\-\.])+@([a-z0-9_\-\.])+\.([a-z0-9])+/i,
    'No email found ({VALUE})',
  ];

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
      unique: true,
    },
    firstName: {
      maxlength: 100,
      minlength: 2,
      type: String,
    },
    lastName: {
      maxlength: 100,
      minlength: 2,
      type: String,
    },
    username: {
      maxlength: 100,
      minlength: 2,
      required: true,
      trim: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    created_at: {
      type: Date,
      required: false,
      default: new Date().toISOString()
    },
    modified_at: {
      type: Date,
      required: false
    }
  });

  User.pre('save', function (/** @type {() => void} */ next) {
    if (this._doc) {
      let doc = this._doc;

      console.log('doc', doc)

      if (doc.password) {
        console.log('is not modif pwd')
        doc.password = encryptPassword(doc.password);
      }
    }
    return next();
  });

  const userSchemaModel = model('User', User);

  return userSchemaModel;
};
