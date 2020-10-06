const express = require("express");
const conectarDB = require("./config/db");

//crear el servidor
const app = express();

//conectar a la bbdd
conectarDB();

//puerto de app
const PORT = process.env.PORT || 4000;

//arrancar la app
app.listen(PORT, () =>{
  console.log(`el servidor esta funcionando en el puerto ${PORT}`);
})
