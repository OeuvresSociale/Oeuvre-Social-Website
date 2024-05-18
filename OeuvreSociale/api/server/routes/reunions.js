const Router = require("express"); 
const router=Router();

const  {deleteMeet,addMeet,getMeets,getMeet,updateMeet}= require("../controllers/reunionController");


router.get("/meets",getMeets);
router.get("/meet",getMeet);
router.post("/meet",addMeet);   
router.put("/meet/:id",updateMeet);
router.delete("/meet/:id",deleteMeet);


module.exports=router; 