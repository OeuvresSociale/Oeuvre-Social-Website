const reunion = require('../models/reunion');

const addMeet = async (req, res) => {
  try {
      if (!req.body.title) {
          return res.status(400).json({ error: "title is required" });
      }
      const newMeet= new reunion(req.body);
      const savedMeet = await newMeet.save();

      res.status(200).json(savedMeet);
      console.log("New meet has been created");
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
};

//delete offre
const deleteMeet = async (req, res) => {
    //verify if this offre exist
  const existingMeet = await reunion.findById(req.params.id);
  if (!existingMeet) {
    res.status(401).json("this meet  not existed");
  } else {
    try {
      await reunion.findByIdAndDelete(req.params.id);
      res.status(200).json("meet has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

//Get all offres
const getMeets = async (req, res) => {
  try {
    const meet = await reunion.find();
    res.status(200).json(meet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }  
};

//get one meet
const getMeet = async (req, res) => {
    try {
      const meet = await reunion.findById(req.params.id);
      res.status(200).json(meet);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }  
  };

//update
const updateMeet = async (req, res) => {
      try {    
        const updateMeet= await reunion.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updateMeet);
        console.log("meet has been updated");
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
  };


module.exports={ 
    updateMeet,
    addMeet,
    getMeets,
    getMeet,
    deleteMeet

};