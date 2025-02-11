import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // define association here
      Order.hasOne(models.Transaction, {
        foreignKey: "order_id",
      });
      Order.hasMany(models.Order_detail, {
        foreignKey: "order_id",
      });
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
      payment_cash: DataTypes.BOOLEAN,
      note: DataTypes.TEXT,
      total: DataTypes.INTEGER,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  Order.sync();
  return Order;
};
