import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Order_detail extends Model {
        static associate(models) {
            Order_detail.belongsTo(models.Product, { foreignKey: 'product_id' });
            Order_detail.belongsTo(models.Order, { foreignKey: 'order_id' });
        }
    }
    Order_detail.init(
        {
            order_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            price: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Order_detail',
        },
    );
    Order_detail.sync();
    return Order_detail;
};
