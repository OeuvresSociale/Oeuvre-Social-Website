const dotenv =require("dotenv").config();
const nodemailer = require('nodemailer'); 
// const Notify = require("../models/notification");
/**{
            "to":"y.meflah@esi-sba.dz",  
            "subject":"Your OTP code",
            "message":"Your OTP is"
            
        } */ 
async function sendEmail(req,res){
    
    const{to,subject,message}=req.body;   
  
    const transporter = nodemailer.createTransport({
        
        service:'gmail',
        auth: {
             user:process.env.SENDGRID_USERNAME, /// Your Gmail address
             pass:process.env.SENDGRID_PASSWORD  //// Your Gmail password or App Password
        }
    });
    const mailOptions ={
        from:process.env.SENDGRID_USERNAME,
        to:to, 
        subject:subject,
        text:message
    }
    
    transporter.sendMail(mailOptions, function(error,info){
        if (error){
            console.log({error:"error in transporter"});
        }else{
            console.log('email send :'+ info.response)  ;
        }
    })
}

 //get notification
async function pushNotification(req,res){

    try {
      const userId = req.params.employeeId;
      const notifications = await Notify.find({ userId }).sort({ timestamp: -1 });
      res.json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Mark a notification as read
    async function markAsRead(req,res){
    try {
      const notificationId = req.params.id;
      const notification = await Notify.findByIdAndUpdate(notificationId, { readStatus: true }, { new: true });
      res.json(notification);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Delete a notification
    async function deleteNot(req,res){
    try {
      const notificationId = req.params.notificationId;
      await Notify.findByIdAndDelete(notificationId);
      res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
      console.error('Error deleting notification:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }; 

///////////////////////////////////////////////////
// we should add this function in all controllers
// const notification = new Notify({
//   employeeId: updatedRequest.employeeId,
//   type: 'new_message',
//   message: 'You have received a new message',
//   timestamp: new Date(),
//   readStatus: false
// });

// // Save the notification to the database
// notification.save()
//   .then(savedNotification => {
//     console.log('Notification saved successfully:', savedNotification);
//   })
//   .catch(error => {
//     console.error('Error saving notification:', error);
//   });
///////////////////////////////////////////////////

module.exports={
    sendEmail,
    pushNotification,
    markAsRead,
    deleteNot
};