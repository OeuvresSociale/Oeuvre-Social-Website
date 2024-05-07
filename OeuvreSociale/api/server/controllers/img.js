const multer = require('multer');
const imageModel = require('../models/image.js');
const User = require('../models/user.js');

 /** 
      * Accept a single file with the name testImage.
      *  The single file will be stored in req.file
      * to test use postman in body : form-data add a name(text) & testImage(file):import image
 */
async function uploadImage(req, res) {

    const upload = multer().single('testImage'); 
    
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error uploading image.');
        }

    //store image in monogo db
        const newImage = new imageModel({
            name: req.body.name,
            image: {
                data: "profile picture", 
                contentType: 'image/png'
            },
            employeeId:req.body.employeeId
        });

        newImage.save()
            .then(() => res.send('Image successfully uploaded'))
            .catch((err) => {
                console.log(err);
                res.status(500).send('Error saving image data to database.');
            });

    });
} 
  

async function displayImage(req, res) {
    try {
        console.log("employeeId:",req.params.employeeId);
      const imageData = await imageModel.findOne({ employeeId: req.params.employeeId });
      if (!imageData) {
        return res.status(404).send('Image not found for the user.');
      }  
      // Set the Content-Type header to indicate the type of data being sent
      res.set('Content-Type', imageData.image.contentType);
      
      // Send the image data as a response
      res.send(Buffer.from(imageData.image.data, 'base64'));
    } catch (error) {
      console.error('Error retrieving profile image:', error);
      res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    uploadImage, 
    displayImage
};