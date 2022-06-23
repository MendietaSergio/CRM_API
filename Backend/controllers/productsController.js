const Products = require("../models/Products");
const multer = require("multer");
const shortid = require("shortid");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato No válido"));
    }
  },
};
// pasar la configuración y el campo
const upload = multer(configuracionMulter).single("img");

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error });
    }
    return next();
  });
};

exports.newProduct = async (req, res, next) => {
  const products = new Products(req.body);
  try {
    if (req.file.filename) {
      products.img = req.file.filename;
    }

    await products.save();
    res.json({
      message: "El producto se agregó",
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Products.find({});
    res.json(products);
  } catch (error) {
    console.log(error);
    next();
  }
};
exports.detailProduct = async (req, res, next) => {
  const product = await Products.findById(req.params.idProduct);

  if (!product) {
    res.json({
      message: "El producto no existe",
    });
    next();
  }

  res.json(product);
};

exports.updateProduct = async (req, res, next) => {
  try {
    let newProduct = req.body;
    if (req.file) {
      newProduct.img = req.file.filename;
    } else {
      let product = await Products.findById(req.params.idProduct);
      newProduct.img = product.img;
    }

    let updateProduct = await Products.findByIdAndUpdate(
      { _id: req.params.idProduct },
      newProduct,
      {
        new: true,
      }
    );
    res.json(updateProduct);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.deleteProduct = async ( req,res,next) =>{

    try {
        await Products.findByIdAndDelete({_id: req.params.idProduct})
        res.json({
            message: "El producto ha sido eliminado"
        })

    } catch (error) {
        console.log(error);
        next()
    }
}

exports.searchProducts = async (req,res,next) =>{
  console.log("query ", req.params);
  try {
    const {query} = req.params;
    const product = await Products.find({name: new RegExp(query, 'i')})
    res.json(product)
  } catch (error) {
    res.send(error)
    next()
  }
}