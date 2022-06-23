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
module.exports = function () {
  router.get("/clientes", Clients);
  //agrega nuevos clientes
  router.post("/clientes", newClient);
  router.get("/clientes/:id", idClients);

  router.put("/clientes/:idClient", updateClient);
  router.delete("/clientes/:idClient", deleteClient);

  //PRODUCTOS
  router.get("/productos", getProducts);
  router.post("/productos", subirArchivo, newProduct);
  router.get("/productos/:idProduct", detailProduct);
  router.put("/productos/:idProduct", subirArchivo, updateProduct);
  router.delete("/productos/:idProduct", deleteProduct); 
  //BUSQUEDA
  router.get('/productos/busqueda/:query',searchProducts)

  //PEDIDOS
  router.post('/pedidos/nuevo/:id', newOrders)
  router.get('/pedidos', getOrders)
  router.get('/pedidos/:detailOrder', detailOrder)
  router.put('/pedidos/:updateOrder', updateOrder)
  router.delete('/pedidos/:deleteOrder', deleteOrder)

  //USUARIOS
  router.post('/registrarse', registerUser)
  router.post('/iniciar-sesion', authUser)
  return router;
};
