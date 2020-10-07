const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const {validationResult} = require("express-validator");

exports.crearUsuario = async (req, res) => {

  //revisar si existen errores
  const errores = validationResult(req);
  if(!errores.isEmpty()){
    res.status(400).json({errores:errores.array()});
  }

  //extraer email y password
  const { email, password } = req.body;

  try {
    //Revisar que el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }
    //crea el nuevo usuario")
    usuario = new Usuario(req.body);

    //Hashesar el password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //guarda el usuario
    await usuario.save();

    //mensaje de confirmación
    res.json({ msg: "Usuario Creado Correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
