import t from 'tcomb';

const Users = t.struct({
  _id: t.maybe(t.Object),
  email: t.String,
  password: t.String,
  username: t.String
});

export default Users;
