const express = require("express");

const router = express.Router();
const { validarEmpleado, validarAdmin } = require("../middlewares/validations");

const {
  getCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} = require("../controllers/categorias");

router.get("/", getCategorias);
router.get("/:id", getCategoria);
router.post("/", [validarEmpleado], createCategoria);
router.put("/:id", [validarEmpleado], updateCategoria);
router.delete("/:id", [validarAdmin], deleteCategoria);

module.exports = router;
