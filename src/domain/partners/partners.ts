import t from 'tcomb';

const Partners = t.struct({
  _id: t.maybe(t.Object),
  email: t.maybe(t.String),
  firstName: t.maybe(t.String),
  lastName: t.maybe(t.String),
  password: t.maybe(t.String),
  username: t.maybe(t.String),
});

export default Partners;
