const Products = require('../models/Products')


exports.newProduct = async (req,res,next) =>{
    const products = new Products(req.body)
    try {
        await products.save()
        res.json({
            message: "El producto se agregó"
        })
    } catch (error) {
        console.log(error);
        next()
    }
}