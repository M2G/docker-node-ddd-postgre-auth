/*eslint-disable*/
// const City = require('./city');

const table = "store";
// const table_city = "city";
//@ts-ignore
module.exports = (sequelize, DataTypes) => {
  /*
  const City = sequelize.define(table_city, {
    city_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    country_name: {
      type: DataTypes.STRING(450),
      allowNull: false
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: { model: 'country', key: 'country_id'},
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate() {}
    }
  });*/

  const Store = sequelize.define(table, {
    store_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: { model: 'city', key: 'city_id' },
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate: function (/** @type {any} */ models) {
        Store.hasOne(models.City, { foreignKey: 'fk_city', foreignKeyConstraint: true });
      }
    }
  });

   // Store.hasOne(City, { foreignKey: 'fk_city', foreignKeyConstraint: true });

   return Store;
}
