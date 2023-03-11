
const userRouter = require("./api/user/user.router");
const productRouter = require("./api/product/product.router");
const categoryRouter = require("./api/category/category.router");
const orderRouter = require("./api/order/order.router");
const couponRouter = require("./api/coupon/coupon.router");
const addressRouter = require("./api/address/address.router");
const supplierRouter = require("./api/supplier/supplier.router");
const shippingRouter = require("./api/shipping/shipping.router");
const paymentRouter = require("./api/payment/payment.router");
const ratingRouter = require("./api/rating/rating.router");
const vehicleRouter = require("./api/vehicle/vehicle.router");
const roleRouter = require("./api/roles/role.router");
const tagRouter = require("./api/tag/tag.router");
const collectionsRouter = require("./api/collections/collections.router");
const verificationRouter = require("./api/verification/verification.router");


const routes = require("express").Router();
routes.use("/maz-api/users", userRouter);
routes.use("/maz-api/products", productRouter);
routes.use("/maz-api/categories", categoryRouter);
routes.use("/maz-api/orders", orderRouter);
routes.use("/maz-api/coupons", couponRouter);
routes.use("/maz-api/addresses", addressRouter);
routes.use("/maz-api/suppliers", supplierRouter);
routes.use("/maz-api/shipping", shippingRouter);
routes.use("/maz-api/payment", paymentRouter);
routes.use("/maz-api/rating", ratingRouter);
routes.use("/maz-api/vehicles", vehicleRouter);
routes.use("/maz-api/roles", roleRouter);
routes.use("/maz-api/tags", tagRouter);
routes.use("/maz-api/collections", collectionsRouter);
routes.use("/maz-api/verification", verificationRouter);

module.exports = routes;