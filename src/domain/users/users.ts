/*eslint-disable*/
// @ts-ignore
import { attributes } from 'structure';

const Users = attributes({
  id: Number,
  username: String,
  password_hash: String
})(class Users {});

export default Users;

