export default ({ mongoose }: any) => {
  const userSchema = new mongoose.Schema({
    id: String,
    password_hash: String,
    username: String
  });

  return mongoose.model('User', userSchema);
};
