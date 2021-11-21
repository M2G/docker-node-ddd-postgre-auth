/*eslint-disable*/
// @ts-ignore
export default ({ model, Schema }) => {
  const emailMatch = [
    /([a-z0-9_\-\.])+@([a-z0-9_\-\.])+\.([a-z0-9])+/i,
    'No email found ({VALUE})',
  ];

  /**
   * Partner schema for mangoose
   * @type {Schema}
   */
  const Partner = new Schema({
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
    createdAt: {
      type: Date,
      required: false,
      default: new Date().toISOString()
    },
    modifiedAt: {
      type: Date,
      required: false
    }
  });

  Partner.pre('save', function (/** @type {() => void} */ next) {
    if (this._doc) {
      let doc = this._doc;

      console.log('doc', doc)
    }
    return next();
  });

  const partnerSchemaModel = model('Partner', Partner);

  return partnerSchemaModel;
};
