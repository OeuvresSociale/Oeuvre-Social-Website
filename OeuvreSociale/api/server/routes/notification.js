const Router = require("express");
const router=Router();

 const {pushNotification,markAsRead,deleteNot,sendEmail}=require('../controllers/notificationController');

router.get("/notification",pushNotification);
router.put("/notification/:id",markAsRead);
router.post("/sendEmail",sendEmail);
router.delete("/notification/:id",deleteNot);
 
module.exports=router; 

  