const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  //revisar si existen errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    res.status(400).json({ errores: errores.array() });
  }

  try {
    //Crear un nuevo proyecto
    const proyecto = new Proyecto(req.body);

    //Guardar el creador via jwt
    proyecto.creador = req.usuario.id;

    //Guardamos el proyecto
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Obtiene todos los proyectos del usuario actual

exports.obtenerProyectos = async (req,res) => {
  try {
    const proyectos = await Proyecto.find({creador:req.usuario.id});
    res.json(proyectos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
}
