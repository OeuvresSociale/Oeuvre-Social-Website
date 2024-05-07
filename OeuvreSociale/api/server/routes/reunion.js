const Router = require("express");
const router=Router();

 const {addPV,updatePV,getPV,getPVs}=require('../controllers/pvController');

router.post("/pv",addPV);
router.put("/pv/:id",updatePV);
router.get("/pv",getPVs); 
router.get("/allPv/:id",getPV);
 
module.exports=router; 

  