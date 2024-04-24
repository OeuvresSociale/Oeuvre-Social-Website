/**
 * for now i will write all controllers in this page after finishing the youtube video and understaund how does 
 * the controllers work I'll change the code to the right place
*/

const UserModel =require('../models/user.js');
const notification =require('../controllers/notification'); 
const bcrypt =require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const jwtSecret = process.env.JWT_SECRET;
const dotenv =require("dotenv").config();
const otpGenerator =require('otp-generator');



let useremail; //email of user so we can send him an otp email

/** POST: http://localhost:8000/api/register 
 * @param : 
 * { "idEmployee": "441",
    "familyName": "wwb",
    "firstName": "YACINE",
    "password": "esi",
    "email": "w11s111el@esi.sba.dz",
    "phoneNumber": "92233331117724",
    "sexe": "f",
    "isMarried": "false",
    "bankAccount": "1911111043001234",
    "monthlySalary": "12",
    "isCommit": "false",
    "role": "employee"
} 
*/

//post : register new employee with hash password and testing existance

async function register(req,res){

    try {
        const { idEmployee, password, email, firstName,dateStartJob,role,profilePicture,
            familyName,phoneNumber,sexe,familysitution,bankAccount,monthlySalary,numberOfChild
             } = req.body;        
             const Password = password || idEmployee;
        // check the existing user
        async function checkExistingUser(idEmployee) {
            try {
                const user = await UserModel.findOne({ idEmployee });
                if (user) {
                    throw new Error("Please use a unique idEmployee");
                }
                return true; // No user found, idEmployee is unique
            } catch (error) {
                throw new Error(error.message);
            }
        }
        

        // check for existing email + email validation in regular expression
        async function checkExistingEmail(email) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            
            try {
                // Check if the email format is valid
                if (!emailRegex.test(email)) {
                    throw new Error('Invalid email format');
                }
        
                // Check if the email already exists in the database
                const user = await UserModel.findOne({ email });
                if (user) {
                    throw new Error("Please use a unique email");
                }
                
                // No user found, email is unique and format is valid
                return true; 
            } catch (error) {
                throw new Error(error.message);
            }
        }
        
         // check for existing phoneNumber
         async function checkExistingPhoneNumber(phoneNumber) {
            const phoneRegex = /^[0-9]{10}$/;

            try {
                 // Check if the phoneNumber format is valid
                if (phoneRegex.test(phoneNumber)) {
                    res.status(200).json({ valid: true, message: 'Phone number is valid' });
                } else {
                    res.status(400).json({ valid: false, message: 'Invalid phone number format' });
                }
                // Check if the phoneNumber already exists in the database
                const user = await UserModel.findOne({ phoneNumber });
                if (user) {
                    throw new Error("Please use a unique phoneNumber");
                }
                return true; // No user found, phoneNumber is unique
            } catch (error) {
                throw new Error(error.message);
            }
        }
         // check for existing bankAccount
         async function checkExistingBankAccount(bankAccount) {
            const bankAccountRegex = /^[0-9]{12}$/;
            try {
                // Check if the phoneNumber format is valid
                if (bankAccountRegex.test(bankAccount)) {
                    res.status(200).json({ valid: true, message: 'bankAccount  is valid' });
                } else {
                    res.status(400).json({ valid: false, message: 'Invalid bankAccount  format' });
                }
                // Check if the bankAccount already exists in the database
                const user = await UserModel.findOne({ bankAccount });
                if (user) {
                    throw new Error("Please use a unique bankAccount");
                }
                return true; // No user found, bankAccount is unique
            } catch (error) {
                throw new Error(error.message);
            }
        }


    
        Promise.all([checkExistingUser,checkExistingEmail,checkExistingPhoneNumber, checkExistingBankAccount])
            .then(() => {
                
                if(Password){
                    bcrypt.hash(Password, 10)
                        .then( hashedPassword => {
                             
                            const user = new UserModel({
                                firstName,
                                password: hashedPassword,
                                email,
                                idEmployee,
                                familyName,
                                phoneNumber,
                                sexe,
                                familysitution,
                                numberOfChild,
                                bankAccount,
                                monthlySalary,
                                dateStartJob,
                                
                                role,
                                profilePicture
                            });
                           
                            // return save result as a response
                            user.save()
                            
                            .then(result => {
                                // Send email notification
                                notification.sendEmail({
                                    body: {
                                        to:email, // Use the email provided in the request
                                        subject: "Oeuvre Sociale Account",
                                        message: `Voici votre mot de passe: ${Password}`
                                    }
                                }, {})
                                .then(() => {
                                    console.log("Email notification sent successfully.");
                                    res.status(201).send({ msg: "User registered successfully" });
                                })
                                .catch(error => {
                                    console.error("Error sending email notification:", error);
                                    res.status(500).send({ error: "Error sending email notification" });
                                });
                            })
                 
                        }).catch(error => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                           
                        })
                }
            }).catch(error => {
                return res.status(500).send({ error : "promisese error"})
                console.log(error);
            })


    } catch (error) {
        return res.status(500).send({ error : "debut error"});
    }

}


