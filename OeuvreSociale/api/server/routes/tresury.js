const express = require("express");
const {Auth}=require('../middleware/auth');
const {verifyRole} = require ('../middleware/roles.js');
const router=express.Router();
const {validRequest,getValid,validLaon,addTransaction,getValids,updateTransaction,deleteTransaction}=require('../controllers/tresory');

 


 
//tresury
router.put("/Request/:id",validRequest);
router.put("/Loan/:id",validLaon);
router.get("/Requesty/:id",getValid);
router.post("/addTransaction",addTransaction);
router.get("/RequestyAll",getValids); //outcome collection
router.put("/updateTransaction/:id",updateTransaction);
router.delete("/deleteTransaction/:id",deleteTransaction);

module.exports=router;