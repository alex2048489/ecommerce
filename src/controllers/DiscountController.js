const db = require("../models/index.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getDiscount = async (req, res) => {
  try {
    const pageCurrent = parseInt(req.query.page) || 1;
    const getAll = req.query.getAll;
    const pageSize = 4;
    const offset = (pageCurrent - 1) * pageSize;
    let data;
    if (getAll) {
      data = await db.Banner.findAll();
    } else {
      data = await db.Banner.findAll({
        offset: offset,
        limit: pageSize,
      });
    }
    const dataCount = await db.Banner.count();
    return res
      .status(200)
      .json({ discounts: data, countAllDiscount: dataCount }); // Count all Discount without limit to set pageCount
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "Error" });
  }
};

const addDiscount = async (req, res) => {
  try {
    await db.Banner.create({
      name: req.body.name,
      image: req.body.image,
    });
    return res.status(200).json({ message: "Thêm mới thành công" });
  } catch {
    return res.status(500).json({ message: "Thêm mới thất bại" });
  }
};

const deleteDiscount = async (req, res) => {
  const idDiscount = req.params.id;
  try {
    await db.Banner.destroy({
      where: {
        id: idDiscount,
      },
    });
    return res.status(200).json({ message: "Xóa thương hiệu thành công" });
  } catch (e) {
    return res.status(500).json({ message: "Thương hiệu này không thể xóa" });
  }
};

const detailDiscount = async (req, res) => {
  const idDiscount = req.params.id;
  const data = await db.Banner.findOne({
    where: { id: idDiscount },
    raw: true,
  });
  return res.status(200).json({ discount: data });
};

const editDiscount = async (req, res) => {
  try {
    const idDiscount = req.params.id;
    const discount = await db.Banner.findOne({ where: { id: idDiscount } });
    discount.name = req.body.name;
    discount.image = req.body.image;
    await discount.save();
    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch {
    return res.status(500).json({ message: "Cập nhật thất bại" });
  }
};

const searchDiscount = async (req, res) => {
  const searchQuery = req.query.name;
  const pageCurrent = parseInt(req.query.page) || 1;
  const pageSize = 4;
  const offset = (pageCurrent - 1) * pageSize;

  const data = await db.Banner.findAll({
    where: {
      name: { [Op.substring]: searchQuery },
    },
    offset: offset,
    limit: pageSize,
  });

  const dataCount = await db.Banner.count({
    where: {
      name: { [Op.substring]: searchQuery },
    },
  });

  return res.status(200).json({ result: data, availableDiscount: dataCount });
};

module.exports = {
  getDiscount,
  addDiscount,
  deleteDiscount,
  detailDiscount,
  editDiscount,
  searchDiscount,
};
