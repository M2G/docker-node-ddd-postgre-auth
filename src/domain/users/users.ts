import t from 'tcomb';

const Users = t.struct({
  _id: t.maybe(t.Object),
  createdAt: t.maybe(t.Date),
  email: t.maybe(t.String),
  firstName: t.maybe(t.String),
  lastName: t.maybe(t.String),
  modifiedAt: t.maybe(t.Date),
  password: t.maybe(t.String),
  username: t.maybe(t.String),
});

export default Users;
