const dotenv =require("dotenv").config();
const nodemailer = require('nodemailer');
const notify = require('../models/notification');

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
/**{
            "from":"your email",  
            "subject":"Your OTP code",
            "message":"Your OTP is"
            
        } */

//  html: `Message from: ${from}\n\n${message}` 
// const htmlContent = `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Email Template</title>
// </head>
// <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">

//   <!-- Header -->
//   <header style="background-color: #f3f3f3; padding: 20px;">
//     <div style="max-width: 600px; margin: 0 auto; text-align: center;">
//       <!-- Replace 'logo.png' with your actual logo image -->
//       <img src="logo.png" alt="Company Logo" style="max-width: 100%;">
//     </div>
//   </header>

//   <!-- Content Section -->
//   <section style="padding: 20px;">
//     <div style="max-width: 600px; margin: 0 auto; text-align: center;">
//       <h1 style="color: #333;">Your Email Content Goes Here</h1>
//       <p style="color: #666;">This is a sample email template. You can customize it as per your requirements.</p>
//     <p> Message from: ${from}\n\n${message}</p>
//       </div>
//   </section>

//   <!-- Footer -->
//   <footer style="background-color: #333; padding: 20px;">
//     <div style="max-width: 600px; margin: 0 auto; text-align: center;">
//       <!-- Social Media Icons -->
//       <a href="#" style="margin-right: 10px;"><img src="facebook.png" alt="Facebook" style="width: 30px;"></a>
//       <a href="#" style="margin-right: 10px;"><img src="twitter.png" alt="Twitter" style="width: 30px;"></a>
//       <a href="#"><img src="linkedin.png" alt="LinkedIn" style="width: 30px;"></a>
//     </div>
//   </footer>

// </body>
// </html>
// `;
        async function receiveEmail(req, res) {
            const { from, subject, message } = req.body;
        
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.SENDGRID_USERNAME, // Your Gmail address
                        pass: process.env.SENDGRID_PASSWORD  // Your Gmail password or App Password
                    }
                });
                  const y= from;
                const mailOptions = {
                    replyTo: from,
                    to: process.env.SENDGRID_USERNAME,
                    subject: subject,
                    text: `Message from: ${y}\n\n${message}`
                   };
        
                // Use async/await for sending email
                let info = await transporter.sendMail(mailOptions);
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'Email sent successfully' });
            } catch (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: 'Failed to send email' });
            }
        }
        
 

        const Notification = async (employeeId) => {
          try {
            const notification = await notify.findOne({ employeeId });
            if (notification) {
              console.log(notification);
              return notification;
            } else {
              console.log("Notification not found");
              return null;
            }
          } catch (error) {
            console.error("Error retrieving notification:", error);
            return null;
          }
        };
        
        
        

async function Notifications (req,res){
  try {
    const notification = await notify.find();
    console.log("notifications ...")
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json(err);
  }
}
module.exports={
    sendEmail,
    receiveEmail,
    Notification,
    Notifications
};