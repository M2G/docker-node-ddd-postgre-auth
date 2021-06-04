/*eslint-disable*/
const table = "status_name";
//@ts-ignore
module.exports = (sequelize, DataTypes) =>
  sequelize.define(table, {
    status_name_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    status_name: {
      type: DataTypes.STRING(450),
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate() {}
    }
  });
