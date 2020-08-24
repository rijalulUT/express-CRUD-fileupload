module.exports = app => {
    const orders = require("../controllers/order.controller");

    let router = require("express").Router();

    //create a new Order
    router.post("/", orders.createOrder);

    app.use("/api/order", router);
}