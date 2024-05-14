const express = require("express");
const { Auth } = require("../middleware/auth");
const { verifyRole } = require("../middleware/roles.js");
const router = express.Router();
const {
  validRequest,
  getValid,
  validLaon,
  addTransaction,
  getValids,
  updateTransaction,
  deleteTransaction,
  processRepaymentsMonthly,
  getFileById,
  calculateIncomeSummary,
  calculateOutcomeSummary,
} = require("../controllers/tresoryController.js");
const {
  initializeBudget,
  getCurrentAmount,
} = require("../controllers/budgetController.js");
const upload = require("../middleware/multer"); // Import your multer configuration
const asyncWrapper = require("../middleware/asyncWrapper");

//tresury
router.put("/Requestvalide/:id", upload.array("files"),asyncWrapper(validRequest));
router.put("/Loanvalide/:id", upload.array("files"), asyncWrapper(validLaon));
router.get("/Requesty/:id", getValid);  
router.post("/addTransaction",upload.array("files"),asyncWrapper(addTransaction));
router.post("/process-repayments", processRepaymentsMonthly); //incomes from the repayement loan
router.post("/initialize-budget", initializeBudget); //to initialize our budget
router.get("/currentAmount", getCurrentAmount); //to get the current budget
 
router.get("/RequestyAll", getValids); //outcome collection


router.put("/updateTransaction/:id", updateTransaction);
router.delete("/deleteTransaction/:id", deleteTransaction);


router.get("/:transactionId/:fileId", getFileById); //to display the file
router.get("/income-summary", calculateIncomeSummary);
router.get("/outcome-summary", calculateOutcomeSummary);
module.exports = router;
