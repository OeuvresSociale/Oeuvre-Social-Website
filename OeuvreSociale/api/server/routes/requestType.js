const express = require("express");
const {
  getTypesRequest,
  getTypeRequest,
  addTypeRequest,
  deleteTypeRequest,
  updateTypeRequest,
} = require("../controllers/requestTypeControllers");
const { verifyRole } = require("../middleware/roles.js");
const { Auth } = require("../middleware/auth");
const laon = require("../controllers/laonTypeController.js");
const router = express.Router();

router.get("/typesRequest", getTypesRequest);
router.get("/typesRequest/:id", getTypeRequest);
router.post("/typesRequest", addTypeRequest);
router.put("/typesRequest/:id", updateTypeRequest);
router.delete("/typesRequest/:id", deleteTypeRequest);

//router of type loan
router.get("/typeLaon", laon.getTypeLaon);
router.post("/typeLaon", laon.addTypeLaon);
router.put("/typeLaon", laon.updateTypeLaon);

module.exports = router;
