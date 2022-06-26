const express = require("express");
const router = express.Router();

//Controlladores
const {
  newClient,
  Clients,
  idClients,
  updateClient,
  deleteClient,
} = require("../controllers/clientsController");
const {
  newProduct,
  subirArchivo,
  getProducts,
  detailProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} = require("../controllers/productsController");
const {
  newOrders,
  getOrders,
  detailOrder,
  updateOrder,
  deleteOrder
} = require("../controllers/ordersController");

const {registerUser, authUser} = require('../controllers/usersController')

const auth = require('../middleware/Auth')


module.exports = function () {
  router.get('/', (req,res) =>{
    res.send(`Servidor para proyecto MERN, ClienteAPI.
    process.env.FRONTEND_URL => 
    ${process.env.FRONTEND_URL}`)
  })
  router.get("/clientes", auth, Clients);
  //agrega nuevos clientes
  router.post("/clientes", newClient);
  router.get("/clientes/:id", auth,idClients);

  router.put("/clientes/:idClient", updateClient);
  router.delete("/clientes/:idClient", auth,deleteClient);

  //PRODUCTOS
  router.get("/productos", auth,getProducts);
  router.post("/productos",auth, subirArchivo, newProduct);
  router.get("/productos/:idProduct",auth, detailProduct);
  router.put("/productos/:idProduct", subirArchivo, updateProduct);
  router.delete("/productos/:idProduct", auth,deleteProduct); 
  //BUSQUEDA
  router.get('/productos/busqueda/:query',auth, searchProducts)

  //PEDIDOS
  router.post('/pedidos/nuevo/:id', newOrders)
  router.get('/pedidos', auth, getOrders)
  router.get('/pedidos/:detailOrder', auth,detailOrder)
  router.put('/pedidos/:updateOrder', auth,updateOrder)
  router.delete('/pedidos/:deleteOrder', auth,deleteOrder)

  //USUARIOS
  router.post('/registrarse',auth, registerUser)
  router.post('/iniciar-sesion', authUser)
  return router;
};
