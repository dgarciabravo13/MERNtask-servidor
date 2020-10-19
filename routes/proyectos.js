//Rutas para crear proyectos
const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middleware/auth");

//Crea un proyecto
//api/proyectos

router.post(
  "/",
  auth,
  proyectoController.crearProyecto
);

module.exports = router;