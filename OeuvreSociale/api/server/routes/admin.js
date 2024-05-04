const Router = require('express');

const router=Router();

const controller =require('../controllers/adminController');
const {uploadImage,displayImage} =require('../controllers/img');
const notification =require('../controllers/notificationController.js');
const {Auth} = require('../middleware/auth.js');//middelware for authentication
//const { localVariables } = require ('../middleware/auth.js');
const {verifyRole} = require ('../middleware/roles.js');

//END POINTS for admin interface - for now it is for bith admin and employee

   
/**POST METHODS */
//router.route('/register').post(Auth,verifyRole('président'),controller.register); //register user
router.route('/register').post(controller.register); 
//router.route('/authentication').post((req,res)=>res.end());  // authenticate user
router.route('/login').post(controller.login);  // login in app
router.route('/sendEmail').post(Auth,verifyRole('president'),notification.sendEmail); 
router.route('/forgotPassword').post(controller.forgotPassword); 
//router.route('/notification').post(controller.notification);
router.route('/uploadImage').post(uploadImage);
router.route('/displayImage/:id').get(displayImage);
 
/**GET METHODS */
router.route('/user/:idEmployee').get(controller.getUser);   //get user with idEmployee
router.route('/generateOTP').get(controller.generateOTP);  //generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP);   //verify generate OTP
router.route('/createResetSession').get(controller.createResetSession);  //reset all the variables
router.route('/logout').get(controller.logout)
//router.route('/getImage/:id').get(controlle.getImage)



/**PUT METHODS */
router.route('/updateUser').put(controller.updateUser);   //update user profile
router.route('/resetPassword').put(controller.resetPassword);   //use to reset a password




module.exports=router;







