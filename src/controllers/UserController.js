import db from "../models/index.js";
import bcrypt from "bcrypt";
import Sequelize from "sequelize";
import jwt from "jsonwebtoken";
const Op = Sequelize.Op;

export const addUser = async (req, res) => {
  try {
    const userInfo = await db.User.findOne({
      where: { email: req.body.email },
    });
    if (!userInfo) {
      const hash = await bcrypt.hash(req.body.password, 10);
      await db.User.create({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: hash,
      });
      return res.status(200).json({ message: "Thêm mới thành công" });
    } else return res.status(400).json({ message: "Email đã tồn tại" });
  } catch {
    return res.status(500).json({ message: "Thêm mới thất bại" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInfo = await db.User.findOne({
      where: { email },
    });
    if (userInfo) {
      const checkPassword = await bcrypt.compare(password, userInfo.password);
      if (!checkPassword)
        return res.status(400).json({ message: "Mật khẩu không chính xác" });
      const token = jwt.sign(
        { email, name: userInfo.name },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );
      res.cookie("user", token, {
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ message: "Successful", token, expires: 7 });
    } else
      res.status(400).json({
        message: "Email không hợp lệ",
      });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "Đăng nhập thất bại" });
  }
};

export const detailUser = async (req, res) => {
  // const idBrand = req.params.id;
  const email = req.query.email;
  const data = await db.User.findOne({ where: { email: email }, raw: true });
  return res.status(200).json({ user: data });
};

export const logoutUser = async (req, res) => {
  try {
    console.log("Log out success");
    res.clearCookie("user");
    res.json({ mess: "Đăng xuất thành công" });
  } catch (error) {
    res.status(500).json(error);
  }
};
