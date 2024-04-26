const express = require("express");

const  {getTypesRequest,getTypeRequest ,addTypeRequest,deleteTypeRequest,updateTypeRequest} = require("../controllers/requestTypeControllers");
const {verifyRole} = require ('../middleware/roles.js');
const {Auth}=require('../middleware/auth');
const router=express.Router(); 
//
router.get("/typesRequest",getTypesRequest);
router.get("/typesRequest/:id",getTypeRequest);
router.post("/typesRequest",addTypeRequest);
router.put("/typesRequest/:id",updateTypeRequest);
router.delete("/typesRequest/:id",deleteTypeRequest);

module.exports=router;