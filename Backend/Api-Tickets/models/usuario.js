import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema(
  {
    idRol: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rol",
      required: true,
      trim: true,
    },
    nombresUsuario: {
      type: String,
      required: true,
      trim: true,
    },
    celularUsuario: {
      type: Number,
      required: true,
      trim: true,
    },
    correoUsuario: {
      type: String,
      required: true,
      trim: true,
    },
    direccionUsuario: {
      type: String,
      required: false,
      trim: true,
    },
    usuarioAcceso: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    claveAcceso: {
      type: String,
      required: true,
      trim: true,
    },
    estadoUsuario: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

usuarioSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.claveAcceso = await bcrypt.hash(this.claveAcceso, salt);
  next();
});

usuarioSchema.methods.comprobarClave = async function (claveFormulario) {
  return await bcrypt.compare(claveFormulario, this.claveAcceso);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
