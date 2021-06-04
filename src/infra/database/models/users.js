/*eslint-disable*/
const { encryptPassword } = require('../../encryption');

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
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  verificationCode: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  isVerified: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isDeleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false
  },
  updatedBy: {
    type: DataTypes.UUID,
    allowNull: true
  }
}, {
  hooks: {
    beforeCreate: (/** @type {{ password: string; }} */ user) => {
      user.password = encryptPassword(user.password)
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
