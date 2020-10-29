const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const {validationResult} = require("express-validator");

exports.crearTarea = async (req, res) =>{
    //revisar si existen errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      res.status(400).json({ errores: errores.array() });
    }
};