const express = require("express");

const router = express.Router();

const {
  getNoticias,
  getNoticia,
  createNoticia,
  updateNoticia,
  deleteNoticia,
} = require("../controllers/noticias");

const {
  validarAdmin,
  validarEmpleado,
} = require("../middlewares/validations");

router.get("/", getNoticias);

router.get("/:id", getNoticia);

router.post("/", [validarEmpleado], createNoticia);

router.put("/:id", [validarEmpleado], updateNoticia);

router.delete("/:id", [validarAdmin], deleteNoticia);

module.exports = router;
