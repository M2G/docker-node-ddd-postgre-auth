/*eslint-disable*/
//const Store = require('./store');
//const Product = require('./product');
//const User = require('./users');

const table = "sale";
//@ts-ignore
module.exports = (sequelize, DataTypes) => {
  //@TODO no duplicate
  /*
  const Product = sequelize.define(table, {
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
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate () {
        // associations can be defined here
      }
    }
  })*/

  const Sale = sequelize.define(table, {
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
      references: { model: 'product', key: 'product_id' },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'product_id' },
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'store', key: 'store_id' },
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate: function (/** @type {any} */ models) {
        Sale.hasMany(models.Product, { foreignKey: 'fk_product', foreignKeyConstraint: true });
        Sale.hasMany(models.User, { foreignKey: 'fk_user', foreignKeyConstraint: true });
        Sale.hasMany(models.Store, { foreignKey: 'fk_store', foreignKeyConstraint: true });
      }
    }
  });

  /*
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
      references: { model: 'city', key: 'city_id' },
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate: function () {}
    }
  });*/

   // Sale.hasMany(Product, { foreignKey: 'fk_product', foreignKeyConstraint: true });
   // Sale.hasMany(User, { foreignKey: 'fk_user', foreignKeyConstraint: true });
   // Sale.hasMany(Store, { foreignKey: 'fk_store', foreignKeyConstraint: true });

   return Sale;
}
