const Orders =require('../models/Orders')



exports.newOrders = async (req,res,next) =>{
    const order = new Orders(req.body)

    try {
        await order.save()
        res.json({
            message: "El nuevo pedido se agregó"
        })
    } catch (error) {
        console.log(error);
        next()
    }
}

exports.getOrders = async (req,res,next) =>{
    try {
        const orders = await Orders.find({}).populate('client').populate({
            path:'orders.product',
            model:'Products'
        });
        res.json(orders)
    } catch (error) {
        console.log(error);
    }
}