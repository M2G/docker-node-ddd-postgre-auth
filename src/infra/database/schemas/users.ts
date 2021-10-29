export default ({ mongoose }: any) => {

  const userSchema = new mongoose.Schema({
    email: {
      lowercase: true,
      maxlength: 255,
      minlength: 5,
      required: false,
      trim: true,
      type: String,
      unique: true
    },
    name: {
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

  userSchema.set('toJSON', { virtuals: true });

  return mongoose.model('User', userSchema);
};
