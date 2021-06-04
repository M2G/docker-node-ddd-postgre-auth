/*eslint-disable*/
const table = "product";
//@ts-ignore
module.exports = (sequelize, DataTypes) =>
  sequelize.define(table, {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },

  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate() {}
    }
  });
