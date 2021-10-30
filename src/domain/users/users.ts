import t from 'tcomb';

const Users = t.struct({
  _id: t.maybe(t.Object),
  email: t.String,
  password: t.maybe(t.String),
  username: t.maybe(t.String)
});

export default Users;
