"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasOne(models.Order, {
        foreignKey: "order_id",
      });
    }
  }
  Transaction.init(
    {
      account: DataTypes.STRING,
      fullName: DataTypes.STRING,
      isSuccess: DataTypes.BOOLEAN,
      order_id: DataTypes.INTEGER,
      pay_method: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
