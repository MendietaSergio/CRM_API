const express = require('express')
const router = express.Router();

//Controlladores
const {newClient,
        Clients,
        idClients
} = require('../controllers/clientsController')

module.exports = function() {
    
    router.get('/clientes', Clients)
    //agrega nuevos clientes
    router.post('/clientes', newClient)
    router.get('/clientes/:id', idClients)


    return router;
}