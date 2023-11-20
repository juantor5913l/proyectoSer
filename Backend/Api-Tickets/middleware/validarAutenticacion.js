// middleware/validarAutenticacion.js
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";

const validarAutenticacion = async (req, res, next) => {
  try {
    let tokenJwt;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      tokenJwt = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(tokenJwt, process.env.JWT_SECRET);
      
      req.usuario = await Usuario.findById(decode.id).select(
        "-claveAcceso -estadoUsuario -createdAt -updatedAt -__v -idRol -celularUsuario -correoUsuario -direccionUsuario"
      );

      // Redirige a la ruta correspondiente según el rol
      if (req.usuario && req.usuario.idRol) {
        const rol = req.usuario.idRol;

        switch (rol) {
          case "655a590e6d60ee6e6679f989":
            return res.redirect("/menu-cliente");
          case "655a591a6d60ee6e6679f98f":
            return res.redirect("/menu-principal");
          case "655a6da66d60ee6e6679f9c3":
            return res.redirect("/menu-empleado");
          default:
            break;
        }
      }
    }

    return next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido", ok: "TOKEN_INVALIDO" });
  }
};

export default validarAutenticacion;
