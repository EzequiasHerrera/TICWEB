const express = require("express");

const router = express.Router();

const {
  getInstructivos,
  getInstructivo,
  createInstructivo,
  updateInstructivo,
  deleteInstructivo,
} = require("../controllers/instructivos");

const {
  validarAdmin,
  validarEmpleado,
} = require("../middlewares/validations");

router.get("/", getInstructivos);

router.get("/:id", getInstructivo);

router.post("/", [validarEmpleado], createInstructivo);

router.put("/:id", [validarEmpleado], updateInstructivo);

router.delete("/:id", [validarAdmin], deleteInstructivo);

module.exports = router;
