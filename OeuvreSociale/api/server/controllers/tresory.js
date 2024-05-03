const outcome=require("../models/transaction");
const Request=require('../models/request');
const Laon = require('../models/Laon');
const Offre = require('../models/offres')   


const validRequest = async (req, res) => {
  try {
    // Find the request by ID and update its validated to true
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { validated: true },
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Create a new outcome object with the updated request's data
    const newOutcome = new outcome({
      requestId: updatedRequest._id,
      categorie:"outcome",
      type:"demande",
      // files: req.files.map((file) => ({
      //   fileId: file.filename,
      //   filename: file.originalname,
      // })),
    });
    await newOutcome.save();
  //   await Request.findByIdAndDelete(req.params.id);
    // Send success response
    return res.status(200).json({ message: "Request updated and moved successfully"});
  } catch (error) {
    console.error("Error updating and moving request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const validLaon = async (req, res) => {
  try {
    // Find the request by ID and update its validated to true
    const updatedRequest = await Laon.findByIdAndUpdate(
      req.params.id,
      { validated: true },
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Create a new outcome object with the updated request's data
    const newOutcome = new outcome({
      requestId: updatedRequest._id,
      categorie:"outcome",
      type:"laon",
      // files: req.files.map((file) => ({
      //   fileId: file.filename,
      //   filename: file.originalname,
      // })),
    });
    await newOutcome.save();
  //   await Request.findByIdAndDelete(req.params.id);
    // Send success response
    return res.status(200).json({ message: "Request updated and moved successfully"});
  } catch (error) {
    console.error("Error updating and moving request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// get one trnsaction
const getValid = async (req, res) => {
  try {
    const request = await outcome.findById(req.params.id)

    res.status(200).json(request);
  } catch (err) {
      // Handle errors
      res.status(500).json(err);
  }
};
// get all trnsaction
const getValids = async (req, res) => {
  const page = req.query.page || 1;
  const RequestPerPage = 10;
  const skipRequests = (page - 1) * RequestPerPage;
  try {
    const request = await outcome.find() //findById(req.params.id)
      .sort({ creationDate: -1 })
      .skip(skipRequests)
      .limit(RequestPerPage); 
    res.status(200).json(request);
  } catch (err) {
      // Handle errors
      res.status(500).json(err);
  }
};
// create transaction de type : offre ou others
const addTransaction = async (req,res)=>{
  try {
    const data= new outcome ({
    name:req.body.name,  
    creationDate: new Date(),
    title :req.body.title,
    type:req.body.type,
    Amount : req.body.Amount,
    categorie:req.body.categorie
    // files: filesData,
    });
    const saveData = await data.save();
    res.status(201).json(saveData);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// update transaction
const updateTransaction = async (req,res)=>{
  try {
    const updatedRequest = await outcome.findByIdAndUpdate(req.params.id,{$set: req.body},{ new: true });
    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    // Send success response
    return res.status(200).json({ message: "Request updated and moved successfully"});
  } catch (error) {
    console.error("Error updating request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// deleyte transaction
const deleteTransaction = async (req,res)=>{
  const existingTransaction = await outcome.findById(req.params.id);
  if (!existingTransaction) {
    res.status(401).json("this transaction not existed");
  } else {
    try {
      await outcome.findByIdAndDelete(req.params.id);
      res.status(200).json("transaction has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};



module.exports = {
  validRequest,
  getValid,
  validLaon,
  addTransaction,
  getValids,
  updateTransaction,
  deleteTransaction
};

