/*eslint-disable*/
const table = "country";
//@ts-ignore
module.exports = (sequelize, DataTypes) =>
  sequelize.define(table, {
    country_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    country_name: {
      type: DataTypes.STRING(450),
      allowNull: false
    },

  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate () {}
    }
  });
