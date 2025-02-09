import express from "express";
import HomeController from "../controllers/HomeController.js";
import DashboardController from "../controllers/DashboardController.js";
import {
  AccountController,
  ArticleController,
  BrandController,
  CategoryController,
  DiscountController,
  OrderController,
  OrderDetailController,
  PaymentController,
  ProductController,
  UserController,
} from "../controllers/index.js";

const router = express.Router();
export const initAPIRoutes = (app) => {
  //Homepage
  router.get("/search", HomeController);

  //Product
  router.get("/products", ProductController.getProduct);
  router.post("/product/add", ProductController.addProduct);
  router.put("/product/edit/:id", ProductController.editProduct);
  router.delete("/product/delete/:id", ProductController.deleteProduct);
  router.get("/product/detail", ProductController.detailProduct);
  router.get("/product/search", ProductController.searchProduct);

  //Category
  router.get("/categories", CategoryController.getCategory);
  router.post("/category/add", CategoryController.addCategory);
  router.put("/category/edit/:id", CategoryController.editCategory);
  router.get("/category/detail/:id", CategoryController.detailCategory);
  router.delete("/category/delete/:id", CategoryController.deleteCategory);
  router.get("/category/search", CategoryController.searchCategory);

  //Article
  router.get("/articles", ArticleController.getArticle);
  router.post("/article/add", ArticleController.addArticle);
  router.put("/article/edit/:id", ArticleController.editArticle);
  router.get("/article/detail/:id", ArticleController.detailArticle);
  router.delete("/article/delete/:id", ArticleController.deleteArticle);
  router.get("/article/search", ArticleController.searchArticle);

  //Brand
  router.get("/brands", BrandController.getBrand);
  router.post("/brand/add", BrandController.addBrand);
  router.put("/brand/edit/:id", BrandController.editBrand);
  router.get("/brand/detail/:id", BrandController.detailBrand);
  router.delete("/brand/delete/:id", BrandController.deleteBrand);
  router.get("/brand/search", BrandController.searchBrand);

  //Discount
  router.get("/discounts", DiscountController.getDiscount);
  router.post("/discount/add", DiscountController.addDiscount);
  router.put("/discount/edit/:id", DiscountController.editDiscount);
  router.get("/discount/detail/:id", DiscountController.detailDiscount);
  router.delete("/discount/delete/:id", DiscountController.deleteDiscount);
  router.get("/discount/search", DiscountController.searchDiscount);

  //User
  router.get("/user/detail", UserController.detailUser);
  router.post("/user/add", UserController.addUser);
  router.post("/user/login", UserController.loginUser);
  router.post("/user/logout", UserController.logoutUser);

  //Account
  router.get("/accounts", AccountController.getAccount);
  router.get("/account/detail/:id", AccountController.detailUser);
  router.put("/account/edit/:id", AccountController.editAccount);
  router.get("/account/search", AccountController.searchAccount);

  //Order
  router.get("/order", OrderController.getOrder);
  router.post("/order/add", OrderController.addOrder);
  router.put("/order/cancel/:id", OrderController.cancelOrder);
  router.put("/order/edit/:id", OrderController.editOrder);
  router.get("/order/search", OrderController.searchOrder);

  //OrderDetail
  router.post("/orderDetail/add", OrderDetailController.addOrderDetail);
  router.get("/orderDetail/search", OrderDetailController.searchOrderDetail);

  //Dashboard
  router.get("/dashboard", DashboardController);

  //Transaction
  router.post("/payment", PaymentController.addTransaction);
  router.post(
    "/payment/checkout-session",
    PaymentController.createCheckoutSession
  );
  router.post(
    "/payment/webhooks",
    express.raw({ type: "application/json" }),
    PaymentController.handleStripeWebhook
  );

  //Middleware check nếu url có tiền tố /api mới gọi router
  return app.use("/api/", router);
};
