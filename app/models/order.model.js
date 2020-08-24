module.exports = (sequelize, Sequelize)=>{
    const Order = sequelize.define("orders", {

        quantity:{
            type: Sequelize.INTEGER
        },
        total:{
            type: Sequelize.FLOAT

        }
    });
    
    return Order;
}