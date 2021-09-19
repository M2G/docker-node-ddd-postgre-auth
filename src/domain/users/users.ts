import t from 'tcomb';

const Users = t.struct({
  id: t.maybe(t.Number),
  password: t.String,
  username: t.String
});

export default Users;
