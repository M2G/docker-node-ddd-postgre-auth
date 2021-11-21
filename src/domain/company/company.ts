import t from 'tcomb';

const Company = t.struct({
  _id: t.maybe(t.String),
  name: t.String,
  address: t.String,
  contact: t.String,
  tin: t.String,
  sss: t.String,
  createdBy: t.maybe(t.String),
  updatedBy: t.maybe(t.String),
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date),
});

export default Company;
