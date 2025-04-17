const jwt = require("jsonwebtoken");
const Empleado = require("../models/empleados");
const { fetchUserInformation } = require("../helpers/fetchUserInformation");

//VERIFICA SI ESTA AUTENTICADO COMO ADMIN
const validarAdmin = async (req, res, next) => {
  const authToken = req.cookies?.auth_token;
  try {
    if (!authToken) {
      const error = new Error("No existe token.");
      error.statusCode = 401;
      return next(error);
    }

    const user = await fetchUserInformation(authToken);

    if (user.rol !== "admin") {
      const error = new Error("Acceso denegado. Se requieren privilegios de administrador.");
      error.statusCode = 403;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const validarEmpleado = async (req, res, next) => {
  const authToken = req.cookies?.auth_token;
  const user = await fetchUserInformation(authToken);

  if (!user || user.rol !== "admin" && user.rol !== "becario") {
    const error = new Error("Autenticación no válida de empleado.");
    error.statusCode = 401;
    return next(error);
  }

  next();
};

const validarPrimerAdmin = async (req, res, next) => {
  const administradores = await Empleado.find({ rol: "admin" });

  if (administradores.length === 0) {
    req.isFirstAdmin = true;
  } else { req.isFirstAdmin = false; }

  next();
};

//NO SE PARA QUE SE USA ESTE... POR LAS DUDAS NO LO MODIFICO (PARECE IGUAL AL DE ARRIBA)
const esEmpleado = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return next();
      }

      const email = user.datosUsuario.email;

      if (email) {
        try {
          const empleado = await Empleado.findOne({ email });
          if (empleado) {
            req.usuario = {
              id: empleado._id,
              nombre: empleado.nombre,
              rol: empleado.rol,
              email: empleado.email,
            };
          }
        } catch (e) {
          return next();
        }
      }

      next();
    });
  } else {
    next();
  }
};

module.exports = {
  validarAdmin,
  validarEmpleado,
  esEmpleado,
  validarPrimerAdmin,
};
