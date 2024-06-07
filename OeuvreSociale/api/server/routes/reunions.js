const Router = require("express");
const router = Router();
const upload = require("../middleware/multer"); // Import your multer configuration
const asyncWrapper = require("../middleware/asyncWrapper");
const {
  getMember,
  deleteMeet,
  addMeet,
  getMeets,
  getMeet,
  updateMeet,
  addPV,
  groupedMeet,
  getMeetYear,
  getFileById,
} = require("../controllers/reunionController");

router.get("meet-by-year/:year", getMeetYear);
router.get("/meets", getMeets);
//router.get("/meet/:id",getMeet);
router.post("/meet", addMeet);
//router.put("/meet/:id",updateMeet);
router.delete("/meeting/:id", deleteMeet);
//router.put("/Loanvalide/:id", upload.array("files"), asyncWrapper(validLaon));
router.put("/meetPv/:id", upload.array("pdfDoc"), asyncWrapper(addPV));
router.get("/meet-by-year/meet/:reunionId/:fileId", getFileById); //to display the file
//router.put("/meetPv/:id", upload.single('pdfDoc'),addPV);
router.get("/meet-by-year", groupedMeet);
router.get("/getMember", getMember);

module.exports = router;
