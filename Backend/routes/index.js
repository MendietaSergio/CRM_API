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
} = require("../controllers/productsController");
const {
  newOrders,
  getOrders,
  detailOrder,
  updateOrder,
  deleteOrder
} = require("../controllers/ordersController");

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

  //PEDIDOS
  router.post('/pedidos', newOrders)
  router.get('/pedidos', getOrders)
  router.get('/pedidos/:detailOrder', detailOrder)
  router.put('/pedidos/:updateOrder', updateOrder)
  router.delete('/pedidos/:deleteOrder', deleteOrder)

  return router;
};
