import t from 'tcomb';

const Users = t.struct({
  _id: t.maybe(t.Any),
  created_at: t.maybe(t.Any),
  email: t.maybe(t.String),
  first_name: t.maybe(t.String),
  last_name: t.maybe(t.String),
  modified_at: t.maybe(t.Any),
  password: t.maybe(t.String),
  username: t.maybe(t.String),
});

export default Users;
