const fs = require('fs');
const path = require('path');
const imageModel = require('../models/image')
const multer = require('multer');  

  
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadsimage/');
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname;
        const extension = path.extname(originalName);
        const newName = `${Date.now()}${extension}`;
        cb(null, newName);
    }
});
  
// Initialize multer with storage configuration and file size limit
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB maximum file size
    }
  }).single('testImage');

// const upload = multer({ storage: storage }).single('testImage');

// async function uploadImage(req, res) {
//     upload(req, res, (err) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).send('Error uploading image.');
//         }

//         // Store image file path in the database
//         const newImage = new imageModel({
//             name: req.body.name,
//             imagePath: req.file ? req.file.path : null,
//             employeeId: req.body.employeeId,
//         });

//         newImage.save()
//             .then(() => {
//                 console.log("Image uploaded successfully ");
//                 res.send('Image successfully uploaded')
//             })
//             .catch((dbErr) => {
//                 console.log(dbErr);
//                 res.status(500).send('Error saving image data to database.');
//             });
//     });
// }

async function uploadImage(req, res) {
    const upload = multer({ dest: 'uploadsimage/' }).single('testImage'); // Set destination folder for multer
    
    upload(req, res, (err) => {
        if (err) { 
            console.log(err);
            return res.status(500).send('Error uploading image.');
        }

        // Rename the uploaded file to ensure uniqueness
        const originalName = req.file.originalname;
        const extension = path.extname(originalName);
        const newName = `${Date.now()}${extension}`;
        const filePath = path.join(__dirname, 'uploadsimage', newName);

        fs.rename(req.file.path, filePath, (renameErr) => {
            if (renameErr) {
                console.log(renameErr);
                return res.status(500).send('Error saving image.');
            }

            // Delete previous profile picture associated with the employee
            imageModel.findOneAndDelete({ employeeId: req.params.id })
                .then(() => {
                    // Store new profile picture in the database
                    const newImage = new imageModel({
                        name: req.body.name,
                        imagePath: filePath, // Store file path instead of buffer
                        employeeId: req.params.id,
                    });

                    newImage.save()  
                        .then(() => {
                            console.log("New image uploaded and old one replaced successfully");
                            res.send('New image uploaded and old one replaced successfully');
                        })
                        .catch((dbErr) => { 
                            console.log(dbErr);
                            res.status(500).send('Error saving new image data to database.');
                        });
                })
                .catch((deleteErr) => {
                    console.log(deleteErr);
                    res.status(500).send('Error deleting previous image data from database.');
                });
        });
    });   
}


 



async function getImage(req, res){

    try {
        const images = await imageModel.find({ employeeId: req.params.employeeId });

        if (!images || images.length === 0) {
            return res.status(404).send('No images found for this employee');
        }

        // Loop through each image and send it as a response
        for (const image of images) {
            fs.readFile(image.imagePath, (err, data) => {
                if (err) { 
                    console.log(err);
                    return res.status(500).send('Error reading image');
                }
 
                // Set the appropriate content type
                res.contentType('image/jpeg'); // Assuming the image type is jpeg, you can adjust it based on your stored content type
                
                // Send the image data to the client
                res.send(data);
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error retrieving images');
    }
};
    
module.exports = {
    uploadImage, 
    getImage
};