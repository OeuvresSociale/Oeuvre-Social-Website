const typeRequest = require("../models/typeRequest");


//Get all request
const getTypesRequest = async (req, res) => {
  try {
    const typesRequest = await typeRequest.find();
    res.status(200).json(typesRequest);
  } catch (error) {
    res.status(404).json({ message: error.message });
  } 
};
//get one 
const getTypeRequest = async (req, res) => {
try{
  const TypeRequest = await typeRequest.findById(req.params.id);
  
  res.status(200).json(TypeRequest);
}
catch(err){
  res.status(500).json(err);
}


};
/**
 * for testign
 * {"title": "Bourse de nouveau-né",
    "docs": [
      "Acte de naissance du nouveau-né",
      "Attestation de travail"]} req 
 
 */
//create new type of request by admin
const addTypeRequest = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: "Title is required" });
    }
    // Search for existing typeRequest with the specified title
    const existingTypeRequest = await typeRequest.findOne({
      title: req.body.title,
    });
    // If typeRequest with the same title already exists, return an error
    if (existingTypeRequest) {
      return res.status(409).json({ error: "TypeRequest already exists" });
    } else {
      try {
        const newTypeRequest = new typeRequest(req.body);
        const saveTypeRequest = await newTypeRequest.save();
        res.status(200).json(saveTypeRequest);
        console.log("TypeRequest has been created");
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

//update
const updateTypeRequest = async (req, res) => {
  try {
    const TypeRequest = await typeRequest.findById(req.params.id);
    try {
        if (!req.body.title) {
            return res.status(400).json({ error: "Title is required" });
          }
      const updatedtypeRequest = await typeRequest.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedtypeRequest);
      console.log("typeRequest has been updated");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } catch {
    res.status(401).json("this request type  not existed");
  }
};
//delete
const deleteTypeRequest = async (req, res) => {
    //verify if this type exist
  const existingTypeRequest = await typeRequest.findById(req.params.id);
  if (!existingTypeRequest) {
    res.status(401).json("this request type  not existed");
  } else {
    try {
      await typeRequest.findByIdAndDelete(req.params.id);
      res.status(200).json("typeRequest has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};




module.exports = {
  getTypesRequest,
  getTypeRequest,
  addTypeRequest,
  deleteTypeRequest,
  updateTypeRequest,
  
};
