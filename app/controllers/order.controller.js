const db = require("../models/index");

const Order = db.order;

exports.createOrder = function (req, res) {

    //Validate request
    if(!req.body.quantity || !req.body.total) {
        res.status(400).send(
            {
                message: "can not be empty"
            }
        );
        return;
    }

    const order = {
        quantity: req.body.quantity,
        total: req.body.total,
        userId: req.body.userId,
    }

    Order.create(order) // Insert into users
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Some error occured while creating the Order"
            })
        });
    
};