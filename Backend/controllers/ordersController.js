const Orders = require("../models/Orders");

exports.newOrders = async (req, res, next) => {
  const order = new Orders(req.body);

  try {
    await order.save();
    res.json({
      message: "El nuevo pedido se agregó",
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Orders.find({}).populate("client").populate({
      path: "orders.product",
      model: "Products",
    });
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

exports.detailOrder = async (req, res, next) => {
  const order = await Orders.findById(req.params.detailOrder)
    .populate("client")
    .populate({
      path: "orders.product",
      model: "Products",
    });

  if (!order) {
    res.json({ messaje: "La orden de pedido no existe" });
  }

  res.json(order);
};

exports.updateOrder = async (req, res, next) => {
  try {
    let orders = await Orders.findByIdAndUpdate(
      { _id: req.params.updateOrder },
      req.body,
      {
        new: true,
      }
    )
      .populate("client")
      .populate({
        path: "orders.product",
        model: "Products",
      });
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteOrder = async (req,res,next) =>{
    try {
        await Orders.findOneAndDelete({_id: req.params.deleteOrder})
        res.json({message: "El pedido se ha eliminado"})
    } catch (error) {
        console.log(error);
        next()
    }
}