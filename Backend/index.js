const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config()

const cors = require('cors')

app.use(express.static('uploads'))
//Habilitar datos de entrada por parametros
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whiteList = [process.env.FRONTEND_URL]

const corsOptions ={
  origin: (origin, callback) =>{
    //revisar si la peticion esta en la whitelist
    // console.log(origin);
    const success = whiteList.some(dominio => dominio === origin)
    if(success) {
      callback(null, true)
    } else{
      callback(new Error('No permitido por CORS'))
    }
  }
}

app.use(cors(corsOptions))
// app.use(cors())
//conectando mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("conectado"))
  .catch((error) => console.log(error));



//rutas de la app
app.use("/", routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;
app.listen(port, host, () =>{
  "Servidor funcionando"
});
