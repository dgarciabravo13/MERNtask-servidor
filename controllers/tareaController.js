const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const {validationResult} = require("express-validator");

exports.crearTarea = async (req, res) =>{
    //revisar si existen errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      res.status(400).json({ errores: errores.array() });
    }

    //Extraer el proyecto
    const {proyecto} = req.body;
    //Comprobar si existe
    try {

      const existeProyecto = await Proyecto.findById(proyecto);
      if(!existeProyecto){
        return res.status(404).json({msg:"Proyecto no encontrado"});
      }

      //Revisar si el proyecto actual pertenece al usuario autenticado
      if (existeProyecto.creador.toString() !== req.usuario.id) {
        return res.status(401).json({ msg: "No autorizado" });
      }

      //Creamos la tarea
      const tarea = new Tarea(req.body);
      await tarea.save();
      res.json({tarea});
      
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
};