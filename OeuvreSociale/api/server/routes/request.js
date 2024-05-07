const express = require("express");
const upload = require("../middleware/multer"); // Import your multer configuration
const asyncWrapper = require("../middleware/asyncWrapper");
const {
  getallRequests,
  getRequest,
  getMyRequests,
  createRequest,
  suiviRequest,
  getFileById,
} = require("../controllers/requestController");
const { createLaonRequest } = require("../controllers/laonController.js");
const { Auth } = require("../middleware/auth");
const { verifyRole } = require("../middleware/roles.js");
const laon = require("../controllers/laonController.js");
const {
  getRepayment,
  getallRepayment,
} = require("../controllers/loanRepayment.js");
const router = express.Router();

// type request
router.get("/Requests", getallRequests); //
router.get("/Request/:id", getRequest); //
router.get("/MyRequests/:employeeId", getMyRequests); //
router.post("/Requests", upload.array("files"), asyncWrapper(createRequest));
router.put("/Requests/:id", suiviRequest); //
router.get("/:requestId/:fileId", getFileById); //to display the file

//Loan request routes
router.post("/LaonRequest", laon.createLaonRequest);
router.get("/LaonRequest", laon.getallLaon); //
router.get("/LaonRequest/:id", laon.getLaon); //
router.get("/LaonRequesty/:employeeId", laon.getMyLaon); //
router.put("/LaonRequest/:id", laon.suiviLaon); //

//repayment request routes
router.get("/repayments", getallRepayment);
router.get("/repayment/:id", getRepayment);

module.exports = router;
