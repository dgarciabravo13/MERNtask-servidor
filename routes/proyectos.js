//Rutas para crear proyectos
const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middleware/auth");
const {check} = require("express-validator");

//Crea un proyecto
//api/proyectos

router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre el obligatorio").not().isEmpty()
  ],
  proyectoController.crearProyecto
);

//Obtener todos los proyectos
router.get(
  "/",
  auth,
  proyectoController.obtenerProyectos
);

//Actualizar un proyecto
router.put("/:id",
  auth,
  [
    check("nombre", "El nombre el obligatorio").not().isEmpty()
  ],
  proyectoController.actualizarProyecto
);

module.exports = router;