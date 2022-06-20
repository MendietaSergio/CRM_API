const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const app = express()


//conectando mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true
})

//rutas de la app
app.use('/', routes())


app.listen(5000)