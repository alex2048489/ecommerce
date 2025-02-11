const db = require("../models/index.js");
const Sequelize = require("sequelize");
const DashboardController = async (req, res) => {
  const totalOrder = await db.Order.count();
  const totalProduct = await db.Product.count();
  const totalUser = await db.User.count();
  const revenue = await db.Order.sum("total");

  return res.status(200).json({
    result: {
      totalOrder,
      totalProduct,
      totalUser,
      revenue,
    },
  });
};
module.exports = DashboardController;
