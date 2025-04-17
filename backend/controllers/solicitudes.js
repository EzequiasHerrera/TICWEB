const Solicitud = require("../models/solicitudes");
const Empleado = require("../models/empleados");
const Categoria = require("../models/categorias");
const { checkExists } = require("../helpers/errorHandler");

const getSolicitudes = async (req, res, next) => {
  try {
    const solicitudes = await Solicitud.find();
    checkExists(solicitudes, "No se encontraron solicitudes", 404);
    res.status(200).json(solicitudes);
  } catch (e) {
    next(e);
  }
};

const getSolicitud = async (req, res, next) => { //este "message": "Cast to ObjectId failed for value \":id\" (type string) at path \"_id\" for model \"Solicitud\""
  try {
    const id = req.params.id;

    const solicitud = await Solicitud.findById(id);
    checkExists(solicitud, "No se encontro la solicitud", 404);

    res.status(200).json(solicitud);
  } catch (e) {
    next(e);
  }
};

const createSolicitud = async (req, res, next) => {
  try {
    const categoria = await Categoria.findById(req.body.categoria);
    checkExists(categoria, "No se encontró la categoría", 404);

    // 👑 Buscar el primer admin
    const admin = await Empleado.findOne({ rol: "admin" });
    if (!admin) {
      console.warn("⚠️ No se encontró un admin. Se guardará sin asignar.");
    }

    // 📝 Crear solicitud (si hay admin, le asignamos la solicitud)
    const nuevaSolicitud = new Solicitud({
      emailSolicitante: req.body.emailSolicitante,
      asunto: req.body.asunto,
      texto: req.body.texto,
      categoria: { _id: req.body.categoria },
      empleado: admin ? { _id: admin._id, nombre: admin.nombre } : undefined, // 💡 Asignación automática
    });

    const solicitudGuardada = await nuevaSolicitud.save();

    // ⚡ Si hay admin, le agregamos la solicitud al array
    if (admin) {
      admin.solicitudes.push({
        _id: solicitudGuardada._id,
        asunto: solicitudGuardada.asunto,
        emailSolicitante: solicitudGuardada.emailSolicitante,
        estado: solicitudGuardada.estado,
        fechaSolicitud: solicitudGuardada.createdAt,
      });
      await admin.save();
    }

    res.status(201).json(solicitudGuardada);
  } catch (e) {
    next(e);
  }
};


const updateSolicitud = async (req, res, next) => {
  try {
    const id = req.params.id;

    const solicitudActualizada = await Solicitud.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    checkExists(solicitudActualizada, "No se encontro la solicitud", 404);

    await Empleado.updateOne(
      { "solicitudes._id": id },
      {
        $set: {
          "solicitudes.$.asunto": solicitudActualizada.asunto,
          "solicitudes.$.estado": solicitudActualizada.estado,
          "solicitudes.$.emailSolicitante":
            solicitudActualizada.emailSolicitante,
        },
      }
    );

    res.status(200).json({
      mensaje: "Solicitud actualizado exitosamente, Empleado actualizado",
      solicitudActualizada,
    });
  } catch (e) {
    next(e);
  }
};

const deleteSolicitud = async (req, res, next) => {
  try {
    const id = req.params.id;
    const solicitudEliminada = await Solicitud.findByIdAndDelete(id);

    checkExists(solicitudEliminada, "No se encontro la solicitud", 404);

    const empleadoSolicitudEliminada = await Empleado.updateOne(
      { "solicitudes._id": id },
      { $pull: { solicitudes: { _id: id } } }
    );

    checkExists(empleadoSolicitudEliminada, "Solicitud eliminada, Empleado no actualizado", 404);

    res
      .status(200)
      .json({ mensaje: "Solicitud eliminada, y Empleado actualizado" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getSolicitudes,
  getSolicitud,
  createSolicitud,
  updateSolicitud,
  deleteSolicitud,
};
