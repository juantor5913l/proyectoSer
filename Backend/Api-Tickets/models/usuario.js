import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema(
  {
    idRol: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rol",
      required: true,
    },
    nombresUsuario: {
      type: String,
      required: true,
      trim: true,
    },
    celularUsuario: {
      type: Number,
      required: true,
    },
    correoUsuario: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    direccionUsuario: {
      type: String,
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
    },
    tipoUsuario: {
      type: String, // Puedes ajustar el tipo según tus necesidades
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Resto del código...


// Uso de arrow function para mantener el contexto 'this'
usuarioSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.claveAcceso = await bcrypt.hash(this.claveAcceso, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Uso de async/await para mejorar la legibilidad
usuarioSchema.methods.comprobarClave = async function (claveFormulario) {
  return await bcrypt.compare(claveFormulario, this.claveAcceso);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
