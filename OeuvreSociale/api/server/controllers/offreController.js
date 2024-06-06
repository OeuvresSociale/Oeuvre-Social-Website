const offreModel = require('../models/offres');
const {uploadImage,getImage} =require('../controllers/img');
const notify = require("../models/notification");
const employee= require("../models/user");


const addOffre = async (req, res) => {
  try {
      if (!req.body.title) {
          return res.status(400).json({ error: "title is required" });
      }

      // Create a new offer instance 
      const newOffre = new offreModel(req.body);

      // If there is an image attached to the request, save it and associate it with the offer
      if (!req.file) {
        console.log("no image ")}else{
          // Assuming you have a function to upload the image and get its ID
          const imageId = await uploadImage(req.file);
          newOffre.imageId = imageId;
      }   

      // Save the offer to the database
      const savedOffre = await newOffre.save();

      // Respond with the saved offer
      res.status(200).json(savedOffre);
      console.log("New offer has been created");
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
};

//delete offre
const deleteOffre = async (req, res) => {
    //verify if this offre exist
  const existingOffre = await offreModel.findById(req.params.id);
  if (!existingOffre) {
    res.status(401).json("this offre not existed");
  } else {
    try {

      await offreModel.findByIdAndDelete(req.params.id);
      res.status(200).json("offre has been deleted");
      console.log("offre has been deleted");
    } catch (err) {
      console.error(err); // Log the error to the console
      res.status(500).json({ error: "An error occurred while deleting the offer." });
    }
    
  }
};

//Get all offres
const getOffres = async (req, res) => {
  try {
    const offre = await offreModel.find();
    res.status(200).json(offre);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }  
};

// // //get one  offre
// const getOffre = async (req, res) => {
// try{
//   const offre = await offreModel.findById(req.params.id);
//   // console.log("req.params.id:",req.params.id);
//   // console.log("offre:",offre); 
//   // res.status(200).json(offre);
// }  
// catch(err){
//   res.status(500).json(err);
// }};


//update
const updateOffre = async (req, res) => {
      try {    
        const updatedOffre= await offreModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedOffre);
        console.log("offre has been updated");
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
  };

  const validOffre = async (req, res) => {
    try {
      const updatedOffre = await offreModel.findByIdAndUpdate(
        req.params.id,
        { visible: true },
        { new: true }
      );
  
      // Fetch all employees
      const employees = await employee.find({}, '_id'); 
  
      // Create a notification for each employee
      const notifications = employees.map(employee => ({
        employeeId: employee._id,
        title: "Offre",
        message: "Nouveau offre est ajouté"
      }));
  
      // Save all notifications
      await notify.insertMany(notifications);
  
      res.status(200).json(updatedOffre);
      console.log("Offre has been updated and notifications sent");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  module.exports = validOffre;
  

const visibleOffres = async (req, res) => {
  try {
    const offres = await offreModel.find({ visible: true }); // Filtering based on the 'visible' field
    res.status(200).json(offres);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }  
};


const invisibleOffres = async (req, res) => {
  try {
    const offre = await offreModel.find({ visible: false });
    res.status(200).json(offre);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }  
};


module.exports={ 
    addOffre,
    deleteOffre,
    getOffres,
    updateOffre,
    validOffre,
    invisibleOffres,
    visibleOffres
};