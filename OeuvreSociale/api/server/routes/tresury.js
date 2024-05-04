const express = require("express");
const { Auth } = require("../middleware/auth");
const { verifyRole } = require("../middleware/roles.js");
const router = express.Router();
const {
  initializeBudget,
  validRequest,
  getValid,
  validLaon,
  addTransaction,
  getValids,
  updateTransaction,
  deleteTransaction,
  processRepaymentsMonthly,
  getFileById,
} = require("../controllers/tresory");
const upload = require("../middleware/multer"); // Import your multer configuration
const asyncWrapper = require("../middleware/asyncWrapper");
//tresury
router.put("/Request/:id", upload.array("files"), asyncWrapper(validRequest));
router.put("/Loan/:id", upload.array("files"), asyncWrapper(validLaon));
router.get("/Requesty/:id", getValid);
router.post(
  "/addTransaction",
  upload.array("files"),
  asyncWrapper(addTransaction)
);
router.post("/process-repayments", processRepaymentsMonthly); //incomes
router.post("/initialize-budget", initializeBudget);
router.get("/RequestyAll", getValids); //outcome collection
router.put("/updateTransaction/:id", updateTransaction);
router.delete("/deleteTransaction/:id", deleteTransaction);
router.get("/:transactionId/:fileId", getFileById); //to display the file
module.exports = router;
