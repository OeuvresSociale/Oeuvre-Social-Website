const dotenv =require("dotenv").config();
const nodemailer = require('nodemailer');

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


async function sendSMS(req,res){}

async function pushNotification(req,res){}



module.exports={
    sendEmail,
    sendSMS,
    pushNotification
};