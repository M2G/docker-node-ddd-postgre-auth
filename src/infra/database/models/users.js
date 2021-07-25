/*eslint-disable*/
const { encryptPassword } = require('../../encryption');

const table = "users";
//@ts-ignore
module.exports = function(sequelize, DataTypes) {
const User = sequelize.define(table, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
     hooks: {
    beforeCreate: ( /** @type {{ password_hash: string; dataValues: { password_hash: any; }; }} */ user) => {

      console.log('beforeCreate dataValues', user)

      user.password_hash = encryptPassword(user.dataValues.password_hash)
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
