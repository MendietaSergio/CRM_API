const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const app = express()

//Habilitar datos de entrada por parametros
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


//conectando mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true
})

//rutas de la app
app.use('/', routes())


app.listen(5000)