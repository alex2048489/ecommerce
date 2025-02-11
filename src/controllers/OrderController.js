import db from "../models/index.js";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

export const getOrder = async (req, res) => {
  const pageCurrent = parseInt(req.query.page) || 1;
  const pageSize = 4;
  const offset = (pageCurrent - 1) * pageSize;
  let data = [];
  if (req.query.getAll) {
    data = await db.Order.findAll({});
  } else {
    data = await db.Order.findAll({
      offset: offset,
      limit: pageSize,
      include: [{ model: db.User }, { model: db.Transaction }],
    });
  }
  const dataCount = await db.Order.count();
  return res.status(200).json({ orders: data, countAllOrder: dataCount }); // Count all Brand without limit to set pageCount
};

export const addOrder = async (req, res) => {
  const { user_id, status, total, address, payment_cash, phone } = req.body;
  console.log("req.body: ", req.body);
  try {
    if (!user_id || total === 0 || !address) {
      console.log("Error 400");
      return res
        .status(400)
        .json({ type: "error", message: "Đặt hàng thất bại" });
    } else {
      const order = await db.Order.create({
        user_id,
        status,
        total,
        address,
        payment_cash,
        phone,
      });
      return res.status(200).json({
        result: order,
        type: "success",
        message: "Đặt hàng thành công",
      });
    }
  } catch (error) {
    console.log("48. error: ", error);
    return res
      .status(500)
      .json({ type: "error", message: "Đặt hàng thất bại", error });
  }
};

export const detailUser = async (req, res) => {
  // const idBrand = req.params.id;
  const email = req.params.email;

  const data = await db.Brand.findOne({ where: { email: email }, raw: true });
  return res.status(200).json({ user: data });
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await db.Order.findByPk(req.params.id);
    if (order) {
      order.status = 0;
      await order.save();
      return res.status(200).json({ message: "Cập nhật thành công" });
    } else return res.status(400).json({ message: "Không tìm thấy đơn hàng" });
  } catch {
    return res.status(500).json({ message: "Hủy đơn hàng thất bại" });
  }
};

export const editOrder = async (req, res) => {
  try {
    const idOrder = req.params.id;
    const status = req.body.status;
    const order = await db.Order.findOne({ where: { id: idOrder } });

    order.status = status;
    await order.save();
    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch {
    return res.status(201).json({ message: "Cập nhật thất bại" });
  }
};

export const searchOrder = async (req, res) => {
  const order_id = req.query.order_id;
  const user_id = req.query.user_id;

  let whereQuery;

  if (order_id) {
    whereQuery = { id: order_id };
  } else {
    whereQuery = { user_id: user_id };
  }

  const data = await db.Order.findAll({
    where: whereQuery,
    include: db.User,
    raw: user_id ? true : false,
    order: [["createdAt", "DESC"]],
  });

  const listOrderID = data.map((order) => order.id);

  const getFirstDetail = await Promise.all(
    listOrderID.map((id) => {
      return new Promise(async (resolve) => {
        const firstDetail = await db.Order_detail.findOne({
          include: [
            {
              model: db.Order,
              where: {
                id: id,
              },
            },
            { model: db.Product },
          ],
        });
        resolve(firstDetail);
      });
    })
  );

  const orders = data.map((order) => {
    const [orderDisplay] = getFirstDetail.filter(
      (detail) => detail.order_id === order.id
    );
    return { ...order, order_display: orderDisplay };
  });

  return res.status(200).json({ result: user_id ? orders : data });
};
