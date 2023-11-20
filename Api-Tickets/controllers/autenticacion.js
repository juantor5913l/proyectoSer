// controllers/autenticacion.js
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";
import generarJWT from "../helpers/generarJWT.js";

const autenticar = async (req, res) => {
  try {
    const { usuarioAcceso, claveAcceso } = req.body;
    const usuario = await Usuario.findOne({ usuarioAcceso });

    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no existe", ok: "NO_EXISTE" });
    }

    const claveCorrecta = await usuario.comprobarClave(claveAcceso);

    if (claveCorrecta) {
      const { _id, nombresUsuario, idRol } = usuario;
      const tokenJwt = generarJWT(_id);

      return res.json({
        _id,
        nombresUsuario,
        usuarioAcceso,
        idRol,
        tokenJwt,
      });
    } else {
      return res.json({ msg: "La clave es incorrecta", ok: "CLAVE_ERRONEA" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error en el servidor", ok: "ERROR_SERVIDOR" });
  }
};

export { autenticar };
