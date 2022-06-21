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