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
                data: req.file.filename, 
                contentType: 'image/png'
            },
            User
        });

        newImage.save()
            .then(() => res.send('Image successfully uploaded'))
            .catch((err) => {
                console.log(err);
                res.status(500).send('Error saving image data to database.');
            });

    });
} 



module.exports = {
    uploadImage, 
};