const db = require("../models/index.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getAccount = async (req, res) => {
  const pageCurrent = parseInt(req.query.page) || 1;
  const getAll = req.query.getAll;
  const pageSize = 4;
  const offset = (pageCurrent - 1) * pageSize;
  let data;
  if (getAll) {
    data = await db.User.findAll();
  } else {
    data = await db.User.findAll({
      offset: offset,
      limit: pageSize,
    });
  }
  const dataCount = await db.User.count();
  return res.status(200).json({ accounts: data, countAllAccount: dataCount }); // Count all Brand without limit to set pageCount
};

const detailUser = async (req, res) => {
  const email = req.params.email;
  const data = await db.Brand.findOne({ where: { email: email }, raw: true });
  return res.status(200).json({ user: data });
};

const editAccount = async (req, res) => {
  try {
    const idAccount = req.params.id;
    const status = req.body.status;
    const account = await db.User.findOne({ where: { id: idAccount } });
    account.status = status;
    await account.save();
    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch {
    return res.status(201).json({ message: "Cập nhật thất bại" });
  }
};

const searchAccount = async (req, res) => {
  const email = req.query.email;

  const pageCurrent = parseInt(req.query.page) || 1;
  const pageSize = 4;
  const offset = (pageCurrent - 1) * pageSize;

  const data = await db.User.findAll({
    where: {
      email: { [Op.substring]: email },
    },
    offset: offset,
    limit: pageSize,
  });

  const dataCount = await db.User.count({
    where: {
      email: { [Op.substring]: email },
    },
  });

  return res.status(200).json({ result: data, availableUser: dataCount });
};

module.exports = {
  getAccount,
  detailUser,
  editAccount,
  searchAccount,
};
