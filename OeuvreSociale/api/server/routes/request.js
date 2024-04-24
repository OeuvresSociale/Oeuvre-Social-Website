const express = require("express");
const {upload }= require("../controllers/upload");
const  { getallRequests ,getRequest,getMyRequests,createRequest,suiviRequest} = require("../controllers/requestController");
const {createLaonRequest}=require('../controllers/laonController.js');
const {Auth}=require('../middleware/auth');
const {verifyRole} = require ('../middleware/roles.js');
const router=express.Router();

// type request laon
router.get("/Requests",getallRequests);//
router.get("/Request/:id",getRequest);//
router.get("/MyRequests/:employeeId",Auth,getMyRequests);//
router.post("/Requests",upload().array('files', 10),createRequest);
router.put("/Requests/:id",Auth,suiviRequest);//

//Loan request routes
router.post('/LaonRequest',createLaonRequest);
module.exports=router;