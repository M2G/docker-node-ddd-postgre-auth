/*eslint-disable*/
// const Sale = require('./sale');
//  const Status = require('./status_name');

const table = "order_status";
// const table_status_name = "status_name";
// const table_sale = "sale";
//@ts-ignore
module.exports = (sequelize, DataTypes) => {
  /*
  const Status = sequelize.define(table_status_name, {
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

  const Sale = sequelize.define(table_sale, {
    sale_id: {
      type: DataTypes.STRING(200),
      primaryKey: true,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_sale: {
      type: DataTypes.DATE,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'product', key: 'product_id'},
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'product_id'},
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'store', key: 'store_id'},
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate() {

      }
    }
  });*/

  const OrderStatus = sequelize.define(table, {
   order_status_id: {
      type: DataTypes.STRING(200),
      primaryKey: true,
      allowNull: false
    },
   update_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
   sale_id: {
     type: DataTypes.STRING(200),
     allowNull: false,
     references: { model: 'sale', key: 'sale_id'},
   },
   status_name_id: {
     type: DataTypes.INTEGER,
     allowNull: false,
     references: { model: 'status_name', key: 'status_name_id'},
   },
  }, {
    freezeTableName: true,
    timestamps: false,
    associate: function (/** @type {any} */ models) {
      console.log('models', models)
      OrderStatus.hasOne(models.Sale, { foreignKey: 'fk_sale', foreignKeyConstraint: true });
      OrderStatus.hasOne(models.Status, { foreignKey: 'fk_status_name', foreignKeyConstraint: true });
    }
  });

  // OrderStatus.hasOne(Sale, { foreignKey: 'fk_sale', foreignKeyConstraint: true });
  // OrderStatus.hasOne(Status, { foreignKey: 'fk_status_name', foreignKeyConstraint: true });

  return OrderStatus;

};

