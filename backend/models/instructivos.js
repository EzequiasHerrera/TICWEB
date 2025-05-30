const mongoose = require("mongoose");

const instructivoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    contenido: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    downloadURL:{
      type: String,
      required: true,
    },
    autor: {
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
    soloEmpleados: {
      //AGREGO BOOLEAN PARA UTILIZARLO EN LAS SOLICITUDES DE INSTRUCTIVOS TANTO DESDE CLIENTE COMO DE EMPLEADOS
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    collection: "instructivos",
    timestamps: true,
  }
);

const Instructivo = mongoose.model("Instructivo", instructivoSchema);

module.exports = Instructivo;
