import mongoose from "mongoose";
import bcrypt from "bcrypt";

const empleadoSchema = mongoose.Schema(
  {
    idRol: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rol",
      required: true,
      trim: true,
    },
    nombresEmpleado: {
      type: String,
      required: true,
      trim: true,
    },
    celularEmpleado: {
      type: Number,
      required: true,
      trim: true,
    },
    correoEmpleado: {
      type: String,
      required: true,
      trim: true,
    },
    direccionEmpleado: {
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
    estadoEmpleado: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

empleadoSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.claveAcceso = await bcrypt.hash(this.claveAcceso, salt);
});

empleadoSchema.methods.comprobarClave = async function (claveFormulario) {
  return await bcrypt.compare(claveFormulario, this.claveAcceso);
};

const Empleado = mongoose.model("Empleado", empleadoSchema);
export default Empleado;
