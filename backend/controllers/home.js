const Noticia = require("../models/noticias");
const Instructivo = require("../models/instructivos");
const Empleado = require("../models/empleados");

const getIndex = async (req, res, next) => {
  try {
    const noticias = await Noticia.find().limit(3);
    const instructivos = await Instructivo.find().limit(3);

    const empleadosNombres = (await Empleado.find()).map((e) => e.nombre);

    const datos = {
      nombre: "TIC",
      descripcion: "Tecnología de Información y Comunicación",
      logo: "logo de TIC",
      email: "ayuda@inspt.utn.edu.ar",
      interno: "4552-4176 Interno 146",
      direccion: "Piso 3 TIC",
      mision: "mision de TIC",
      vision: "vision de TIC",
      empleados: empleadosNombres,
    };

    res.status(200).json({
      noticias,
      instructivos,
      datos,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { getIndex };
