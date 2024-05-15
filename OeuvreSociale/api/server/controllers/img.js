const fs = require('fs');
const path = require('path');
const imageModel = require('../models/image')
const multer = require('multer');

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

            // Store image file path in the database
            const newImage = new imageModel({
                name: req.body.name,
                imagePath: filePath, // Store file path instead of buffer
                employeeId: req.params.id,
            });

            newImage.save()
                .then(() => res.send('Image successfully uploaded'))
                .catch((dbErr) => { 
                    console.log(dbErr);
                    res.status(500).send('Error saving image data to database.');
                });
        });
    });
}

    // async function getImage(req, res){
    //     try {
    //         const images = await imageModel.find({ employeeId: req.params.employeeId });
            
    //         if (!images || images.length === 0) {
    //             return res.status(404).send('No images found for this employee');
    //         }
    
    //         // Create an array to hold image data
    //         const imageDataArray = [];
    
    //         // Loop through each image and read the file from the filesystem
    //         for (const image of images) {
    //             fs.readFile(image.imagePath, (err, data) => {
    //                 if (err) {
    //                     console.log(err);
    //                     return res.status(500).send('Error reading image');
    //                 }
    
    //                 // Push the image data along with its ID to the array
    //                 imageDataArray.push({
    //                     id: image._id,
    //                     data: data
    //                 });
    
    //                 // Check if all images have been processed
    //                 if (imageDataArray.length === images.length) {
    //                     // Send the array of image data to the client
    //                     res.json(imageDataArray);
    //                 }
    //             });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).send('Error retrieving images');
    //     }
    // }



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