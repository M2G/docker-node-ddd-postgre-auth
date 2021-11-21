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
    createDate: { type: Date, default: Date.now },
    modifiedAt: Date,
  });

  const userSchemaModel = model('User', User);

  userSchemaModel.pre('save', function (/** @type {() => void} */ next) {
    if (this._doc) {
      let doc = this._doc;
      let now = new Date();

     if (doc.isModified('password')) {
       console.log('is not modif pwd')
       doc.password = encryptPassword(doc.password);
     }

      if (!doc.createdAt) {
        doc.createdAt = now;
      }
      doc.modifiedAt = now;
    }
    next();
    return this;
  });

  return userSchemaModel;
};
