const Router = require("express");
const router=Router();
const cntrl = require('../controllers/offreController');


router.get("/offres",cntrl.getOffres);
router.get("/offre/:id",cntrl.getOffre);
router.post("/offre",cntrl.addOffre);
router.put("/offre/:id",cntrl.updateOffre);
router.delete("/offre/:id",cntrl.deleteOffre);

module.exports=router;