// async function login(req,res){
//     res.json('login route');
// }
/** POST: http://localhost:8080/api/login 
 * @param: 
 * {"idEmployee" : "51",
  "password" : "esi"
   }   
*/

//post : login with jwt session

async function login(req,res){

    const { email, password } = req.body;

    try {
        
        UserModel.findOne({email})
            .then(user => {
               
               bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if(!passwordCheck) return res.status(400).send({ error: "Incorrect password"});

                        // create jwt token
                        const token = jwt.sign(
                            {   idEmployee : user.idEmployee,
                                role : user.role
                            }, jwtSecret , { expiresIn : "24h"});
                             res.cookie('token', token, { httpOnly: true });
                          useremail=user.email;
                          role=user.role;
                          salary=user.salary;
                          console.log('token:',token);
                          return res.status(200).send(
                            {useremail,
                            role,
                            salary,
                            msg: "Login Successful...!",
                            });                                    

                    })
                    .catch(error =>{
                       
                        return res.status(400).send({ error: "Password does not Match"})
                    })   
            })
            .catch( error => {
                return res.status(404).send({ error : "email not Found"});
            })

    } catch (error) {
        return res.status(500).send({error});
    }
}


//get : lget a user
/** GET: http://localhost:8000/api/user/id */

async function getUser(req, res) {
    const { idEmployee } = req.params;

    if (!idEmployee) {
        return res.status(400).send({ error: "Invalid user" });
    }

    try {
        const user = await UserModel.findOne({ idEmployee }).exec();
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        // Remove password from user object
        const { password, ...rest } = user.toJSON();
       
        return res.status(200).send(rest);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal server error" });
    }
}
// UserModel.findOne({ firstName }, function(err, user) {
// MongooseError: Model.findOne() no longer accepts a callback
            

/** PUT: http://localhost:8000/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
//put : update user 
async function updateUser(req, res) {
    try {
       // const { userId } = req.user;
       const id = req.query.id;
        // if (!userId) {
        //     return res.status(401).send({ error: "User Not Found" });
        // }
        if(id){
            const body = req.body;

            const result = await UserModel.updateOne({ _id: id }, body);
            if (result.nModified === 0) {
                return res.status(404).send({ error: "No records were updated" });
            }
            return res.status(200).send({ msg: "Record Updated" });
        }   
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}


/** GET: http://localhost:8000/api/generateOTP */
async function generateOTP(req,res){
    
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, 
        upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
   // res.json(useremail);
    console.log(useremail);

    notification.sendEmail({
        body: {
            to: useremail,
            subject:'Your OTP code',
            message:`Your OTP is: ${req.app.locals.OTP}`
            
        }
    }, 
    {});
    }
   
/** GET: http://localhost:8000/api/verifyOTP */
async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
async function createResetSession(req,res){
    if(req.app.locals.resetSession){
         return res.status(201).send({ flag : req.app.locals.resetSession})
    }
    return res.status(440).send({error : "Session expired!"})
 }
 
// update the password when we have valid session
/** PUT: http://localhost:8000/api/resetPassword */
async function resetPassword(req,res){
    try {
        
       if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});

        const { firstName, password } = req.body;
        
            try {
                // Find the user by firstName
                const user = await UserModel.findOne({ firstName });
        
                if (!user) {
                    return res.status(404).send({ error: "User not found" });
                }
        
                // Hash the new password
                const hashedPassword = await bcrypt.hash(password, 10);
        
                // Update the user's password
                await UserModel.updateOne({ firstName: user.firstName }, 
                    { password: hashedPassword });

                req.app.locals.resetSession = false; // reset session

                return res.status(201).send({ msg: "Password updated successfully" });
            } catch (error) {
                console.error(error);
                return res.status(500).send({ error: "Internal server error" });
            }
        
        
      
    } catch (error) {
        return res.status(401).send({ error })
    }
}

   /*
**GET
admin - LOG OUT
*/
async function logout(req,res){
    res.clearCookie('token');
    res.json({message:'logout successfuly'});   
}




/**enter email address and compaire with the existant one in db
then send otp to address email and reset the password*/
async function forgotPassword(req,res){ 
    
}




async function addRole(req,res){}






module.exports = {

    register,
    login,
    getUser, 
    updateUser,
    generateOTP,
    verifyOTP,
    createResetSession,
    resetPassword,
    logout,
    useremail,
    forgotPassword
    
    
};