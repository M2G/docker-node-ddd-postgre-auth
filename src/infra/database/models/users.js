/*eslint-disable*/
// const { encryptPassword } = require('../../encryption');

const table = "users";
//@ts-ignore
module.exports = function(sequelize, DataTypes) {
const User = sequelize.define(table, {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
     hooks: {
    beforeCreate: (/** @type {{ password_hash: string; }} */ user) => {

      console.log('beforeCreate user', user)

      // user.password_hash = encryptPassword(user.password_hash)
      }
    },
  freezeTableName: true,
  timestamps: false,
  classMethods: {
    associate () {
      // associations can be defined here
    }
  }
})

return User;

}
