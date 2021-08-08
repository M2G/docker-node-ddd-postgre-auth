import t from 'tcomb';
import {compose} from 'ramda';

const Users = t.struct({
  id: t.maybe(t.Number),
  password: t.maybe(t.String),
  username: t.String
});

export default compose(
  Users
);
