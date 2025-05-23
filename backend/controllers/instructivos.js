const Instructivo = require("../models/instructivos");
const Categoria = require("../models/categorias");
const { fetchUserInformation } = require("../helpers/fetchUserInformation");
const { checkExists } = require("../helpers/errorHandler");

const getInstructivos = async (req, res, next) => {
  try {
    let instructivos; //CREO UNA VARIABLE PARA GUARDAR LOS INSTRUCTIVOS PARA QUE SI NECESITAMOS CAMBIAR ALGO SEA MAS FACIL DESPUES

    const authToken = req.cookies?.auth_token;

    //TOMAR EN CUENTA QUE PUEDE NO HABER TOKEN

    const user = await fetchUserInformation(authToken);

    if (user?.rol === "admin" || user?.rol === "becario") {
      instructivos = await Instructivo.find();
    } else {
      instructivos = await Instructivo.find({ soloEmpleados: false });
    }

    return res.status(200).json(instructivos);
  } catch (e) {
    next(e);
  }
};

const getInstructivo = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (req.usuario && (req.usuario.rol === "admin" || req.usuario.rol === "becario")) {
      const instructivo = await Instructivo.findById(id);

      checkExists(instructivo, "No se encontró el instructivo", 404);
      return res.status(200).json(instructivo);

    } else {
      const instructivo = await Instructivo.findOne({
        _id: id,
        soloEmpleados: false,
      });

      checkExists(instructivo, "No se encontró el instructivo", 404);
      return res.status(200).json(instructivo);
    }
  } catch (e) {
    next(e);
  }
};

const createInstructivo = async (req, res, next) => {
  try {
    const categoria = await Categoria.findById(req.body.categoria._id);
    checkExists(categoria, "No se encontro la categoria", 404);
    const nuevoInstructivo = new Instructivo(req.body);
    const instructivoGuardado = await nuevoInstructivo.save();
    res.status(201).json(instructivoGuardado);
  } catch (e) {
    next(e);
  }
};

const updateInstructivo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const instructivoActualizado = await Instructivo.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    checkExists(instructivoActualizado, "No se encontro el instructivo", 404);

    res.status(200).json(instructivoActualizado);
  } catch (e) {
    next(e);
  }
};

const deleteInstructivo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const instructivoEliminado = await Instructivo.findByIdAndDelete(id);
    checkExists(instructivoEliminado, "No se encontro el instructivo", 404);

    res.status(200).json({ mensaje: "Instructivo eliminado" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getInstructivos,
  getInstructivo,
  createInstructivo,
  updateInstructivo,
  deleteInstructivo,
};
