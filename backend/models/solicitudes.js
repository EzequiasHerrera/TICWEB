const mongoose = require("mongoose");
const Empleado = require("./empleados");

const solicitudSchema = new mongoose.Schema(
  {
    emailSolicitante: {
      type: String,
      required: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email inválido",
      ],
    },
    asunto: {
      type: String,
      required: true,
    },
    texto: {
      type: String,
      required: true,
    },
    categoria: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria",
        required: true,
      },
      nombre: String,
    },
    notas: {
      type: String,
    },
    empleado: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empleado",
      },
      nombre: {
        type: String,
      },
    },
    estado: {
      type: String,
      enum: ["pendiente", "en_proceso", "completada", "cancelada"],
      default: "pendiente",
    },
  },
  {
    collection: "solicitudes",
    timestamps: true,
  }
);

solicitudSchema.pre("updateMany", async function (next) {
  const update = this.getUpdate();

  const estado = update.$set?.estado;

  if (estado !== "cancelada") {
    return next();
  }

  const filter = this.getFilter();

  try {
    const solicitudes = await Solicitud.find(filter);

    await Promise.all(
      solicitudes.map(async (solicitud) => {
        return await Empleado.updateOne(
          { "solicitudes._id": solicitud._id },
          {
            $set: {
              "solicitudes.$.estado": "cancelada",
            },
          }
        );
      })
    );

    next();
  } catch (error) {
    next(error);
  }
});

const Solicitud = mongoose.model("Solicitud", solicitudSchema);

module.exports = Solicitud;
