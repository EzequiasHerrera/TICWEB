const express = require("express");

const router = express.Router();

const { createEmpleado } = require("../controllers/empleados");
const { getIndex } = require("../controllers/home");

const {
  validarPrimerAdmin,
} = require("../middlewares/validations");

//DE /HOME DERIVAN TODOS ESTOS:
router.use("/noticias", require("./noticias")); //HOME/NOTICIAS
router.use("/instructivos", require("./instructivos")); //HOME/INSTRUCTIVOS
router.use("/solicitudes", require("./solicitudes"));
router.use("/categorias", require("./categorias"));

router.get("/", getIndex);
router.post("/admin", [validarPrimerAdmin], createEmpleado);

module.exports = router;
