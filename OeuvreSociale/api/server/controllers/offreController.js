const offreModel = require('../models/offres.js');

const addOffre = async (req,res)=>{
    try {
        if (!req.body.title) {
            return res.status(400).json({ error: "Title is required" });
          }
          const newOffre = new offreModel(req.body);
          const saveOffre = await newOffre.save();
          res.status(200).json(saveOffre);
          console.log("new offre has been created");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" }); 
    }
} 


//delete offre
const deleteOffre = async (req, res) => {
    //verify if this offre exist
  const existingOffre = await offre.findById(req.params.id);
  if (!existingOffre) {
    res.status(401).json("this offre  not existed");
  } else {
    try {
      await offre.findByIdAndDelete(req.params.id);
      res.status(200).json("offre has been deleted");
    } catch (err) {
      res.status(500).json(err);
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

//get one  offre
const getOffre = async (req, res) => {
try{
  const offre = await offreModel.findById(req.params.id);
  res.status(200).json(offre);
}
catch(err){
  res.status(500).json(err);
}};


//update
const updateOffre = async (req, res) => {
    try {
      const offre = await offreModel.findById(req.params.id);
      try {
          if (!req.body.title) {
              return res.status(400).json({ error: "Title is required" });
            }
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
    } catch {
      res.status(401).json("this offre  not existed");
    }
  };

  const ValidOffre = async (req, res) => {
    try {
      const offre = await offreModel.findById(req.params.id);
      try {
          if (!req.body.title) {
              return res.status(400).json({ error: "Title is required" });
            }
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
    } catch {
      res.status(401).json("this offre  not existed");
    }
  };


module.exports={ 
    addOffre,
    deleteOffre,
    getOffres,
    getOffre,
    updateOffre
};