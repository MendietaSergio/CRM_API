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
  router.delete("/productos/idProduct", deleteProduct); 

  return router;
};
