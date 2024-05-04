const PV = require('../models/pv');
 

const addPV = async (req,res) => {
    try {
        if (!req.body.title) {
          return res.status(400).json({ error: "Title is required" });
        }
        // Search for existing typeRequest with the specified title
        const existingPV = await typeRequest.findOne({
          title: req.body.title,
        });
        // If typeRequest with the same title already exists, return an error
        if (existingPV) {
          return res.status(409).json({ error: "pv is already exists" });
        } else {
          try {
            const newPV = new PV (req.body);
            const savePV = await newPV.save(); 
            res.status(200).json(savePV);
            console.log("PV has been created");
          } catch (error) {
            // Handle other errors
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
          }
        }
      } catch (error) {
        // Handle other errors
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    };

const updatePV = async (req, res) => {
        try {
          const pv = await PV.findById(req.params.id);
          try {
              if (!req.body.title) {
                  return res.status(400).json({ error: "Title is required" });
                }
            const updatedPV = await PV.findByIdAndUpdate(
              req.params.id,
              {
                $set: req.body,
              },
              { new: true }
            );
            res.status(200).json(updatedPV);
            console.log("PV has been updated");
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
          }
        } catch {
          res.status(401).json("this pv does not exist");
        }
      };

      //Get all request
const getPVs = async (req, res) => {
    try {
      const pv = await PV.find();
      res.status(200).json(pv);
    } catch (error) {
      res.status(404).json({ message: error.message });
    } 
  };
  
  //get one 
  const getPV = async (req, res) => {
  try{
    const pv = await PV.findById(req.params.id);
    
    res.status(200).json(pv);
  }
  catch(err){
    res.status(500).json(err);
  }
  
  
  };


module.exports = {
    addPV,
    updatePV,
    getPV,
    getPVs
  };
  